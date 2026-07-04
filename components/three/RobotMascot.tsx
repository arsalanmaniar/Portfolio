"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import type * as THREE from "three";

const MODEL_URL = "/robot.glb";

/**
 * Animated GLTF robot (Three.js official RobotExpressive example model).
 * Plays the "Idle" clip by default and cross-fades to "Wave" while the canvas
 * is hovered. Gently floats and slowly auto-rotates.
 */
function Robot({ hovered }: { hovered: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, group);

  // Cross-fade between Idle and Wave depending on hover state.
  useEffect(() => {
    const name = hovered ? "Wave" : "Idle";
    const action = actions[name];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [hovered, actions]);

  useFrame((state) => {
    if (!group.current) return;
    // Gentle floating around the base offset.
    group.current.position.y =
      -1.8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
    // Slow auto-rotate.
    group.current.rotation.y += 0.005;
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={1.2}
      position={[0, -1.8, 0]}
    />
  );
}

useGLTF.preload(MODEL_URL);

export default function RobotMascot() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-[480px] w-[320px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.5, 5], fov: 35 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 4, 2]} intensity={1.5} color="#06b6d4" />
        <directionalLight position={[-2, 2, -1]} intensity={0.4} color="#ffffff" />
        <Suspense fallback={null}>
          <Robot hovered={hovered} />
        </Suspense>
      </Canvas>
    </div>
  );
}
