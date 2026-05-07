'use client';

/**
 * 2D SVG Visualization Component
 * 
 * Fallback visualization for low-capability devices using SVG and d3-force layout.
 */

import React, { useEffect, useRef, useState } from 'react';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';
import type { TechnologyGraph, TechnologyNode } from '@/lib/types/technology-graph';
import { NodeInfoPanel } from './NodeInfoPanel';

export interface Visualization2DProps {
  graph: TechnologyGraph;
  onNodeHover?: (node: TechnologyNode | null) => void;
  onNodeClick?: (node: TechnologyNode) => void;
  width?: number;
  height?: number;
}

interface NodePosition extends TechnologyNode {
  x: number;
  y: number;
}

interface EdgePosition {
  source: NodePosition;
  target: NodePosition;
  strength: number;
  type?: string;
}

export function Visualization2D({
  graph,
  onNodeHover,
  onNodeClick,
  width = 800,
  height = 600,
}: Visualization2DProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<NodePosition[]>([]);
  const [edges, setEdges] = useState<EdgePosition[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<TechnologyNode | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | undefined>();

  useEffect(() => {
    // Initialize node positions
    const nodePositions: NodePosition[] = graph.nodes.map(node => ({
      ...node,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
    }));

    // Create edge data with node references
    const edgeData = graph.edges.map(edge => ({
      source: nodePositions.find(n => n.id === edge.source)!,
      target: nodePositions.find(n => n.id === edge.target)!,
      strength: edge.strength,
      type: edge.type,
    }));

    // Set up force simulation
    const simulation = forceSimulation(nodePositions as any)
      .force('link', forceLink(edgeData as any)
        .id((d: any) => d.id)
        .distance(100)
        .strength((d: any) => d.strength))
      .force('charge', forceManyBody().strength(-300))
      .force('center', forceCenter(width / 2, height / 2))
      .force('collide', forceCollide().radius(30));

    // Update positions on each tick
    simulation.on('tick', () => {
      setNodes([...nodePositions]);
      setEdges([...edgeData]);
    });

    // Run simulation for a fixed number of iterations
    simulation.tick(300);
    simulation.stop();

    return () => {
      simulation.stop();
    };
  }, [graph, width, height]);

  const handleNodeMouseEnter = (node: TechnologyNode, event: React.MouseEvent) => {
    setHoveredNode(node.id);
    setSelectedNode(node);
    setMousePosition({ x: event.clientX, y: event.clientY });
    onNodeHover?.(node);
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
    setSelectedNode(null);
    setMousePosition(undefined);
    onNodeHover?.(null);
  };

  const handleNodeClick = (node: TechnologyNode) => {
    setSelectedNode(node);
    onNodeClick?.(node);
  };

  const handleNodeKeyDown = (node: TechnologyNode, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNodeClick(node);
    }
  };

  const getNodeRadius = (proficiency: number) => {
    return 10 + (proficiency / 100) * 20; // 10-30px based on proficiency
  };

  return (
    <div className="relative w-full h-full">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="w-full h-full"
        role="img"
        aria-label="Technology skills network graph"
      >
        {/* Render edges */}
        <g className="edges">
          {edges.map((edge, index) => (
            <line
              key={index}
              x1={edge.source.x}
              y1={edge.source.y}
              x2={edge.target.x}
              y2={edge.target.y}
              stroke="#666"
              strokeWidth={2}
              strokeOpacity={edge.strength * 0.6}
              className="transition-all duration-300"
            />
          ))}
        </g>

        {/* Render nodes */}
        <g className="nodes">
          {nodes.map((node) => {
            const radius = getNodeRadius(node.proficiency);
            const isHovered = hoveredNode === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={(e) => handleNodeMouseEnter(node, e)}
                onMouseLeave={handleNodeMouseLeave}
                onClick={() => handleNodeClick(node)}
                onKeyDown={(e) => handleNodeKeyDown(node, e)}
                className="cursor-pointer focus:outline-none"
                role="button"
                tabIndex={0}
                aria-label={`${node.name} - ${node.category}`}
              >
                <circle
                  r={radius}
                  fill={node.color || '#3b82f6'}
                  stroke={isHovered ? '#fff' : '#333'}
                  strokeWidth={isHovered ? 3 : 1}
                  className="transition-all duration-200"
                  opacity={isHovered ? 1 : 0.9}
                />
                <text
                  y={radius + 15}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#fff"
                  className="pointer-events-none select-none"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Node info panel */}
      {selectedNode && (
        <NodeInfoPanel node={selectedNode} position={mousePosition} />
      )}
    </div>
  );
}
