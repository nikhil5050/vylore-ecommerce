"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { BraceletBillboard } from "./BraceletBillboard";
import type { SceneState } from "./types";

interface SceneProps {
  sceneState: React.RefObject<SceneState>;
  reducedMotion: boolean;
  isDesktop: boolean;
}

// No scene lights or environment map here on purpose: the bracelet billboard
// is unlit (meshBasicMaterial) so the photo's own baked-in highlights render
// exactly as shot, with nothing left to add lighting/reflections on top of it.
export function Scene({ sceneState, reducedMotion, isDesktop }: SceneProps) {
  return (
    <Canvas
      dpr={isDesktop ? [1, 2] : [1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, isDesktop ? 6.4 : 7.6], fov: 32 }}
      className="!absolute !inset-0"
    >
      <Suspense fallback={null}>
        <BraceletBillboard
          sceneState={sceneState}
          reducedMotion={reducedMotion}
          isDesktop={isDesktop}
        />
        {isDesktop && (
          <ContactShadows position={[0, -1.3, 0]} opacity={0.32} scale={8} blur={2.8} far={2.4} />
        )}
      </Suspense>
    </Canvas>
  );
}
