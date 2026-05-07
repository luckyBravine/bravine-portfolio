'use client';

/**
 * Data Flow Particles Component
 * 
 * Animates particles flowing along connection edges to visualize data flow.
 */

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface DataFlowParticlesProps {
  edges: Array<{
    start: [number, number, number];
    end: [number, number, number];
    strength: number;
  }>;
  particleCount?: number;
  speed?: number;
}

export function DataFlowParticles({
  edges,
  particleCount = 5,
  speed = 0.01,
}: DataFlowParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const progressRef = useRef<number[]>([]);

  // Create particle geometry and material
  const { geometry, material, particleData } = useMemo(() => {
    const totalParticles = edges.length * particleCount;
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);
    const sizes = new Float32Array(totalParticles);

    const data: Array<{ edgeIndex: number; progress: number }> = [];

    edges.forEach((edge, edgeIndex) => {
      for (let i = 0; i < particleCount; i++) {
        const particleIndex = edgeIndex * particleCount + i;
        const progress = i / particleCount;

        // Initial position along the edge
        const x = edge.start[0] + (edge.end[0] - edge.start[0]) * progress;
        const y = edge.start[1] + (edge.end[1] - edge.start[1]) * progress;
        const z = edge.start[2] + (edge.end[2] - edge.start[2]) * progress;

        positions[particleIndex * 3] = x;
        positions[particleIndex * 3 + 1] = y;
        positions[particleIndex * 3 + 2] = z;

        // Color based on edge strength
        const color = new THREE.Color().setHSL(0.6, 1, 0.5 + edge.strength * 0.3);
        colors[particleIndex * 3] = color.r;
        colors[particleIndex * 3 + 1] = color.g;
        colors[particleIndex * 3 + 2] = color.b;

        // Size based on edge strength
        sizes[particleIndex] = 2 + edge.strength * 3;

        data.push({ edgeIndex, progress });
      }
    });

    progressRef.current = data.map(d => d.progress);

    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    return { geometry: geom, material: mat, particleData: data };
  }, [edges, particleCount]);

  // Animate particles
  useFrame(() => {
    if (!particlesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    particleData.forEach((data, index) => {
      // Update progress
      progressRef.current[index] += speed;
      if (progressRef.current[index] > 1) {
        progressRef.current[index] = 0;
      }

      const progress = progressRef.current[index];
      const edge = edges[data.edgeIndex];

      // Calculate new position along the edge
      const x = edge.start[0] + (edge.end[0] - edge.start[0]) * progress;
      const y = edge.start[1] + (edge.end[1] - edge.start[1]) * progress;
      const z = edge.start[2] + (edge.end[2] - edge.start[2]) * progress;

      positions[index * 3] = x;
      positions[index * 3 + 1] = y;
      positions[index * 3 + 2] = z;
    });

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry} material={material} />
  );
}
