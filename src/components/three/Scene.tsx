"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

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

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity: 0.5,
        roughness: 0.2,
        metalness: 0.7,
        side: THREE.DoubleSide,
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

function Shapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const sy = window.scrollY || 0;
    if (groupRef.current) groupRef.current.position.y = sy * 0.001;
  });

  return (
    <group ref={groupRef}>
      <GeometricShape
        geometry="icosahedron"
        position={[-1.5, 0.8, -1]}
        color="#c8ff00"
        speed={0.8}
        floatIntensity={1.2}
        scale={1.1}
      />
      <GeometricShape
        geometry="torus"
        position={[1.8, -0.6, -2]}
        color="#96bf00"
        speed={0.6}
        floatIntensity={0.8}
        scale={0.9}
      />
      <GeometricShape
        geometry="octahedron"
        position={[0.2, 1.8, -1.5]}
        color="#d4ff4d"
        speed={0.7}
        floatIntensity={1}
        scale={0.7}
      />
    </group>
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
      <pointLight position={[-5, -3, 4]} intensity={0.6} color="#c8ff00" />
      <Camera />
      <Shapes />
    </Canvas>
  );
}
