/**
 * Technology Graph Data Models
 * 
 * Defines the data structures for representing technology nodes and their
 * relationships in the 3D visualization system.
 */

/**
 * Represents a single technology or skill in the graph
 */
export interface TechnologyNode {
  /** Unique identifier for the node */
  id: string;
  
  /** Display name of the technology */
  name: string;
  
  /** Category classification */
  category: 'language' | 'framework' | 'tool' | 'platform' | 'database' | 'cloud';
  
  /** Proficiency level (0-100) */
  proficiency: number;
  
  /** Optional detailed description */
  description?: string;
  
  /** Optional icon identifier or path */
  icon?: string;
  
  /** Optional hex color code for visualization */
  color?: string;
}

/**
 * Represents a connection between two technology nodes
 */
export interface ConnectionEdge {
  /** Source node ID */
  source: string;
  
  /** Target node ID */
  target: string;
  
  /** Connection strength (0-1) */
  strength: number;
  
  /** Optional relationship type */
  type?: 'uses' | 'related' | 'alternative';
}

/**
 * Complete technology graph structure
 */
export interface TechnologyGraph {
  /** Array of technology nodes */
  nodes: TechnologyNode[];
  
  /** Array of connection edges */
  edges: ConnectionEdge[];
  
  /** Optional metadata */
  metadata?: {
    version: string;
    lastUpdated: string;
  };
}

/**
 * Result of parsing a technology graph configuration
 */
export interface GraphParserResult {
  /** Whether parsing was successful */
  success: boolean;
  
  /** Parsed graph data (if successful) */
  data?: TechnologyGraph;
  
  /** Validation errors (if unsuccessful) */
  errors?: string[];
}
