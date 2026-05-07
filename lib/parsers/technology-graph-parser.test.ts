/**
 * Unit tests for Technology Graph Parser and Validator
 */

import { describe, it, expect } from 'vitest';
import { parseTechnologyGraph, validateTechnologyGraph } from './technology-graph-parser';
import type { TechnologyGraph } from '../types/technology-graph';

describe('parseTechnologyGraph', () => {
  it('should parse valid JSON string', () => {
    const validGraph = {
      nodes: [
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'language',
          proficiency: 95,
        },
      ],
      edges: [],
    };

    const result = parseTechnologyGraph(JSON.stringify(validGraph));
    
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validGraph);
    expect(result.errors).toBeUndefined();
  });

  it('should parse valid object', () => {
    const validGraph = {
      nodes: [
        {
          id: 'react',
          name: 'React',
          category: 'framework',
          proficiency: 90,
        },
      ],
      edges: [],
    };

    const result = parseTechnologyGraph(validGraph);
    
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validGraph);
  });

  it('should handle invalid JSON string', () => {
    const result = parseTechnologyGraph('{ invalid json }');
    
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors![0]).toContain('JSON parsing failed');
  });

  it('should validate and reject invalid graph structure', () => {
    const invalidGraph = {
      nodes: [],
      edges: [],
    };

    const result = parseTechnologyGraph(invalidGraph);
    
    expect(result.success).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.errors!.length).toBeGreaterThan(0);
  });

  it('should handle graph with valid edges', () => {
    const validGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80 },
        { id: 'node2', name: 'Node 2', category: 'framework', proficiency: 75 },
      ],
      edges: [
        { source: 'node1', target: 'node2', strength: 0.8 },
      ],
    };

    const result = parseTechnologyGraph(validGraph);
    
    expect(result.success).toBe(true);
    expect(result.data).toEqual(validGraph);
  });
});

describe('validateTechnologyGraph', () => {
  it('should return empty array for valid graph', () => {
    const validGraph = {
      nodes: [
        {
          id: 'typescript',
          name: 'TypeScript',
          category: 'language',
          proficiency: 95,
        },
      ],
      edges: [],
    };

    const errors = validateTechnologyGraph(validGraph);
    expect(errors).toEqual([]);
  });

  it('should detect missing required fields', () => {
    const invalidGraph = {
      nodes: [{ id: 'test' }],
      edges: [],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.includes('missing required field'))).toBe(true);
  });

  it('should detect duplicate node IDs', () => {
    const invalidGraph = {
      nodes: [
        { id: 'duplicate', name: 'Node 1', category: 'language', proficiency: 80 },
        { id: 'duplicate', name: 'Node 2', category: 'framework', proficiency: 75 },
      ],
      edges: [],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('Duplicate node ID'))).toBe(true);
  });

  it('should detect invalid edge references', () => {
    const invalidGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80 },
      ],
      edges: [
        { source: 'node1', target: 'nonexistent', strength: 0.5 },
      ],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('references non-existent node ID'))).toBe(true);
  });

  it('should detect proficiency out of range', () => {
    const invalidGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 150 },
      ],
      edges: [],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('proficiency') && e.includes('between 0 and 100'))).toBe(true);
  });

  it('should detect strength out of range', () => {
    const invalidGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80 },
        { id: 'node2', name: 'Node 2', category: 'framework', proficiency: 75 },
      ],
      edges: [
        { source: 'node1', target: 'node2', strength: 1.5 },
      ],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('strength') && e.includes('between 0 and 1'))).toBe(true);
  });

  it('should detect invalid category', () => {
    const invalidGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'invalid', proficiency: 80 },
      ],
      edges: [],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('category'))).toBe(true);
  });

  it('should detect invalid color format', () => {
    const invalidGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80, color: 'red' },
      ],
      edges: [],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('color') && e.includes('hex'))).toBe(true);
  });

  it('should accept valid color format', () => {
    const validGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80, color: '#FF0000' },
      ],
      edges: [],
    };

    const errors = validateTechnologyGraph(validGraph);
    expect(errors).toEqual([]);
  });

  it('should validate metadata version format', () => {
    const invalidGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80 },
      ],
      edges: [],
      metadata: {
        version: 'invalid',
      },
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('version') && e.includes('semantic versioning'))).toBe(true);
  });

  it('should accept valid metadata', () => {
    const validGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80 },
      ],
      edges: [],
      metadata: {
        version: '1.0.0',
        lastUpdated: '2024-01-15T00:00:00Z',
      },
    };

    const errors = validateTechnologyGraph(validGraph);
    expect(errors).toEqual([]);
  });

  it('should detect empty nodes array', () => {
    const invalidGraph = {
      nodes: [],
      edges: [],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('must contain at least one node'))).toBe(true);
  });

  it('should detect missing nodes field', () => {
    const invalidGraph = {
      edges: [],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('Missing required field: nodes'))).toBe(true);
  });

  it('should detect missing edges field', () => {
    const invalidGraph = {
      nodes: [
        { id: 'node1', name: 'Node 1', category: 'language', proficiency: 80 },
      ],
    };

    const errors = validateTechnologyGraph(invalidGraph);
    expect(errors.some(e => e.includes('Missing required field: edges'))).toBe(true);
  });

  it('should handle null input', () => {
    const errors = validateTechnologyGraph(null);
    expect(errors).toEqual(['Graph must be an object']);
  });

  it('should handle non-object input', () => {
    const errors = validateTechnologyGraph('not an object');
    expect(errors).toEqual(['Graph must be an object']);
  });
});
