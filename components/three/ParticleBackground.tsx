"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN = "#06b6d4";

/**
 * Floating cyan particle field. Positions + per-particle brightness are
 * computed once (useMemo) and the whole cloud slowly auto-rotates on Y.
 */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const base = new THREE.Color(CYAN);

    for (let i = 0; i < count; i++) {
      // Scatter within a spherical shell so the centre stays clear for the head.
      const r = 2.6 + Math.random() * 7;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Vary brightness (0.35–1.0) to fake per-particle opacity variation.
      const b = 0.35 + Math.random() * 0.65;
      colors[i * 3] = base.r * b;
      colors[i * 3 + 1] = base.g * b;
      colors[i * 3 + 2] = base.b * b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Glowing cyan wireframe "head" — an outer icosahedron with a counter-rotating
 * inner octahedron for a bit of mechanical depth. Emissive so it glows without
 * relying solely on scene lighting.
 */
function RobotHead() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outer.current) {
      outer.current.rotation.y += delta * 0.2;
      outer.current.rotation.x += delta * 0.08;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.3;
      inner.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.7, 1]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.65}
          wireframe
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.9}
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

export default function ParticleBackground() {
  // Fewer particles on small screens to keep the animation smooth.
  // This component is only ever rendered client-side (dynamic import, ssr:false),
  // so `window` is guaranteed to exist here.
  const count = useMemo(
    () => (typeof window !== "undefined" && window.innerWidth < 768 ? 400 : 800),
    []
  );

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} color={CYAN} />
      <pointLight position={[4, 4, 5]} intensity={30} color={CYAN} />
      <Particles count={count} />
      <RobotHead />
    </Canvas>
  );
}
