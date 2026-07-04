"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN = "#06b6d4";
const AMBER = "#f59e0b";

/**
 * A cute techy robot built from Three.js primitives:
 *  - wireframe cyan head + body
 *  - glowing solid cyan eyes
 *  - amber antenna (stalk + bulb)
 *  - wireframe cyan arms
 * The whole group slowly auto-rotates on Y and bobs up/down (Math.sin).
 * When `hovered` is true it spins noticeably faster.
 */
function Robot({ hovered }: { hovered: boolean }) {
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0.35); // current rotation speed (rad/s), eased toward target

  useFrame((state, delta) => {
    if (!group.current) return;

    // Ease spin speed toward the hover target for a smooth ramp.
    const target = hovered ? 1.8 : 0.35;
    spin.current += (target - spin.current) * Math.min(1, delta * 4);
    group.current.rotation.y += delta * spin.current;

    // Gentle floating bob.
    const t = state.clock.getElapsedTime();
    group.current.position.y = Math.sin(t * 1.2) * 0.15;
  });

  return (
    <group ref={group}>
      {/* Head */}
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>

      {/* Eyes — solid, glowing cyan */}
      <mesh position={[-0.2, 1.1, 0.42]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={2.2}
        />
      </mesh>
      <mesh position={[0.2, 1.1, 0.42]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={2.2}
        />
      </mesh>

      {/* Antenna — thin amber stalk + bulb on top */}
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
        <meshStandardMaterial
          color={AMBER}
          emissive={AMBER}
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={AMBER}
          emissive={AMBER}
          emissiveIntensity={2}
        />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1.2, 0.6]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.4}
          wireframe
        />
      </mesh>

      {/* Arms — wireframe cyan cylinders angled slightly outward */}
      <mesh position={[-0.75, 0.1, 0]} rotation={[0, 0, Math.PI / 7]}>
        <cylinderGeometry args={[0.09, 0.09, 1, 12]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.45}
          wireframe
        />
      </mesh>
      <mesh position={[0.75, 0.1, 0]} rotation={[0, 0, -Math.PI / 7]}>
        <cylinderGeometry args={[0.09, 0.09, 1, 12]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.45}
          wireframe
        />
      </mesh>
    </group>
  );
}

export default function RobotMascot() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-[300px] w-[300px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.5, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 3, 4]} intensity={40} color={CYAN} />
        <Robot hovered={hovered} />
      </Canvas>
    </div>
  );
}
