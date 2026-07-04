"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/humanoid-robot.glb";
const CYAN = "#06b6d4";
const BASE_Y = -1.2;

/**
 * Humanoid robot (Three.js Soldier model) re-skinned to a metallic cyan
 * "Iron-Man" look. All materials are overridden to a chrome-cyan
 * MeshStandardMaterial. Plays the first animation clip by default and
 * cross-fades to a second clip on hover. Always floats, breathes, and slowly
 * auto-rotates (faster on hover).
 */
function Robot({ hovered }: { hovered: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, group);
  const spin = useRef(0.003); // per-frame Y rotation, eased toward target

  // Override every mesh material with the cyan metallic theme (once per scene).
  useMemo(() => {
    scene.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0e7490"),
          metalness: 0.95,
          roughness: 0.05,
          emissive: new THREE.Color(CYAN),
          emissiveIntensity: 0.15,
        });
        mesh.castShadow = true;
      }
    });
  }, [scene]);

  // Play first clip by default, second clip on hover. Falls back gracefully
  // (the manual float/rotate below runs regardless of whether clips exist).
  useEffect(() => {
    if (names.length === 0) return;
    const name = hovered
      ? names[Math.min(1, names.length - 1)]
      : names[0];
    const action = actions[name];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [hovered, actions, names]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;

    // Ease the auto-rotation speed toward the hover target.
    const target = hovered ? 0.015 : 0.003;
    spin.current += (target - spin.current) * 0.05;
    group.current.rotation.y += spin.current;

    // Floating bob + subtle breathing (scale on Y around the 1.5 base).
    group.current.position.y = BASE_Y + Math.sin(t * 0.8) * 0.08;
    group.current.scale.y = 1.5 * (1 + Math.sin(t * 1.2) * 0.01);
  });

  return (
    <primitive ref={group} object={scene} scale={1.5} position={[0, BASE_Y, 0]} />
  );
}

/** Pulsing cyan halo ring flat on the ground beneath the robot. */
function BaseGlow() {
  const ring = useRef<THREE.Mesh>(null);

  // Soft radial gradient texture for a fog-like glow pool under the feet.
  const glowTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, "rgba(6,182,212,0.55)");
    grad.addColorStop(0.5, "rgba(6,182,212,0.18)");
    grad.addColorStop(1, "rgba(6,182,212,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (ring.current) {
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.15;
    }
  });

  return (
    <group position={[0, BASE_Y, 0]}>
      {/* Soft fog glow pool */}
      {glowTexture && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[3.2, 3.2]} />
          <meshBasicMaterial
            map={glowTexture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
      {/* Pulsing halo ring */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[0.3, 0.8, 32]} />
        <meshBasicMaterial
          color={CYAN}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL_URL);

export default function RobotMascot() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-[500px] w-[300px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 1.2, 3.5], fov: 40 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 5, 3]} intensity={2} color={CYAN} />
        <pointLight position={[-3, 3, -2]} intensity={1} color="#ffffff" />
        <pointLight position={[0, -2, 2]} intensity={0.5} color={CYAN} />
        <Suspense fallback={null}>
          <Robot hovered={hovered} />
          <BaseGlow />
        </Suspense>
      </Canvas>
    </div>
  );
}
