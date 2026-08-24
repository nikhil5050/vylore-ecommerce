"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneState } from "./types";

const RING_RADIUS = 1.1;
const TUBE_RADIUS = 0.078;

// The band is open, not a closed loop — a gap sits on the right, where the
// leaf branch grows out past the circle, echoing the reference photo.
const GAP_ANGLE = Math.PI / 3;
const VISIBLE_ARC = Math.PI * 2 - GAP_ANGLE;
const ARC_START = GAP_ANGLE / 2;
const BRANCH_ANGLE = -GAP_ANGLE / 2;

const SILVER = "#eef1f3";

const silverMaterialProps = {
  color: SILVER,
  metalness: 1,
  roughness: 0.07,
  clearcoat: 1,
  clearcoatRoughness: 0.04,
  envMapIntensity: 2.3,
} as const;

interface RingModelProps {
  sceneState: React.RefObject<SceneState>;
  reducedMotion: boolean;
  isDesktop: boolean;
}

/** Slim polished silver band, open where the olive branch grows out past the circle. */
function SilverBand({ segments }: { segments: number }) {
  return (
    <group rotation={[0, 0, ARC_START]}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[RING_RADIUS, TUBE_RADIUS, 24, segments, VISIBLE_ARC]} />
        <meshPhysicalMaterial {...silverMaterialProps} />
      </mesh>
    </group>
  );
}

/** A curving stem of paired, tapering leaves growing from the open end — an olive-branch motif in the same polished silver. */
function LeafBranch({ leafPairs }: { leafPairs: number }) {
  const { curve, leaves } = useMemo(() => {
    const radial = new THREE.Vector3(Math.cos(BRANCH_ANGLE), Math.sin(BRANCH_ANGLE), 0);
    const tangent = new THREE.Vector3(-Math.sin(BRANCH_ANGLE), Math.cos(BRANCH_ANGLE), 0);
    const p0 = radial.clone().multiplyScalar(RING_RADIUS);
    const p1 = radial.clone().multiplyScalar(RING_RADIUS + 0.5).addScaledVector(tangent, -0.12);
    const p2 = radial.clone().multiplyScalar(RING_RADIUS + 0.95).addScaledVector(tangent, -0.5);
    const p3 = radial.clone().multiplyScalar(RING_RADIUS + 1.05).addScaledVector(tangent, -1.15);
    const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3]);

    const nodeTs = Array.from({ length: leafPairs }, (_, i) => 0.24 + (i / (leafPairs - 1)) * 0.62);
    const leaves: { position: THREE.Vector3; angle: number; length: number }[] = [];

    nodeTs.forEach((t, i) => {
      const point = curve.getPointAt(t);
      const tan = curve.getTangentAt(t);
      const baseAngle = Math.atan2(tan.y, tan.x);
      const size = THREE.MathUtils.lerp(0.16, 0.32, i / (leafPairs - 1));
      const normal = new THREE.Vector3(-tan.y, tan.x, 0).normalize();
      const lateral = size * 0.55;

      [1, -1].forEach((side) => {
        leaves.push({
          position: point.clone().addScaledVector(normal, side * lateral),
          angle: baseAngle + side * 0.95,
          length: size,
        });
      });
    });

    // Solitary tip leaf, largest, pointing straight out along the branch's end tangent.
    const tipTangent = curve.getTangentAt(1);
    leaves.push({
      position: curve.getPointAt(1).addScaledVector(tipTangent, 0.16),
      angle: Math.atan2(tipTangent.y, tipTangent.x),
      length: 0.4,
    });

    return { curve, leaves };
  }, [leafPairs]);

  return (
    <>
      <mesh castShadow receiveShadow>
        <tubeGeometry args={[curve, 32, TUBE_RADIUS * 0.5, 10, false]} />
        <meshPhysicalMaterial {...silverMaterialProps} />
      </mesh>
      {leaves.map((leaf, i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          position={leaf.position}
          rotation={[0, 0, leaf.angle]}
          scale={[leaf.length, leaf.length * 0.42, leaf.length * 0.18]}
        >
          <sphereGeometry args={[0.5, 16, 12]} />
          <meshPhysicalMaterial {...silverMaterialProps} />
        </mesh>
      ))}
    </>
  );
}

export function RingModel({ sceneState, reducedMotion, isDesktop }: RingModelProps) {
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
      <SilverBand segments={isDesktop ? 48 : 32} />
      <LeafBranch leafPairs={isDesktop ? 4 : 3} />
    </group>
  );
}
