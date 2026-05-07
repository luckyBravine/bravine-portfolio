'use client';

/**
 * 3D Visualization Component
 * 
 * WebGL-based 3D visualization using react-three-fiber and Three.js.
 */

import React, { Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { TechnologyGraph, TechnologyNode } from '@/lib/types/technology-graph';
import { NodeInfoPanel } from './NodeInfoPanel';
import { DataFlowParticles } from './DataFlowParticles';
import { getPerformanceMonitor } from '@/lib/utils/performance-monitor';

export interface Visualization3DProps {
  graph: TechnologyGraph;
  quality: 'full' | 'simplified';
  onNodeHover?: (node: TechnologyNode | null) => void;
  onNodeClick?: (node: TechnologyNode) => void;
  cameraPosition?: [number, number, number];
  enableParticles?: boolean;
}

export function Visualization3D({
  graph,
  quality,
  onNodeHover,
  onNodeClick,
  cameraPosition = [0, 0, 500],
  enableParticles = true,
}: Visualization3DProps) {
  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [fps, setFps] = useState<number>(0);

  const handleNodeClick = (node: TechnologyNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);
  };

  const handleNodeHover = (node: TechnologyNode | null) => {
    onNodeHover?.(node);
  };

  // Keyboard help toggle
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' || e.key === 'h') {
        setShowKeyboardHelp(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas
        className="w-full h-full"
        gl={{ antialias: quality === 'full', alpha: true }}
        dpr={quality === 'full' ? [1, 2] : 1}
      >
        {/* Camera */}
        <PerspectiveCamera
          makeDefault
          position={cameraPosition}
          fov={75}
          near={0.1}
          far={2000}
        />

        {/* Camera controls with keyboard support */}
        <KeyboardOrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.8}
          minDistance={200}
          maxDistance={1000}
          enablePan={true}
        />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        {/* FPS Monitor */}
        <FPSMonitor onFPSUpdate={setFps} />

        {/* Scene content */}
        <Suspense fallback={null}>
          <TechnologyGraph3D
            graph={graph}
            quality={quality}
            enableParticles={enableParticles}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
          />
        </Suspense>
      </Canvas>

      {/* Node info panel */}
      {selectedNode && <NodeInfoPanel node={selectedNode} />}

      {/* FPS Counter (dev mode) */}
      {process.env.NODE_ENV === 'development' && fps > 0 && (
        <div className="absolute top-4 left-4 bg-gray-800 bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm z-10">
          <span className={fps >= 60 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'}>
            {fps} FPS
          </span>
        </div>
      )}

      {/* Keyboard help overlay */}
      {showKeyboardHelp && (
        <div className="absolute top-4 right-4 bg-gray-800 bg-opacity-95 text-white p-4 rounded-lg shadow-lg max-w-xs z-10">
          <h3 className="font-semibold mb-2">Keyboard Controls</h3>
          <ul className="text-sm space-y-1">
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">↑/W</kbd> Rotate up</li>
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">↓/S</kbd> Rotate down</li>
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">←/A</kbd> Rotate left</li>
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">→/D</kbd> Rotate right</li>
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">+/=</kbd> Zoom in</li>
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">-</kbd> Zoom out</li>
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">R</kbd> Reset view</li>
            <li><kbd className="px-1 py-0.5 bg-gray-700 rounded">?/H</kbd> Toggle help</li>
          </ul>
        </div>
      )}

      {/* Keyboard hint */}
      {!showKeyboardHelp && (
        <button
          onClick={() => setShowKeyboardHelp(true)}
          className="absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-opacity z-10"
          aria-label="Show keyboard controls"
        >
          Press <kbd className="px-1 py-0.5 bg-gray-700 rounded">?</kbd> for controls
        </button>
      )}
    </div>
  );
}

/**
 * Technology Graph 3D Scene Component
 */
interface TechnologyGraph3DProps {
  graph: TechnologyGraph;
  quality: 'full' | 'simplified';
  enableParticles: boolean;
  onNodeClick: (node: TechnologyNode) => void;
  onNodeHover: (node: TechnologyNode | null) => void;
}

function TechnologyGraph3D({
  graph,
  quality,
  enableParticles,
  onNodeClick,
  onNodeHover,
}: TechnologyGraph3DProps) {
  // Calculate node positions in 3D space using force-directed layout
  const nodePositions = React.useMemo(() => {
    const positions = new Map<string, [number, number, number]>();
    const radius = 300;

    graph.nodes.forEach((node, index) => {
      const angle = (index / graph.nodes.length) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = (Math.random() - 0.5) * 100;
      positions.set(node.id, [x, y, z]);
    });

    return positions;
  }, [graph]);

  return (
    <group>
      {/* Render edges */}
      {graph.edges.map((edge, index) => {
        const sourcePos = nodePositions.get(edge.source);
        const targetPos = nodePositions.get(edge.target);
        if (!sourcePos || !targetPos) return null;

        return (
          <ConnectionEdge3D
            key={index}
            start={sourcePos}
            end={targetPos}
            strength={edge.strength}
          />
        );
      })}

      {/* Render nodes */}
      {graph.nodes.map((node) => {
        const position = nodePositions.get(node.id) || [0, 0, 0];
        return (
          <TechnologyNode3D
            key={node.id}
            node={node}
            position={position}
            quality={quality}
            onNodeClick={onNodeClick}
            onNodeHover={onNodeHover}
          />
        );
      })}

      {/* Render particles */}
      {enableParticles && (
        <DataFlowParticles
          edges={graph.edges.map(edge => {
            const sourcePos = nodePositions.get(edge.source) || [0, 0, 0];
            const targetPos = nodePositions.get(edge.target) || [0, 0, 0];
            return {
              start: sourcePos,
              end: targetPos,
              strength: edge.strength,
            };
          })}
          particleCount={quality === 'full' ? 5 : 2}
          speed={0.01}
        />
      )}
    </group>
  );
}

/**
 * 3D Technology Node Component
 */
interface TechnologyNode3DProps {
  node: TechnologyNode;
  position: [number, number, number];
  quality: 'full' | 'simplified';
  onNodeClick: (node: TechnologyNode) => void;
  onNodeHover: (node: TechnologyNode | null) => void;
}

function TechnologyNode3D({
  node,
  position,
  quality,
  onNodeClick,
  onNodeHover,
}: TechnologyNode3DProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = React.useRef<THREE.Mesh>(null);
  const radius = 5 + (node.proficiency / 100) * 15; // 5-20 based on proficiency

  // Frustum culling is handled automatically by Three.js
  // LOD implementation for distant nodes
  React.useEffect(() => {
    if (!meshRef.current) return;

    const mesh = meshRef.current;
    const camera = mesh.parent?.parent?.parent as any; // Access camera from scene

    const updateLOD = () => {
      if (!camera?.position) return;
      
      const distance = mesh.position.distanceTo(camera.position);
      const geometry = mesh.geometry as THREE.SphereGeometry;
      
      // Adjust geometry detail based on distance
      if (distance > 800) {
        geometry.dispose();
        (mesh.geometry as any) = new THREE.SphereGeometry(radius, 8, 8);
      } else if (distance > 500) {
        geometry.dispose();
        (mesh.geometry as any) = new THREE.SphereGeometry(radius, 16, 16);
      } else {
        geometry.dispose();
        (mesh.geometry as any) = new THREE.SphereGeometry(radius, quality === 'full' ? 32 : 16, quality === 'full' ? 32 : 16);
      }
    };

    // Update LOD periodically
    const interval = setInterval(updateLOD, 1000);
    return () => clearInterval(interval);
  }, [radius, quality]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onNodeClick(node)}
      onPointerOver={() => {
        setHovered(true);
        onNodeHover(node);
      }}
      onPointerOut={() => {
        setHovered(false);
        onNodeHover(null);
      }}
      frustumCulled={true}
    >
      <sphereGeometry args={[radius, quality === 'full' ? 32 : 16, quality === 'full' ? 32 : 16]} />
      <meshStandardMaterial
        color={node.color || '#3b82f6'}
        emissive={hovered ? '#ffffff' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  );
}

/**
 * 3D Connection Edge Component
 */
interface ConnectionEdge3DProps {
  start: [number, number, number];
  end: [number, number, number];
  strength: number;
}

function ConnectionEdge3D({ start, end, strength }: ConnectionEdge3DProps) {
  const points = React.useMemo(() => {
    return [
      new THREE.Vector3(...start),
      new THREE.Vector3(...end),
    ];
  }, [start, end]);

  const geometry = React.useMemo(() => {
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    return geom;
  }, [points]);

  return (
    <primitive object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: '#666666', opacity: strength * 0.6, transparent: true }))} />
  );
}

// Import THREE for Vector3
import * as THREE from 'three';

/**
 * FPS Monitor Component
 */
function FPSMonitor({ onFPSUpdate }: { onFPSUpdate: (fps: number) => void }) {
  useFrame(() => {
    const monitor = getPerformanceMonitor();
    const fps = monitor.trackFrame();
    onFPSUpdate(fps);
  });

  return null;
}

/**
 * Keyboard-enhanced OrbitControls
 */
function KeyboardOrbitControls(props: any) {
  const controlsRef = React.useRef<any>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!controlsRef.current) return;

      const controls = controlsRef.current;
      const rotateSpeed = 0.05;
      const zoomSpeed = 10;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          controls.object.position.y += rotateSpeed * 10;
          controls.update();
          e.preventDefault();
          break;
        case 'arrowdown':
        case 's':
          controls.object.position.y -= rotateSpeed * 10;
          controls.update();
          e.preventDefault();
          break;
        case 'arrowleft':
        case 'a':
          controls.object.position.x -= rotateSpeed * 10;
          controls.update();
          e.preventDefault();
          break;
        case 'arrowright':
        case 'd':
          controls.object.position.x += rotateSpeed * 10;
          controls.update();
          e.preventDefault();
          break;
        case '+':
        case '=':
          controls.object.position.z -= zoomSpeed;
          controls.update();
          e.preventDefault();
          break;
        case '-':
          controls.object.position.z += zoomSpeed;
          controls.update();
          e.preventDefault();
          break;
        case 'r':
          controls.reset();
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <OrbitControls ref={controlsRef} {...props} />;
}
