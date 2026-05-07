# Technology Graph JSON Schema

This directory contains JSON Schema definitions for validating technology graph configurations.

## Files

- **technology-graph.schema.json**: JSON Schema (Draft 7) for technology graph validation

## Schema Overview

The schema validates technology graph configuration files to ensure they meet all structural and data requirements before being used in the 3D visualization system.

## Validation Rules

### Root Object

- Must be an object
- Required properties: `nodes`, `edges`
- Optional properties: `metadata`
- No additional properties allowed

### Nodes Array

- Must be an array with at least 1 item
- Each item must be a valid TechnologyNode object

#### TechnologyNode Object

Required properties:
- `id`: string (1-50 characters)
- `name`: string (1-100 characters)
- `category`: enum ['language', 'framework', 'tool', 'platform', 'database', 'cloud']
- `proficiency`: number (0-100)

Optional properties:
- `description`: string (max 500 characters)
- `icon`: string (max 200 characters)
- `color`: string (hex pattern: `^#[0-9A-Fa-f]{6}$`)

### Edges Array

- Must be an array (can be empty)
- Each item must be a valid ConnectionEdge object

#### ConnectionEdge Object

Required properties:
- `source`: string (min 1 character)
- `target`: string (min 1 character)
- `strength`: number (0-1)

Optional properties:
- `type`: enum ['uses', 'related', 'alternative']

### Metadata Object

Optional properties:
- `version`: string (semantic version pattern: `^\d+\.\d+\.\d+$`)
- `lastUpdated`: string (ISO 8601 date-time format)

## Usage

### With Ajv (Node.js)

```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from './technology-graph.schema.json';

const ajv = new Ajv();
addFormats(ajv);

const validate = ajv.compile(schema);

const data = {
  nodes: [
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'language',
      proficiency: 95
    }
  ],
  edges: []
};

const valid = validate(data);

if (!valid) {
  console.error('Validation errors:', validate.errors);
} else {
  console.log('Valid technology graph!');
}
```

### With JSON Schema Validator (Online)

1. Copy the schema from `technology-graph.schema.json`
2. Visit https://www.jsonschemavalidator.net/
3. Paste the schema in the left panel
4. Paste your data in the right panel
5. Check for validation errors

### In CI/CD Pipeline

```bash
# Install ajv-cli
npm install -g ajv-cli

# Validate a configuration file
ajv validate -s lib/schemas/technology-graph.schema.json -d lib/data/technology-graph.json
```

## Common Validation Errors

### Invalid Proficiency Value

```json
{
  "instancePath": "/nodes/0/proficiency",
  "message": "must be <= 100"
}
```

**Fix**: Ensure proficiency is between 0 and 100.

### Invalid Color Format

```json
{
  "instancePath": "/nodes/0/color",
  "message": "must match pattern \"^#[0-9A-Fa-f]{6}$\""
}
```

**Fix**: Use 6-digit hex color codes (e.g., `#3178C6`).

### Missing Required Field

```json
{
  "instancePath": "/nodes/0",
  "message": "must have required property 'category'"
}
```

**Fix**: Add the missing required property.

### Invalid Category

```json
{
  "instancePath": "/nodes/0/category",
  "message": "must be equal to one of the allowed values"
}
```

**Fix**: Use one of: language, framework, tool, platform, database, cloud.

### Invalid Edge Strength

```json
{
  "instancePath": "/edges/0/strength",
  "message": "must be <= 1"
}
```

**Fix**: Ensure strength is between 0 and 1.

## Schema Versioning

The schema follows JSON Schema Draft 7 specification. The `$id` field provides a unique identifier for the schema:

```
https://portfolio.example.com/schemas/technology-graph.schema.json
```

Update this URL to match your deployment domain.

## Related Files

- Type Definitions: `lib/types/technology-graph.ts`
- Example Data: `lib/data/technology-graph.example.json`
- Validation Implementation: `lib/parsers/technology-graph-parser.ts` (to be implemented)
