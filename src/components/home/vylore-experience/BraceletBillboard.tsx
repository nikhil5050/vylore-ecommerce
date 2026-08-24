"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneState } from "./types";

// Actual pixel dimensions of /images/jewellery/vylore-bracelet-v2.png — keeps
// the plane's aspect ratio locked to the source photo so it's never stretched.
const IMAGE_ASPECT = 1599 / 1238;

interface BraceletBillboardProps {
  sceneState: React.RefObject<SceneState>;
  reducedMotion: boolean;
  isDesktop: boolean;
}

/**
 * The uploaded silver diamond bracelet photo, presented as a billboard
 * inside the R3F scene — the photo itself remains the exact visual source
 * of truth. Deliberately UNLIT (meshBasicMaterial): the photo already has
 * its own baked-in studio lighting and highlights from the original shoot,
 * so a physically-lit material (lights + metalness + env reflections)
 * doubles up on that and blows the diamonds out to white. Three.js only
 * supplies position/scale/rotation for the scroll travel here, nothing else
 * touches the pixels.
 */
export function BraceletBillboard({
  sceneState,
  reducedMotion,
  isDesktop,
}: BraceletBillboardProps) {
  const rawTexture = useTexture("/images/jewellery/vylore-bracelet-v2.png");
  const texture = useMemo(() => {
    const t = rawTexture.clone();
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, [rawTexture]);
  useEffect(() => () => texture.dispose(), [texture]);

  const planeHeight = isDesktop ? 2.15 : 1.55;
  const planeWidth = planeHeight * IMAGE_ASPECT;

  const groupRef = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const pointerTilt = useRef({ x: 0, y: 0 });
  // A full one-shot revolution plays each time the bracelet arrives at its
  // settled About pose (angle accumulates across repeat visits, which is
  // visually identical to wrapping it — rotation has no notion of "raw" value).
  const spinState = useRef({ angle: 0 });
  const hasSpunRef = useRef(false);

  // Entrance: opacity/scale/y/rotateY settle in, ~1.8s, no bounce.
  useEffect(() => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;
    const material = mesh.material as THREE.MeshBasicMaterial;

    if (reducedMotion) {
      material.opacity = 1;
      return;
    }

    material.opacity = 0;
    gsap.set(group.scale, { x: 0.88, y: 0.88, z: 0.88 });
    gsap.set(group.position, { y: 0.28 });
    gsap.set(group.rotation, { y: THREE.MathUtils.degToRad(-6) });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.to(material, { opacity: 1, duration: 1.6, ease: "power3.out" }, 0)
      .to(group.scale, { x: 1, y: 1, z: 1, duration: 1.8, ease: "power3.out" }, 0)
      .to(group.position, { y: 0, duration: 1.8, ease: "power3.out" }, 0)
      .to(group.rotation, { y: 0, duration: 1.8, ease: "power3.out" }, 0);

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Mouse parallax, desktop only, max +/-2deg X / +/-3deg Y — fades out once settled in About.
  useEffect(() => {
    if (reducedMotion || !isDesktop) return;

    function handlePointerMove(event: PointerEvent) {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      pointerTilt.current.y = nx * THREE.MathUtils.degToRad(3);
      pointerTilt.current.x = -ny * THREE.MathUtils.degToRad(2);
    }

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reducedMotion, isDesktop]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const p = sceneState.current.progress;
    const eased = THREE.MathUtils.smoothstep(p, 0, 1);
    const d = Math.min(delta, 0.05);

    // Hero pose -> About pose, scroll-driven.
    // Desktop: starts right-of-center (overlapping the typography), then
    // glides further left to sit beside the copy (split-screen) in About.
    // Mobile: no room for a split, so it tucks up and shrinks instead, with copy below.
    const targetX = isDesktop ? THREE.MathUtils.lerp(0.45, -1.95, eased) : 0;
    const targetY = isDesktop
      ? THREE.MathUtils.lerp(0, 0.1, eased)
      : THREE.MathUtils.lerp(0, 1.0, eased);
    const targetScale = isDesktop
      ? THREE.MathUtils.lerp(1, 0.74, eased)
      : THREE.MathUtils.lerp(1, 0.55, eased);
    // A graceful turn-and-settle during the travel itself: rotation and a
    // slight forward push rise from 0, peak mid-scroll, and ease back to 0
    // exactly on arrival — an interactive "rounding" flourish rather than a
    // token wobble, without ever spinning freely or misaligning once stable.
    const travelTurnEnvelope = 4 * eased * (1 - eased);
    const targetRotY = THREE.MathUtils.degToRad(-24) * travelTurnEnvelope;
    const targetRotZTravel = THREE.MathUtils.degToRad(7) * travelTurnEnvelope;
    const targetZ = 0.35 * travelTurnEnvelope;

    if (reducedMotion) {
      group.position.set(targetX, targetY, 0);
      group.scale.setScalar(targetScale);
      group.rotation.set(0, 0, 0);
      return;
    }

    // Idle float + parallax fade out as the bracelet settles into its stable About pose.
    const settle = 1 - THREE.MathUtils.smoothstep(p, 0.72, 0.94);
    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * ((Math.PI * 2) / 6)) * planeHeight * 0.012 * settle;
    const floatRotZ = Math.sin(t * ((Math.PI * 2) / 6)) * THREE.MathUtils.degToRad(0.5) * settle;

    // One full 360deg revolution, like a product-showcase spin, fired once
    // each time the bracelet arrives at its settled About pose.
    const isSettled = settle < 0.02;
    if (isSettled && !hasSpunRef.current) {
      hasSpunRef.current = true;
      gsap.to(spinState.current, {
        angle: spinState.current.angle + Math.PI * 2,
        duration: 1.8,
        ease: "power2.inOut",
      });
    } else if (!isSettled) {
      hasSpunRef.current = false;
    }

    // Snappier response (higher damp rate) makes the travel feel responsive
    // to scroll input rather than sluggish, without changing how far it goes.
    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 6, d);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY + floatY, 6, d);
    group.position.z = THREE.MathUtils.damp(group.position.z, targetZ, 6, d);
    group.scale.x = group.scale.y = group.scale.z = THREE.MathUtils.damp(
      group.scale.x,
      targetScale,
      6,
      d
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      pointerTilt.current.x * settle,
      8,
      d
    );
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotY + pointerTilt.current.y * settle + spinState.current.angle,
      7,
      d
    );
    group.rotation.z = THREE.MathUtils.damp(
      group.rotation.z,
      targetRotZTravel + floatRotZ,
      6,
      d
    );
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          toneMapped={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
