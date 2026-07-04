"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const CYAN = "#06b6d4";
const AMBER = "#f59e0b";
const GREEN = "#22c55e";
const SILVER = "#a0aec0";
const DARK = "#1a202c";

/**
 * A more realistic techy robot built from Three.js primitives with metallic
 * MeshStandardMaterial surfaces. Full body: head + cyan visor + glowing eyes,
 * chest panel with indicator lights, jointed arms, legs + feet, and a pulsing
 * amber antenna. The whole group auto-rotates on Y, bobs up/down, and tilts
 * subtly on X. Hovering the canvas smoothly increases the spin speed.
 */
function Robot({ hovered }: { hovered: boolean }) {
  const group = useRef<THREE.Group>(null);
  const antenna = useRef<THREE.MeshStandardMaterial>(null);
  const spin = useRef(0.35); // current rotation speed (rad/s), eased toward target

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Ease spin speed toward the hover target for a smooth ramp.
    const target = hovered ? 1.8 : 0.35;
    spin.current += (target - spin.current) * Math.min(1, delta * 4);
    group.current.rotation.y += delta * spin.current;

    // Gentle floating bob + subtle tilt.
    group.current.position.y = Math.sin(t * 1.2) * 0.15;
    group.current.rotation.x = Math.sin(t * 0.9) * 0.05;

    // Pulsing antenna glow.
    if (antenna.current) {
      antenna.current.emissiveIntensity = 1.4 + Math.sin(t * 4) * 1;
    }
  });

  return (
    <group ref={group}>
      {/* ---------- HEAD ---------- */}
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cyan visor across the front of the head */}
      <mesh position={[0, 1.4, 0.46]}>
        <boxGeometry args={[0.7, 0.2, 0.1]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Glowing eyes on the visor */}
      <mesh position={[-0.17, 1.4, 0.52]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.17, 1.4, 0.52]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} />
      </mesh>

      {/* ---------- ANTENNA (pulsing amber) ---------- */}
      <mesh position={[0, 2.0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0, 2.25, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial ref={antenna} color={AMBER} emissive={AMBER} emissiveIntensity={2} />
      </mesh>

      {/* ---------- BODY ---------- */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.1, 1.3, 0.7]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Chest panel */}
      <mesh position={[0, 0.4, 0.37]}>
        <boxGeometry args={[0.6, 0.4, 0.05]} />
        <meshStandardMaterial
          color={DARK}
          emissive={CYAN}
          emissiveIntensity={0.25}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Chest indicator dots: cyan, amber, green */}
      <mesh position={[-0.15, 0.4, 0.41]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, 0.4, 0.41]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={AMBER} emissive={AMBER} emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.15, 0.4, 0.41]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={2} />
      </mesh>

      {/* ---------- ARMS (with shoulder joints) ---------- */}
      {/* Left */}
      <mesh position={[-0.72, 0.7, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-0.78, 0.2, 0]} rotation={[0, 0, Math.PI / 14]}>
        <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Right */}
      <mesh position={[0.72, 0.7, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[0.78, 0.2, 0]} rotation={[0, 0, -Math.PI / 14]}>
        <cylinderGeometry args={[0.15, 0.12, 0.8, 16]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* ---------- LEGS + FEET ---------- */}
      {/* Left */}
      <mesh position={[-0.28, -0.65, 0]}>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.28, -0.95, 0.05]}>
        <boxGeometry args={[0.3, 0.1, 0.35]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Right */}
      <mesh position={[0.28, -0.65, 0]}>
        <boxGeometry args={[0.25, 0.5, 0.25]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.28, -0.95, 0.05]}>
        <boxGeometry args={[0.3, 0.1, 0.35]} />
        <meshStandardMaterial color={SILVER} metalness={0.9} roughness={0.15} />
      </mesh>
    </group>
  );
}

export default function RobotMascot() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-[420px] w-[320px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.4, 5.5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 2]} intensity={1.5} color={CYAN} />
        <pointLight position={[-2, 1, -1]} intensity={0.5} color="#ffffff" />
        <pointLight position={[0, -2, -2]} intensity={0.3} color={AMBER} />
        <Robot hovered={hovered} />
      </Canvas>
    </div>
  );
}
