"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function useTheme() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setIsDark(detail.theme === "dark");
    };
    window.addEventListener("themechange", handler);
    return () => window.removeEventListener("themechange", handler);
  }, []);

  return isDark;
}

/* ─── Morphing Icosphere with noise displacement ─── */
function MorphingSculpture({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const originalPositions = useRef<Float32Array | null>(null);
  
  useEffect(() => {
    if (meshRef.current) {
      const geo = meshRef.current.geometry;
      originalPositions.current = new Float32Array(geo.attributes.position.array);
    }
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !originalPositions.current) return;
    
    const t = state.clock.elapsedTime;
    const geo = meshRef.current.geometry;
    const positions = geo.attributes.position.array as Float32Array;
    const original = originalPositions.current;
    
    // Vertex displacement — organic morphing effect
    for (let i = 0; i < positions.length; i += 3) {
      const ox = original[i];
      const oy = original[i + 1];
      const oz = original[i + 2];
      
      // Simplex-like noise using sin combinations
      const noise = 
        Math.sin(ox * 2.0 + t * 0.6) * 0.12 +
        Math.sin(oy * 2.5 + t * 0.8) * 0.10 +
        Math.sin(oz * 1.8 + t * 0.5) * 0.08 +
        Math.sin((ox + oy) * 1.5 + t * 1.2) * 0.05;
      
      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const nx = ox / len;
      const ny = oy / len;
      const nz = oz / len;
      
      positions[i] = ox + nx * noise;
      positions[i + 1] = oy + ny * noise;
      positions[i + 2] = oz + nz * noise;
    }
    
    geo.attributes.position.needsUpdate = true;
    geo.computeVertexNormals();
    
    // Smooth rotation tracking pointer
    const targetRotationX = Math.sin(t * 0.15) * 0.4 + (state.pointer.y * 0.6);
    const targetRotationY = t * 0.04 + (state.pointer.x * 0.6);
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.08);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.08);
    
    // Gentle breathing scale
    const scale = 1 + Math.sin(t * 0.3) * 0.03;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[2, 3]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={2}
          roughness={isDark ? 0.08 : 0.12}
          transmission={1}
          ior={1.5}
          chromaticAberration={isDark ? 0.15 : 0.08}
          anisotropy={0.3}
          distortion={0.3}
          distortionScale={0.6}
          temporalDistortion={0.12}
          color={isDark ? "#0F1117" : "#ffffff"}
          attenuationDistance={2.5}
          attenuationColor={isDark ? "#818CF8" : "#4F46E5"}
        />
      </mesh>
    </Float>
  );
}

/* ─── Floating particles ─── */
function FloatingParticles({ isDark, count = 40 }: { isDark: boolean; count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
        ] as [number, number, number],
        speed: 0.2 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        scale: 0.02 + Math.random() * 0.04,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    
    particles.forEach((particle, i) => {
      const { position, speed, phase, scale } = particle;
      dummy.position.set(
        position[0] + Math.sin(t * speed + phase) * 0.5,
        position[1] + Math.cos(t * speed * 0.7 + phase) * 0.8,
        position[2] + Math.sin(t * speed * 0.5 + phase) * 0.3,
      );
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshPhysicalMaterial
        color={isDark ? "#818CF8" : "#4F46E5"}
        metalness={0.6}
        roughness={0.3}
        clearcoat={1}
        transparent
        opacity={0.6}
      />
    </instancedMesh>
  );
}

/* ─── Orbiting accent shape ─── */
function OrbitingAccent({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      meshRef.current.position.x = Math.cos(t * 0.4) * 4;
      meshRef.current.position.z = Math.sin(t * 0.4) * 4;
      meshRef.current.position.y = Math.sin(t * 0.8) * 1.5;
      meshRef.current.rotation.x += 0.015;
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.25, 0]} />
      <meshPhysicalMaterial 
        color={isDark ? "#FB923C" : "#DC6843"}
        metalness={0.8} 
        roughness={0.15} 
        clearcoat={1}
        emissive={isDark ? "#FB923C" : "#DC6843"}
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

function CameraRig() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state) => {
    const baseZ = isMobile ? 16 : 12;
    state.camera.position.lerp(
      new THREE.Vector3(
        (state.pointer.x * 1.5),
        (state.pointer.y * 0.8) + (isMobile ? 1.5 : 0.5), // move down slightly on mobile
        baseZ
      ),
      0.04
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <ambientLight intensity={isDark ? 0.5 : 0.8} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={isDark ? 1.5 : 2.5} 
        color={isDark ? "#A5B4FC" : "#ffffff"} 
      />
      <directionalLight 
        position={[-10, -10, -10]} 
        intensity={isDark ? 0.3 : 0.5} 
        color={isDark ? "#34D399" : "#059669"} 
      />
      <Environment preset={isDark ? "night" : "city"} />
      <MorphingSculpture isDark={isDark} />
      <FloatingParticles isDark={isDark} />
      <OrbitingAccent isDark={isDark} />
      <ContactShadows 
        position={[0, -4, 0]} 
        opacity={isDark ? 0.5 : 0.3} 
        scale={16} 
        blur={2.5} 
        far={6} 
        color={isDark ? "#000000" : "#1A1A1A"}
      />
      <CameraRig />
    </>
  );
}

export function Hero3D() {
  const [isLoaded, setIsLoaded] = useState(false);
  const isDark = useTheme();

  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-bg opacity-85" style={{
      backgroundImage: "radial-gradient(circle at center, transparent 0%, var(--color-bg) 100%)"
    }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 12], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setIsLoaded(true)}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        {isLoaded && <Scene isDark={isDark} />}
      </Canvas>
    </div>
  );
}