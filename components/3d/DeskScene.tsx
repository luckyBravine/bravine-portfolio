'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function DeskScene() {
  const lampLightRef = useRef<THREE.PointLight>(null);

  // Flickering lamp animation
  useFrame((state) => {
    if (lampLightRef.current) {
      const time = state.clock.elapsedTime;
      lampLightRef.current.intensity = 3 + Math.sin(time * 10) * 0.3 + Math.random() * 0.5;
    }
  });

  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />

      {/* Desk */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[6, 0.2, 3]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Monitor */}
      <group position={[-1.5, 1.2, -0.5]}>
        {/* Monitor stand */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        
        {/* Monitor screen */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.6, 1.2, 0.08]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Screen content - glowing green */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.5, 1.1]} />
          <meshBasicMaterial color="#003300" emissive="#00ff00" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Laptop */}
      <group position={[1.5, 0.3, 0.5]} rotation={[0, -0.3, 0]}>
        {/* Laptop base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 0.04, 0.8]} />
          <meshStandardMaterial color="#2a2a2a" />
        </mesh>
        
        {/* Laptop screen */}
        <mesh position={[0, 0.5, -0.3]} rotation={[-0.2, 0, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Screen content - glowing blue */}
        <mesh position={[0, 0.5, -0.28]} rotation={[-0.2, 0, 0]}>
          <planeGeometry args={[1.1, 0.7]} />
          <meshBasicMaterial color="#001a33" emissive="#0088ff" emissiveIntensity={0.3} />
        </mesh>
      </group>

      {/* Desk Lamp */}
      <group position={[-2.5, 0.5, 0.8]}>
        {/* Lamp base */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.08]} />
          <meshStandardMaterial color="#444" />
        </mesh>
        
        {/* Lamp arm */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.4]}>
          <cylinderGeometry args={[0.04, 0.04, 0.8]} />
          <meshStandardMaterial color="#555" />
        </mesh>
        
        {/* Lamp head */}
        <mesh position={[0.4, 0.4, 0]} rotation={[0, 0, -0.4]}>
          <coneGeometry args={[0.15, 0.25, 8]} />
          <meshStandardMaterial color="#666" emissive="#ff8800" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Flickering light */}
        <pointLight
          ref={lampLightRef}
          position={[0.4, 0.4, 0]}
          color="#ffaa44"
          intensity={3}
          distance={5}
          castShadow
        />
      </group>

      {/* Plant 1 - Left side */}
      <group position={[-2.8, 0.3, -1]}>
        {/* Pot */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.15, 0.12, 0.3]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
        
        {/* Leaves */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 5) * Math.PI * 2) * 0.12,
              0.05 + i * 0.08,
              Math.sin((i / 5) * Math.PI * 2) * 0.12,
            ]}
            rotation={[0, (i / 5) * Math.PI * 2, 0.5]}
          >
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#2d5016" />
          </mesh>
        ))}
      </group>

      {/* Plant 2 - Right side */}
      <group position={[2.8, 0.3, -1]}>
        {/* Pot */}
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.14, 0.11, 0.28]} />
          <meshStandardMaterial color="#A0826D" />
        </mesh>
        
        {/* Succulent leaves */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            position={[
              Math.cos((i / 6) * Math.PI * 2) * 0.1,
              0.02,
              Math.sin((i / 6) * Math.PI * 2) * 0.1,
            ]}
            rotation={[0, (i / 6) * Math.PI * 2, 0.8]}
          >
            <boxGeometry args={[0.06, 0.2, 0.04]} />
            <meshStandardMaterial color="#4a7c59" />
          </mesh>
        ))}
      </group>

      {/* Coffee mug */}
      <group position={[0.8, 0.15, 1.2]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.1, 0.2]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.015, 8, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Coffee inside */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.04]} />
          <meshStandardMaterial color="#3d2817" />
        </mesh>
      </group>

      {/* Keyboard */}
      <mesh position={[0.3, 0.12, 0.9]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1, 0.04, 0.35]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Mouse */}
      <mesh position={[2, 0.13, 0.8]} rotation={[0, -0.3, 0]}>
        <boxGeometry args={[0.15, 0.06, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Books stack */}
      <group position={[-2, 0.2, -0.8]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 0.06, 0.35]} />
          <meshStandardMaterial color="#8B0000" />
        </mesh>
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[0.48, 0.06, 0.33]} />
          <meshStandardMaterial color="#00008B" />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.45, 0.06, 0.31]} />
          <meshStandardMaterial color="#006400" />
        </mesh>
      </group>
    </group>
  );
}
