"use client";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneState } from "./types";

const RING_RADIUS = 1.15;
const TUBE_RADIUS = 0.17;

interface BangleModelProps {
  sceneState: React.RefObject<SceneState>;
  reducedMotion: boolean;
  isDesktop: boolean;
}

/** Emerald-cut facets laid radially around the band, evoking the Velora eternity bangle reference. */
function DiamondRing({ count }: { count: number }) {
  const diamonds = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count]
  );

  return (
    <>
      {diamonds.map((angle, i) => {
        const x = Math.cos(angle) * RING_RADIUS;
        const y = Math.sin(angle) * RING_RADIUS;
        return (
          <group key={i} position={[x, y, 0]} rotation={[0, 0, angle - Math.PI / 2]}>
            <RoundedBox
              args={[0.15, 0.13, 0.34]}
              radius={0.012}
              smoothness={4}
              position={[0, TUBE_RADIUS * 0.62, 0]}
            >
              <meshPhysicalMaterial
                color="#fbfdff"
                transmission={0.94}
                thickness={0.35}
                roughness={0.03}
                ior={2.4}
                clearcoat={1}
                clearcoatRoughness={0.02}
                envMapIntensity={2.6}
                attenuationColor="#eaf6ff"
                attenuationDistance={0.6}
              />
            </RoundedBox>
            {/* gold prong beads flanking each stone */}
            <mesh position={[0.1, TUBE_RADIUS * 0.62, 0.16]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial color="#e8c27a" metalness={1} roughness={0.25} />
            </mesh>
            <mesh position={[-0.1, TUBE_RADIUS * 0.62, 0.16]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial color="#e8c27a" metalness={1} roughness={0.25} />
            </mesh>
            <mesh position={[0.1, TUBE_RADIUS * 0.62, -0.16]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial color="#e8c27a" metalness={1} roughness={0.25} />
            </mesh>
            <mesh position={[-0.1, TUBE_RADIUS * 0.62, -0.16]}>
              <sphereGeometry args={[0.018, 12, 12]} />
              <meshStandardMaterial color="#e8c27a" metalness={1} roughness={0.25} />
            </mesh>
          </group>
        );
      })}
    </>
  );
}

export function BangleModel({ sceneState, reducedMotion, isDesktop }: BangleModelProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const heroScale = isDesktop ? 1.5 : 0.62;

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const p = sceneState.current.progress;
    const eased = THREE.MathUtils.smoothstep(p, 0, 1);
    const d = Math.min(delta, 0.05);

    // Hero pose -> About pose, scroll-driven.
    // Desktop: model glides left to sit beside the copy (split-screen).
    // Mobile: no room for a split, so it tucks up and shrinks instead, with copy below.
    const targetX = isDesktop ? THREE.MathUtils.lerp(0, -1.85, eased) : 0;
    const targetY = isDesktop
      ? THREE.MathUtils.lerp(0, -0.1, eased)
      : THREE.MathUtils.lerp(0, 1.15, eased);
    const targetScale = isDesktop
      ? THREE.MathUtils.lerp(1.5, 0.92, eased)
      : THREE.MathUtils.lerp(heroScale, 0.5, eased);
    const targetTiltX = THREE.MathUtils.lerp(Math.PI / 2, Math.PI / 2 - 0.32, eased);
    const targetTiltZ = THREE.MathUtils.lerp(0, 0.2, eased);

    if (reducedMotion) {
      group.position.x = targetX;
      group.position.y = targetY;
      group.scale.setScalar(targetScale);
      group.rotation.x = targetTiltX;
      group.rotation.z = targetTiltZ;
      group.rotation.y = Math.PI / 5;
      return;
    }

    group.position.x = THREE.MathUtils.damp(group.position.x, targetX, 4, d);
    group.position.y = THREE.MathUtils.damp(group.position.y, targetY, 4, d);
    group.scale.x = group.scale.y = group.scale.z = THREE.MathUtils.damp(
      group.scale.x,
      targetScale,
      4,
      d
    );
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetTiltX, 4, d);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetTiltZ, 4, d);
    // continuous idle spin, independent of scroll
    group.rotation.y += delta * 0.18;
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]} scale={heroScale}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[RING_RADIUS, TUBE_RADIUS, isDesktop ? 48 : 32, isDesktop ? 160 : 96]} />
        <meshPhysicalMaterial
          color="#d9a94e"
          metalness={1}
          roughness={0.16}
          clearcoat={0.5}
          clearcoatRoughness={0.15}
          envMapIntensity={1.6}
        />
      </mesh>
      <DiamondRing count={isDesktop ? 24 : 16} />
    </group>
  );
}
