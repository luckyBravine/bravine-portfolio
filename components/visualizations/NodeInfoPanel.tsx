'use client';

/**
 * Node Information Panel
 * 
 * Displays detailed information about a technology node when hovered or clicked.
 */

import React from 'react';
import type { TechnologyNode } from '@/lib/types/technology-graph';

export interface NodeInfoPanelProps {
  node: TechnologyNode | null;
  position?: { x: number; y: number };
}

export function NodeInfoPanel({ node, position }: NodeInfoPanelProps) {
  if (!node) return null;

  return (
    <div
      className="absolute z-50 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl max-w-xs"
      style={{
        left: position?.x ? `${position.x + 20}px` : '50%',
        top: position?.y ? `${position.y}px` : '50%',
        transform: position ? 'none' : 'translate(-50%, -50%)',
      }}
      role="tooltip"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {node.color && (
          <div
            className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: node.color }}
            aria-hidden="true"
          />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{node.name}</h3>
          <p className="text-sm text-gray-400 capitalize mb-2">{node.category}</p>
          {node.description && (
            <p className="text-sm text-gray-300 mb-3">{node.description}</p>
          )}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Proficiency:</span>
            <div className="flex-1 bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${node.proficiency}%` }}
                role="progressbar"
                aria-valuenow={node.proficiency}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${node.proficiency}% proficiency`}
              />
            </div>
            <span className="text-xs text-white font-medium">{node.proficiency}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
