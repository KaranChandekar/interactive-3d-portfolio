"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Pre-allocate reusable objects outside components to avoid GC pressure
const _euler = new THREE.Euler();
const _quat = new THREE.Quaternion();

function GeometricShape({
  geometry,
  position,
  color,
  speed = 1,
  floatIntensity = 1,
  scale = 1,
}: {
  geometry: "icosahedron" | "torus" | "octahedron";
  position: [number, number, number];
  color: string;
  speed?: number;
  floatIntensity?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseSmooth = useRef({ x: 0, y: 0 });

  // Memoize material to avoid re-creation
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity: 0.35,
        roughness: 0.3,
        metalness: 0.6,
        side: THREE.DoubleSide,
        wireframe: false,
      }),
    [color]
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { x, y } = state.pointer;
    mouseSmooth.current.x += (x * 0.3 - mouseSmooth.current.x) * 0.05;
    mouseSmooth.current.y += (y * 0.3 - mouseSmooth.current.y) * 0.05;

    _euler.set(
      mouseSmooth.current.y * Math.PI * 0.15,
      mouseSmooth.current.x * Math.PI * 0.15,
      state.clock.elapsedTime * speed * 0.15
    );
    _quat.setFromEuler(_euler);
    mesh.quaternion.slerp(_quat, 0.04);
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.3}
      floatIntensity={floatIntensity}
      floatingRange={[-0.15, 0.15]}
    >
      <mesh ref={meshRef} position={position} scale={scale} material={material}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {geometry === "torus" && <torusGeometry args={[1, 0.35, 12, 24]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(
    () => Float32Array.from({ length: 100 * 3 }, () => (Math.random() - 0.5) * 18),
    []
  );

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#7c3aed" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

function Shapes() {
  const fgRef = useRef<THREE.Group>(null);
  const bgRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const sy = window.scrollY || 0;
    if (fgRef.current) fgRef.current.position.y = sy * 0.001;
    if (bgRef.current) bgRef.current.position.y = sy * 0.0025;
  });

  return (
    <>
      <group ref={bgRef}>
        <GeometricShape geometry="icosahedron" position={[-4, 2, -6]} color="#4338ca" speed={0.4} floatIntensity={0.4} scale={0.5} />
        <GeometricShape geometry="octahedron" position={[4, -2, -5]} color="#7e22ce" speed={0.3} floatIntensity={0.3} scale={0.4} />
      </group>
      <group ref={fgRef}>
        <GeometricShape geometry="icosahedron" position={[-2.5, 0.5, -1]} color="#6366f1" speed={1} floatIntensity={1.2} scale={1} />
        <GeometricShape geometry="torus" position={[2.5, -0.5, -2]} color="#a855f7" speed={0.7} floatIntensity={0.8} scale={0.9} />
        <GeometricShape geometry="octahedron" position={[0, 1.5, -1.5]} color="#ec4899" speed={0.8} floatIntensity={1} scale={0.8} />
      </group>
    </>
  );
}

function Camera() {
  const { camera } = useThree();
  const zRef = useRef(5);
  const yRef = useRef(0);

  useFrame(() => {
    const f = (window.scrollY || 0) * 0.0005;
    zRef.current += (5 - f * 2 - zRef.current) * 0.04;
    yRef.current += (-f * 1.5 - yRef.current) * 0.04;
    camera.position.z = zRef.current;
    camera.position.y = yRef.current;
    camera.lookAt(0, yRef.current * 0.3, 0);
  });

  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop="always"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -3, 4]} intensity={0.6} color="#7c3aed" />
      <Camera />
      <ParticleField />
      <Shapes />
    </Canvas>
  );
}
