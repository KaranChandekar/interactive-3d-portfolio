"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

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
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!meshRef.current) return;

    const mouse = state.pointer;
    mouseRef.current.x = THREE.MathUtils.lerp(
      mouseRef.current.x,
      mouse.x * 0.3,
      0.05
    );
    mouseRef.current.y = THREE.MathUtils.lerp(
      mouseRef.current.y,
      mouse.y * 0.3,
      0.05
    );

    const targetQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        mouseRef.current.y * Math.PI * 0.2,
        mouseRef.current.x * Math.PI * 0.2,
        state.clock.elapsedTime * speed * 0.2
      )
    );

    meshRef.current.quaternion.slerp(targetQuat, 0.05);
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.4}
      floatIntensity={floatIntensity}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === "icosahedron" && <icosahedronGeometry args={[1, 1]} />}
        {geometry === "torus" && <torusGeometry args={[1, 0.4, 16, 32]} />}
        {geometry === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.6}
          roughness={0.15}
          metalness={0.1}
          transmission={0.6}
          thickness={0.5}
          ior={1.5}
          envMapIntensity={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// Background particle field for depth
function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useRef(
    Float32Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 20)
  );

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.current, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#7c3aed"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function ParallaxShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const bgGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current || !bgGroupRef.current) return;
    const scrollY = window.scrollY || 0;
    // Foreground moves slower than background for parallax
    groupRef.current.position.y = scrollY * 0.001;
    bgGroupRef.current.position.y = scrollY * 0.003;
  });

  return (
    <>
      {/* Background layer - moves faster */}
      <group ref={bgGroupRef}>
        <GeometricShape
          geometry="icosahedron"
          position={[-4, 2, -6]}
          color="#4338ca"
          speed={0.4}
          floatIntensity={0.5}
          scale={0.6}
        />
        <GeometricShape
          geometry="octahedron"
          position={[4, -2, -5]}
          color="#7e22ce"
          speed={0.3}
          floatIntensity={0.4}
          scale={0.5}
        />
      </group>

      {/* Foreground layer */}
      <group ref={groupRef}>
        <GeometricShape
          geometry="icosahedron"
          position={[-2.5, 0.5, -1]}
          color="#6366f1"
          speed={1.2}
          floatIntensity={1.5}
          scale={1.1}
        />
        <GeometricShape
          geometry="torus"
          position={[2.5, -0.5, -2]}
          color="#a855f7"
          speed={0.8}
          floatIntensity={1}
          scale={1}
        />
        <GeometricShape
          geometry="octahedron"
          position={[0, 1.5, -1.5]}
          color="#ec4899"
          speed={1}
          floatIntensity={1.2}
          scale={0.9}
        />
      </group>
    </>
  );
}

function CameraController() {
  const { camera } = useThree();

  useFrame(() => {
    const scrollY = window.scrollY || 0;
    const scrollFactor = scrollY * 0.0005;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5 - scrollFactor * 2, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, -scrollFactor * 1.5, 0.05);
    camera.lookAt(0, -scrollFactor * 0.5, 0);
  });

  return null;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[5, 3, -3]} intensity={0.4} color="#06b6d4" />
      <Environment preset="night" />
      <CameraController />
      <ParticleField />
      <ParallaxShapes />
    </Canvas>
  );
}
