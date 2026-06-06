"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import * as THREE from "three";

function DeveloperWorkstation({ isMobile }: { isMobile: boolean }) {
  const meshRef = useRef<THREE.Group>(null!);

  // Gentle floating animation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y = -1.2 + Math.sin(t * 1.5) * 0.15;
      meshRef.current.rotation.y = t * 0.12;
    }
  });

  return (
    <group ref={meshRef} scale={isMobile ? 0.95 : 1.3} position={[0, -1.2, 0]}>
      {/* Table Desk Base */}
      <mesh receiveShadow castShadow position={[0, -0.1, 0]}>
        <boxGeometry args={[3.2, 0.1, 1.8]} />
        <meshStandardMaterial color="#0d0d1a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Table Legs */}
      <mesh receiveShadow castShadow position={[-1.5, -0.6, 0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.9} />
      </mesh>
      <mesh receiveShadow castShadow position={[1.5, -0.6, 0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.9} />
      </mesh>
      <mesh receiveShadow castShadow position={[-1.5, -0.6, -0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.9} />
      </mesh>
      <mesh receiveShadow castShadow position={[1.5, -0.6, -0.8]}>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.9} />
      </mesh>

      {/* Main Monitor Stand */}
      <mesh castShadow position={[0, 0.25, -0.5]}>
        <cylinderGeometry args={[0.06, 0.08, 0.6, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh castShadow position={[0, 0.02, -0.5]}>
        <boxGeometry args={[0.5, 0.03, 0.4]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.9} />
      </mesh>

      {/* Main Curved Ultra-wide Screen */}
      <group position={[0, 0.8, -0.45]} rotation={[0.05, 0, 0]}>
        {/* Bezel */}
        <mesh castShadow>
          <boxGeometry args={[2.4, 0.9, 0.08]} />
          <meshStandardMaterial color="#141426" metalness={0.95} roughness={0.15} />
        </mesh>
        {/* Glowing Screen Panel */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.32, 0.82]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#7c3aed"
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>
        {/* Decorative holographic code pattern block */}
        <mesh position={[0.5, 0, 0.05]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.8, 0.6]} />
          <meshBasicMaterial color="#06d6a0" transparent opacity={0.65} wireframe />
        </mesh>
        <mesh position={[-0.5, 0.1, 0.05]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.6, 0.4]} />
          <meshBasicMaterial color="#e040fb" transparent opacity={0.5} wireframe />
        </mesh>
      </group>

      {/* Computer Case */}
      <group position={[1.2, 0.45, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.4, 0.8, 0.8]} />
          <meshStandardMaterial color="#14142a" metalness={0.9} roughness={0.2} transparent opacity={0.8} />
        </mesh>
        {/* Glowing Internals */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.36, 0.76, 0.76]} />
          <meshStandardMaterial color="#7c3aed" emissive="#e040fb" emissiveIntensity={2.5} wireframe />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh castShadow position={[0, 0.03, 0.1]}>
        <boxGeometry args={[1.0, 0.04, 0.35]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Keyboard Keys Glow */}
      <mesh position={[0, 0.05, 0.1]}>
        <boxGeometry args={[0.96, 0.02, 0.31]} />
        <meshStandardMaterial color="#06d6a0" emissive="#06d6a0" emissiveIntensity={1.2} wireframe />
      </mesh>

      {/* Mouse & Mousepad */}
      <mesh receiveShadow position={[0.65, 0.015, 0.1]}>
        <boxGeometry args={[0.2, 0.01, 0.3]} />
        <meshStandardMaterial color="#0d0d1a" roughness={0.6} />
      </mesh>
      <mesh castShadow position={[0.65, 0.04, 0.1]}>
        <boxGeometry args={[0.08, 0.04, 0.14]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Ambient Desk LED Glowstrip (Back edge) */}
      <mesh position={[0, 0.02, -0.85]}>
        <boxGeometry args={[3.0, 0.02, 0.04]} />
        <meshStandardMaterial color="#e040fb" emissive="#e040fb" emissiveIntensity={3.0} />
      </mesh>

      {/* Futuristic Floating Data Rings */}
      <group position={[0, 2.0, -0.5]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.5, 0.012, 8, 64]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} wireframe />
        </mesh>
        <mesh rotation={[Math.PI / 2.3, 0.2, 0.1]}>
          <torusGeometry args={[1.2, 0.008, 8, 64]} />
          <meshBasicMaterial color="#06d6a0" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function ComputersCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div className="w-full h-[320px] sm:h-[450px] md:h-[500px] lg:h-[550px] cursor-grab active:cursor-grabbing relative">
      {/* Decorative helper tags */}
      <div className="absolute top-2 right-4 z-10 px-2.5 py-1 rounded-full text-[9px] font-mono font-medium flex items-center gap-1.5 glass border-white/5 text-muted pointer-events-none uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping" />
        Drag to Orbit 3D Workspace
      </div>

      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 2, 6.5], fov: isMobile ? 38 : 34 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#7c3aed" />
        <pointLight position={[0, -2, 2]} intensity={0.5} />

        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3.5}
            enableDamping
            dampingFactor={0.05}
          />
          <DeveloperWorkstation isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
