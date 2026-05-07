# Technology Graph Type Definitions

This directory contains TypeScript type definitions for the technology graph data models.

## Files

- **technology-graph.ts**: Core type definitions for nodes, edges, and graphs

## Type Definitions

### TechnologyNode

Represents a single technology or skill in the graph.

```typescript
interface TechnologyNode {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  category: 'language' | 'framework' | 'tool' | 'platform' | 'database' | 'cloud';
  proficiency: number;           // 0-100
  description?: string;          // Optional description
  icon?: string;                 // Optional icon identifier
  color?: string;                // Optional hex color (#RRGGBB)
}
```

### ConnectionEdge

Represents a connection between two technology nodes.

```typescript
interface ConnectionEdge {
  source: string;                // Source node ID
  target: string;                // Target node ID
  strength: number;              // 0-1 (connection strength)
  type?: 'uses' | 'related' | 'alternative';  // Optional relationship type
}
```

### TechnologyGraph

Complete technology graph structure.

```typescript
interface TechnologyGraph {
  nodes: TechnologyNode[];       // Array of nodes
  edges: ConnectionEdge[];       // Array of edges
  metadata?: {                   // Optional metadata
    version: string;
    lastUpdated: string;
  };
}
```

### GraphParserResult

Result of parsing a technology graph configuration.

```typescript
interface GraphParserResult {
  success: boolean;              // Whether parsing succeeded
  data?: TechnologyGraph;        // Parsed graph (if successful)
  errors?: string[];             // Validation errors (if failed)
}
```

## Usage Examples

### Importing Types

```typescript
import {
  TechnologyNode,
  ConnectionEdge,
  TechnologyGraph,
  GraphParserResult
} from '@/lib/types/technology-graph';
```

### Creating a Node

```typescript
const node: TechnologyNode = {
  id: 'typescript',
  name: 'TypeScript',
  category: 'language',
  proficiency: 95,
  description: 'Primary development language',
  color: '#3178C6'
};
```

### Creating an Edge

```typescript
const edge: ConnectionEdge = {
  source: 'nextjs',
  target: 'react',
  strength: 1.0,
  type: 'uses'
};
```

### Creating a Graph

```typescript
const graph: TechnologyGraph = {
  nodes: [
    { id: 'react', name: 'React', category: 'framework', proficiency: 90 },
    { id: 'nextjs', name: 'Next.js', category: 'framework', proficiency: 88 }
  ],
  edges: [
    { source: 'nextjs', target: 'react', strength: 1.0, type: 'uses' }
  ],
  metadata: {
    version: '1.0.0',
    lastUpdated: new Date().toISOString()
  }
};
```

### Type Guards

```typescript
function isValidNode(node: any): node is TechnologyNode {
  return (
    typeof node.id === 'string' &&
    typeof node.name === 'string' &&
    ['language', 'framework', 'tool', 'platform', 'database', 'cloud'].includes(node.category) &&
    typeof node.proficiency === 'number' &&
    node.proficiency >= 0 &&
    node.proficiency <= 100
  );
}

function isValidEdge(edge: any): edge is ConnectionEdge {
  return (
    typeof edge.source === 'string' &&
    typeof edge.target === 'string' &&
    typeof edge.strength === 'number' &&
    edge.strength >= 0 &&
    edge.strength <= 1
  );
}
```

## Validation Rules

### Node Validation

- `id`: Must be a non-empty string (max 50 characters)
- `name`: Must be a non-empty string (max 100 characters)
- `category`: Must be one of the allowed categories
- `proficiency`: Must be a number between 0 and 100 (inclusive)
- `color`: If provided, must match pattern `^#[0-9A-Fa-f]{6}$`

### Edge Validation

- `source`: Must reference an existing node ID
- `target`: Must reference an existing node ID
- `strength`: Must be a number between 0 and 1 (inclusive)
- `type`: If provided, must be 'uses', 'related', or 'alternative'

### Graph Validation

- All node IDs must be unique
- All edge source/target IDs must reference existing nodes
- Must have at least one node
- Edges array can be empty (disconnected nodes)

## Related Files

- Schema: `lib/schemas/technology-graph.schema.json`
- Example Data: `lib/data/technology-graph.example.json`
- Parser Implementation: `lib/parsers/technology-graph-parser.ts` (to be implemented)
