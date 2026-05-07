# Technology Graph Parser

This module provides functions to parse and validate technology graph configurations.

## Overview

The technology graph parser ensures data integrity by validating graph configurations against a defined schema before they are used in the 3D visualization system.

## Functions

### `parseTechnologyGraph(config: unknown): GraphParserResult`

Parses a technology graph configuration from JSON string or object input.

**Parameters:**
- `config` - The configuration to parse (JSON string or object)

**Returns:**
- `GraphParserResult` object with:
  - `success: boolean` - Whether parsing was successful
  - `data?: TechnologyGraph` - Parsed graph data (if successful)
  - `errors?: string[]` - Validation errors (if unsuccessful)

**Example:**
```typescript
import { parseTechnologyGraph } from './lib/parsers/technology-graph-parser';

// Parse from JSON string
const jsonString = '{"nodes": [...], "edges": [...]}';
const result = parseTechnologyGraph(jsonString);

if (result.success) {
  console.log('Parsed graph:', result.data);
} else {
  console.error('Validation errors:', result.errors);
}

// Parse from object
const graphObject = { nodes: [...], edges: [...] };
const result2 = parseTechnologyGraph(graphObject);
```

### `validateTechnologyGraph(graph: unknown): string[]`

Validates a technology graph configuration against the schema.

**Parameters:**
- `graph` - The graph object to validate

**Returns:**
- Array of error messages (empty if valid)

**Example:**
```typescript
import { validateTechnologyGraph } from './lib/parsers/technology-graph-parser';

const graph = { nodes: [...], edges: [...] };
const errors = validateTechnologyGraph(graph);

if (errors.length === 0) {
  console.log('Graph is valid');
} else {
  console.error('Validation errors:', errors);
}
```

## Validation Rules

The validator performs comprehensive checks including:

### Node Validation
- **Required fields**: `id`, `name`, `category`, `proficiency`
- **Unique IDs**: All node IDs must be unique
- **Category**: Must be one of: `language`, `framework`, `tool`, `platform`, `database`, `cloud`
- **Proficiency**: Must be a number between 0 and 100
- **Color** (optional): Must be a valid hex color code (e.g., `#FF0000`)
- **Description** (optional): Maximum 500 characters
- **Icon** (optional): Maximum 200 characters

### Edge Validation
- **Required fields**: `source`, `target`, `strength`
- **Valid references**: `source` and `target` must reference existing node IDs
- **Strength**: Must be a number between 0 and 1
- **Type** (optional): Must be one of: `uses`, `related`, `alternative`

### Metadata Validation (optional)
- **Version**: Must follow semantic versioning (e.g., `1.0.0`)
- **Last Updated**: Must be a valid ISO 8601 date-time string

## Error Messages

The validator provides descriptive error messages that include:
- Field path (e.g., "Node at index 0")
- Error type (e.g., "missing required field")
- Expected values (e.g., "must be between 0 and 100")
- Actual values when relevant

**Example error messages:**
```
Node at index 0: missing required field "name"
Node at index 1: field "proficiency" must be between 0 and 100 (got 150)
Edge at index 0: field "source" references non-existent node ID "invalid-id"
Duplicate node ID found: "typescript"
```

## Testing

The parser includes comprehensive unit tests and integration tests:

```bash
# Run unit tests
npm run test:run lib/parsers/technology-graph-parser.test.ts

# Run integration tests with example data
npm run test:run lib/parsers/technology-graph-parser.integration.test.ts

# Run all parser tests
npm run test:run lib/parsers/
```

## Usage in Application

The parser is used when loading technology graph configurations:

```typescript
import { parseTechnologyGraph } from '@/lib/parsers/technology-graph-parser';
import graphData from '@/lib/data/technology-graph.example.json';

// Parse the graph configuration
const result = parseTechnologyGraph(graphData);

if (!result.success) {
  console.error('Failed to load technology graph:', result.errors);
  // Use fallback or empty graph
  return;
}

// Use the validated graph data
const graph = result.data;
```

## Related Files

- **Types**: `lib/types/technology-graph.ts` - TypeScript interfaces
- **Schema**: `lib/schemas/technology-graph.schema.json` - JSON schema definition
- **Example**: `lib/data/technology-graph.example.json` - Example configuration
