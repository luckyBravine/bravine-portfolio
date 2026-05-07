/**
 * Integration tests for Technology Graph Parser with example data
 */

import { describe, it, expect } from 'vitest';
import { parseTechnologyGraph } from './technology-graph-parser';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('parseTechnologyGraph - Integration with example data', () => {
  it('should successfully parse the example technology graph file', () => {
    // Read the example file
    const examplePath = join(__dirname, '../data/technology-graph.example.json');
    const exampleData = readFileSync(examplePath, 'utf-8');
    
    // Parse the example data
    const result = parseTechnologyGraph(exampleData);
    
    // Verify parsing succeeded
    expect(result.success).toBe(true);
    expect(result.errors).toBeUndefined();
    expect(result.data).toBeDefined();
    
    // Verify structure
    expect(result.data!.nodes).toBeDefined();
    expect(result.data!.edges).toBeDefined();
    expect(result.data!.metadata).toBeDefined();
    
    // Verify we have nodes and edges
    expect(result.data!.nodes.length).toBeGreaterThan(0);
    expect(result.data!.edges.length).toBeGreaterThan(0);
    
    // Verify metadata
    expect(result.data!.metadata?.version).toBe('1.0.0');
    expect(result.data!.metadata?.lastUpdated).toBe('2024-01-15T00:00:00Z');
  });

  it('should validate all nodes in the example file', () => {
    const examplePath = join(__dirname, '../data/technology-graph.example.json');
    const exampleData = readFileSync(examplePath, 'utf-8');
    const result = parseTechnologyGraph(exampleData);
    
    expect(result.success).toBe(true);
    
    // Verify each node has required fields
    result.data!.nodes.forEach(node => {
      expect(node.id).toBeDefined();
      expect(node.name).toBeDefined();
      expect(node.category).toBeDefined();
      expect(node.proficiency).toBeDefined();
      expect(node.proficiency).toBeGreaterThanOrEqual(0);
      expect(node.proficiency).toBeLessThanOrEqual(100);
    });
  });

  it('should validate all edges in the example file', () => {
    const examplePath = join(__dirname, '../data/technology-graph.example.json');
    const exampleData = readFileSync(examplePath, 'utf-8');
    const result = parseTechnologyGraph(exampleData);
    
    expect(result.success).toBe(true);
    
    // Get all node IDs
    const nodeIds = new Set(result.data!.nodes.map(n => n.id));
    
    // Verify each edge references valid nodes
    result.data!.edges.forEach(edge => {
      expect(edge.source).toBeDefined();
      expect(edge.target).toBeDefined();
      expect(edge.strength).toBeDefined();
      expect(edge.strength).toBeGreaterThanOrEqual(0);
      expect(edge.strength).toBeLessThanOrEqual(1);
      
      // Verify references are valid
      expect(nodeIds.has(edge.source)).toBe(true);
      expect(nodeIds.has(edge.target)).toBe(true);
    });
  });

  it('should handle round-trip serialization', () => {
    const examplePath = join(__dirname, '../data/technology-graph.example.json');
    const exampleData = readFileSync(examplePath, 'utf-8');
    
    // Parse the example data
    const result1 = parseTechnologyGraph(exampleData);
    expect(result1.success).toBe(true);
    
    // Serialize and parse again
    const serialized = JSON.stringify(result1.data);
    const result2 = parseTechnologyGraph(serialized);
    
    // Verify second parse succeeded
    expect(result2.success).toBe(true);
    
    // Verify data is equivalent
    expect(result2.data).toEqual(result1.data);
  });
});
