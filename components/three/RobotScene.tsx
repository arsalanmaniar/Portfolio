"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN = "#06b6d4";
const AMBER = "#f59e0b";

/** Slowly tumbling wireframe torus knot at the centre. */
function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.1, 0.32, 128, 16]} />
      <meshStandardMaterial
        color={CYAN}
        emissive={CYAN}
        emissiveIntensity={0.5}
        wireframe
        roughness={0.4}
        metalness={0.3}
      />
    </mesh>
  );
}

/** Small glowing spheres (cyan + amber) orbiting the knot on the Y axis. */
function OrbitingSpheres() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.4;
    }
  });

  const spheres = useMemo(
    () => [
      { angle: 0, y: 0.3, color: CYAN },
      { angle: Math.PI * 0.5, y: -0.4, color: AMBER },
      { angle: Math.PI, y: 0.5, color: CYAN },
      { angle: Math.PI * 1.5, y: -0.2, color: AMBER },
    ],
    []
  );

  const radius = 2.4;

  return (
    <group ref={group}>
      {spheres.map((s, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(s.angle) * radius,
            s.y,
            Math.sin(s.angle) * radius,
          ]}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={s.color}
            emissive={s.color}
            emissiveIntensity={1.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function RobotScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} color={CYAN} />
      <pointLight position={[5, 5, 5]} intensity={30} color={CYAN} />
      <pointLight position={[-5, -3, 2]} intensity={15} color={AMBER} />
      <TorusKnot />
      <OrbitingSpheres />
    </Canvas>
  );
}
