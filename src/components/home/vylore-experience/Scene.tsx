"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { Suspense } from "react";
import { BangleModel } from "./BangleModel";
import type { SceneState } from "./types";

interface SceneProps {
  sceneState: React.RefObject<SceneState>;
  reducedMotion: boolean;
  isDesktop: boolean;
}

export function Scene({ sceneState, reducedMotion, isDesktop }: SceneProps) {
  return (
    <Canvas
      dpr={isDesktop ? [1, 2] : [1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, isDesktop ? 6.4 : 7.6], fov: 32 }}
      className="!absolute !inset-0"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 6]} intensity={2.2} color="#fff6e6" />
      <directionalLight position={[-5, -2, 3]} intensity={1.1} color="#cfe0ff" />
      <spotLight position={[0, 4, 2]} angle={0.5} penumbra={1} intensity={1.4} color="#ffffff" />

      <Suspense fallback={null}>
        <BangleModel sceneState={sceneState} reducedMotion={reducedMotion} isDesktop={isDesktop} />
        <Environment preset="studio" environmentIntensity={1.1} />
        {isDesktop && (
          <ContactShadows
            position={[0, -1.6, 0]}
            opacity={0.35}
            scale={8}
            blur={2.8}
            far={2.4}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
