"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

interface ProjectViewer3DProps {
  activeProjectId: string;
}

function FloatingLaptop({ activeProjectId }: { activeProjectId: string }) {
  const groupRef = useRef<THREE.Group>(null!);

  // Simple map to translate project IDs to glowing hex colors
  const projectColors: Record<string, string> = {
    rentspace: "#e040fb",     // Magenta
    stockwave: "#06d6a0",     // Cyan
    "youtube-agent": "#7c3aed", // Violet
    "rag-assistant": "#38bdf8", // Blue
  };

  const activeColor = projectColors[activeProjectId] || "#7c3aed";

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Bobbing floating motion
      groupRef.current.position.y = Math.sin(t * 1.8) * 0.15;
      // Gentle rotation sway
      groupRef.current.rotation.y = Math.cos(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.4, 0]} scale={1.25}>
      {/* Laptop Base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.05, 1.2]} />
        <meshStandardMaterial color="#0d0d1a" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* Keyboard area recess */}
      <mesh position={[0, 0.03, 0.2]}>
        <boxGeometry args={[1.4, 0.01, 0.5]} />
        <meshStandardMaterial color="#1f1f2e" roughness={0.7} />
      </mesh>
      {/* Keyboard Keys Glow */}
      <mesh position={[0, 0.035, 0.2]}>
        <boxGeometry args={[1.36, 0.005, 0.46]} />
        <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={0.8} wireframe />
      </mesh>

      {/* Laptop Screen Hinge */}
      <mesh position={[0, 0.03, -0.55]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 1.6, 16]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.9} />
      </mesh>

      {/* Laptop Screen Back lid */}
      <group position={[0, 0.72, -0.58]} rotation={[0.12, 0, 0]}>
        {/* Bezel frame */}
        <mesh castShadow>
          <boxGeometry args={[1.8, 1.2, 0.04]} />
          <meshStandardMaterial color="#141426" metalness={0.95} roughness={0.2} />
        </mesh>
        
        {/* Holographic Glowing Screen Display */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[1.72, 1.12]} />
          <meshStandardMaterial 
            color={activeColor} 
            emissive={activeColor} 
            emissiveIntensity={2.2} 
            roughness={0.1}
          />
        </mesh>

        {/* Matrix style wireframe overlays representing active processes */}
        <mesh position={[0, 0, 0.025]}>
          <planeGeometry args={[1.6, 1.0]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.18} wireframe />
        </mesh>
      </group>

      {/* Decorative Floating Tech Accents (Parallax Particles) */}
      <group position={[0, 0.5, 0]}>
        <mesh position={[-1.4, 0.6, -0.4]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[1.4, 0.2, 0.2]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={activeColor} emissive={activeColor} emissiveIntensity={1.5} />
        </mesh>
      </group>
    </group>
  );
}

export default function ProjectViewer3D({ activeProjectId }: ProjectViewer3DProps) {
  return (
    <div className="w-full h-[260px] sm:h-[320px] md:h-[360px] cursor-grab active:cursor-grabbing relative bg-surface-light/20 rounded-3xl border border-white/5 overflow-hidden">
      {/* Decorative helper tags */}
      <div className="absolute top-3 right-4 z-10 px-2.5 py-1 rounded-full text-[9px] font-mono font-medium flex items-center gap-1.5 glass border-white/5 text-muted pointer-events-none uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
        Holo Console
      </div>

      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.8, 3.8], fov: 42 }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <pointLight position={[0, 4, 2]} intensity={1.2} color="#ffffff" />
        <pointLight position={[0, -2, -2]} intensity={0.5} color="#7c3aed" />

        <Suspense fallback={null}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            enableDamping
            dampingFactor={0.05}
          />
          <FloatingLaptop activeProjectId={activeProjectId} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
}
