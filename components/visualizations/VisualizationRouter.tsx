'use client';

/**
 * Visualization Router Component
 * 
 * Routes to the appropriate visualization based on capability classification:
 * - Fast: Full 3D with all effects
 * - Medium: Simplified 3D with reduced particles
 * - Slow: 2D SVG fallback
 */

import React, { lazy, Suspense } from 'react';
import { useCapabilityLevel } from '@/lib/contexts/capability-context';
import type { TechnologyGraph, TechnologyNode } from '@/lib/types/technology-graph';

// Lazy load visualization components for code splitting
const Visualization3D = lazy(() => import('./Visualization3D').then(m => ({ default: m.Visualization3D })));
const Visualization2D = lazy(() => import('./Visualization2D').then(m => ({ default: m.Visualization2D })));

export interface VisualizationRouterProps {
  graph: TechnologyGraph;
  onNodeHover?: (node: TechnologyNode | null) => void;
  onNodeClick?: (node: TechnologyNode) => void;
  width?: number;
  height?: number;
}

/**
 * Loading fallback component
 */
function VisualizationLoading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4" />
        <p className="text-gray-400">Loading visualization...</p>
      </div>
    </div>
  );
}

/**
 * Visualization Router
 * 
 * Selects and renders the appropriate visualization based on device capabilities.
 */
export function VisualizationRouter({
  graph,
  onNodeHover,
  onNodeClick,
  width = 800,
  height = 600,
}: VisualizationRouterProps) {
  const level = useCapabilityLevel();

  // Temporarily force 2D visualization to debug
  // TODO: Re-enable 3D after fixing the issue
  return (
    <Suspense fallback={<VisualizationLoading />}>
      <Visualization2D
        graph={graph}
        onNodeHover={onNodeHover}
        onNodeClick={onNodeClick}
        width={width}
        height={height}
      />
    </Suspense>
  );

  // Original code (commented out for debugging)
  /*
  // Show loading state while detecting capabilities
  if (!level) {
    return <VisualizationLoading />;
  }

  return (
    <Suspense fallback={<VisualizationLoading />}>
      {level === 'fast' && (
        <Visualization3D
          graph={graph}
          quality="full"
          enableParticles={true}
          onNodeHover={onNodeHover}
          onNodeClick={onNodeClick}
        />
      )}

      {level === 'medium' && (
        <Visualization3D
          graph={graph}
          quality="simplified"
          enableParticles={true}
          onNodeHover={onNodeHover}
          onNodeClick={onNodeClick}
        />
      )}

      {level === 'slow' && (
        <Visualization2D
          graph={graph}
          onNodeHover={onNodeHover}
          onNodeClick={onNodeClick}
          width={width}
          height={height}
        />
      )}
    </Suspense>
  );
  */
}
