"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

interface GSLogo3DProps {
  isHovered: boolean;
  mousePosition: { x: number; y: number };
  onExited?: () => void;
  text?: string;
}

function Scene({ mousePosition, text = "GS" }: Pick<GSLogo3DProps, "mousePosition" | "text">) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // We remove the auto-rotation to avoid unwanted movement as requested
      // meshRef.current.rotation.y += delta * 0.15;
      
      // Target parallax rotation based on mouse coordinates (-1 to 1)
      const targetRotationX = mousePosition.y * 0.4;
      const targetRotationY = mousePosition.x * 0.4;
      const targetRotationZ = -mousePosition.x * 0.2; 
      
      // Smoothly interpolate rotation to follow mouse only
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.1);
      meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, targetRotationZ, 0.1);
    }
  });

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json"
        size={2.2}
        height={0.5}
        curveSegments={12}
        bevelEnabled={true}
        bevelThickness={0.03}
        bevelSize={0.03}
        bevelOffset={0}
        bevelSegments={6}
      >
        {text}
        <meshPhysicalMaterial 
          color="#f8f8f8"
          roughness={0.15}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </Text3D>
    </Center>
  );
}

export default function GSLogo3D({ isHovered, mousePosition, onExited, text = "GS" }: GSLogo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    if (isHovered) {
      gsap.killTweensOf(containerRef.current);
      gsap.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.killTweensOf(containerRef.current);
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          if (onExited) onExited();
        }
      });
    }
  }, [isHovered, mounted, onExited]);

  if (!mounted) return null;

  return (
    <div 
      className="absolute top-[135%] left-[70%] md:left-[75%] z-50 pointer-events-none hidden md:block" 
      style={{ transform: "translateY(-50%)" }}
    >
      <div 
        ref={containerRef}
        className="w-[450px] h-[450px] opacity-0"
        style={{ transform: "scale(0.8)" }}
      >
        <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={1.2} />
          <directionalLight intensity={2.5} position={[3, 5, 2]} />
          <directionalLight intensity={1.5} position={[-2, -3, -2]} color="#a3c2ff" />
          <directionalLight intensity={1} position={[2, -2, -2]} color="#ffb8a3" />
          <Suspense fallback={null}>
            <Scene mousePosition={mousePosition} text={text} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
