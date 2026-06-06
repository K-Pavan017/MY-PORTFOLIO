"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const meshRef = useRef<THREE.Points>(null!);
  const count = 750;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
    }
    return [pos, vel];
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#06d6a0"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#e040fb"),
      new THREE.Color("#38bdf8"),
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)];
      cols[i * 3] = c.r;
      cols[i * 3 + 1] = c.g;
      cols[i * 3 + 2] = c.b;
    }
    return cols;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Subtle drift from mouse coordinates
    const mx = state.pointer.x * 1.5;
    const my = state.pointer.y * 1.5;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] + (mx - arr[i * 3]) * 0.0003;
      arr[i * 3 + 1] += velocities[i * 3 + 1] + (my - arr[i * 3 + 1]) * 0.0003;
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      // Wrap around
      if (Math.abs(arr[i * 3]) > 7) velocities[i * 3] *= -1;
      if (Math.abs(arr[i * 3 + 1]) > 7) velocities[i * 3 + 1] *= -1;
      if (Math.abs(arr[i * 3 + 2]) > 4) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;
    
    // Slow rotational movement + mouse drift response
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02 + mx * 0.05;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.01 + my * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Light element inside canvas to respond to mouse coordinates
function MovingLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  useFrame((state) => {
    if (!lightRef.current) return;
    const time = state.clock.getElapsedTime();
    // Orbit around screen center responsive to mouse pointer
    const targetX = Math.sin(time * 0.5) * 4 + state.pointer.x * 2;
    const targetY = Math.cos(time * 0.5) * 4 + state.pointer.y * 2;
    lightRef.current.position.set(targetX, targetY, 2);
  });

  return (
    <>
      <pointLight ref={lightRef} distance={15} intensity={4} color="#7c3aed" />
      <directionalLight position={[0, 5, 5]} intensity={1.5} color="#38bdf8" />
    </>
  );
}

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <MovingLight />
        <Particles />
      </Canvas>
      {/* Radial gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(6,214,160,0.08),transparent_60%)]" />
    </div>
  );
}
