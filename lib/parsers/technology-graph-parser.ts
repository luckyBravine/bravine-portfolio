/**
 * Technology Graph Parser and Validator
 * 
 * Provides functions to parse and validate technology graph configurations
 * against the defined schema with comprehensive error reporting.
 */

import type {
  TechnologyGraph,
  GraphParserResult,
} from '../types/technology-graph';

/**
 * Parses a technology graph configuration from JSON string or unknown input
 * 
 * @param config - The configuration to parse (JSON string or object)
 * @returns GraphParserResult with success status, data, or errors
 * 
 * @example
 * ```typescript
 * const result = parseTechnologyGraph(jsonString);
 * if (result.success) {
 *   console.log('Parsed graph:', result.data);
 * } else {
 *   console.error('Validation errors:', result.errors);
 * }
 * ```
 */
export function parseTechnologyGraph(config: unknown): GraphParserResult {
  try {
    // Handle string input (JSON parsing)
    let parsed: unknown;
    if (typeof config === 'string') {
      try {
        parsed = JSON.parse(config);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown parsing error';
        return {
          success: false,
          errors: [`JSON parsing failed: ${message}`],
        };
      }
    } else {
      parsed = config;
    }

    // Validate the parsed data
    const errors = validateTechnologyGraph(parsed);
    
    if (errors.length > 0) {
      return {
        success: false,
        errors,
      };
    }

    // Type assertion is safe here because validation passed
    return {
      success: true,
      data: parsed as TechnologyGraph,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      success: false,
      errors: [`Unexpected error during parsing: ${message}`],
    };
  }
}

/**
 * Validates a technology graph configuration against the schema
 * 
 * Performs comprehensive validation including:
 * - Required fields presence
 * - Type checking
 * - Range validation (proficiency 0-100, strength 0-1)
 * - Unique node IDs
 * - Valid edge references
 * - Enum value validation
 * 
 * @param graph - The graph object to validate
 * @returns Array of error messages (empty if valid)
 */
export function validateTechnologyGraph(graph: unknown): string[] {
  const errors: string[] = [];

  // Check if graph is an object
  if (typeof graph !== 'object' || graph === null) {
    errors.push('Graph must be an object');
    return errors;
  }

  const g = graph as Record<string, unknown>;

  // Validate required top-level fields
  if (!('nodes' in g)) {
    errors.push('Missing required field: nodes');
  }
  if (!('edges' in g)) {
    errors.push('Missing required field: edges');
  }

  // If required fields are missing, return early
  if (errors.length > 0) {
    return errors;
  }

  // Validate nodes array
  if (!Array.isArray(g.nodes)) {
    errors.push('Field "nodes" must be an array');
    return errors;
  }

  if (g.nodes.length === 0) {
    errors.push('Field "nodes" must contain at least one node');
  }

  // Validate edges array
  if (!Array.isArray(g.edges)) {
    errors.push('Field "edges" must be an array');
    return errors;
  }

  // Track node IDs for uniqueness and reference validation
  const nodeIds = new Set<string>();
  const duplicateIds = new Set<string>();

  // Validate each node
  g.nodes.forEach((node, index) => {
    const nodeErrors = validateNode(node, index);
    errors.push(...nodeErrors);

    // Track node IDs for uniqueness check
    if (typeof node === 'object' && node !== null && 'id' in node) {
      const id = (node as Record<string, unknown>).id;
      if (typeof id === 'string') {
        if (nodeIds.has(id)) {
          duplicateIds.add(id);
        }
        nodeIds.add(id);
      }
    }
  });

  // Report duplicate IDs
  if (duplicateIds.size > 0) {
    duplicateIds.forEach(id => {
      errors.push(`Duplicate node ID found: "${id}"`);
    });
  }

  // Validate each edge
  g.edges.forEach((edge, index) => {
    const edgeErrors = validateEdge(edge, index, nodeIds);
    errors.push(...edgeErrors);
  });

  // Validate metadata if present
  if ('metadata' in g && g.metadata !== undefined) {
    const metadataErrors = validateMetadata(g.metadata);
    errors.push(...metadataErrors);
  }

  // Check for additional properties at root level
  const allowedRootProps = new Set(['nodes', 'edges', 'metadata']);
  Object.keys(g).forEach(key => {
    if (!allowedRootProps.has(key)) {
      errors.push(`Unexpected property at root level: "${key}"`);
    }
  });

  return errors;
}

/**
 * Validates a single technology node
 */
function validateNode(node: unknown, index: number): string[] {
  const errors: string[] = [];
  const prefix = `Node at index ${index}`;

  if (typeof node !== 'object' || node === null) {
    errors.push(`${prefix}: must be an object`);
    return errors;
  }

  const n = node as Record<string, unknown>;

  // Validate required fields
  const requiredFields = ['id', 'name', 'category', 'proficiency'];
  requiredFields.forEach(field => {
    if (!(field in n)) {
      errors.push(`${prefix}: missing required field "${field}"`);
    }
  });

  // Validate id
  if ('id' in n) {
    if (typeof n.id !== 'string') {
      errors.push(`${prefix}: field "id" must be a string`);
    } else if (n.id.length === 0) {
      errors.push(`${prefix}: field "id" must not be empty`);
    } else if (n.id.length > 50) {
      errors.push(`${prefix}: field "id" must not exceed 50 characters`);
    }
  }

  // Validate name
  if ('name' in n) {
    if (typeof n.name !== 'string') {
      errors.push(`${prefix}: field "name" must be a string`);
    } else if (n.name.length === 0) {
      errors.push(`${prefix}: field "name" must not be empty`);
    } else if (n.name.length > 100) {
      errors.push(`${prefix}: field "name" must not exceed 100 characters`);
    }
  }

  // Validate category
  if ('category' in n) {
    const validCategories = ['language', 'framework', 'tool', 'platform', 'database', 'cloud'];
    if (typeof n.category !== 'string') {
      errors.push(`${prefix}: field "category" must be a string`);
    } else if (!validCategories.includes(n.category)) {
      errors.push(`${prefix}: field "category" must be one of: ${validCategories.join(', ')}`);
    }
  }

  // Validate proficiency
  if ('proficiency' in n) {
    if (typeof n.proficiency !== 'number') {
      errors.push(`${prefix}: field "proficiency" must be a number`);
    } else if (n.proficiency < 0 || n.proficiency > 100) {
      errors.push(`${prefix}: field "proficiency" must be between 0 and 100 (got ${n.proficiency})`);
    }
  }

  // Validate optional description
  if ('description' in n && n.description !== undefined) {
    if (typeof n.description !== 'string') {
      errors.push(`${prefix}: field "description" must be a string`);
    } else if (n.description.length > 500) {
      errors.push(`${prefix}: field "description" must not exceed 500 characters`);
    }
  }

  // Validate optional icon
  if ('icon' in n && n.icon !== undefined) {
    if (typeof n.icon !== 'string') {
      errors.push(`${prefix}: field "icon" must be a string`);
    } else if (n.icon.length > 200) {
      errors.push(`${prefix}: field "icon" must not exceed 200 characters`);
    }
  }

  // Validate optional color
  if ('color' in n && n.color !== undefined) {
    if (typeof n.color !== 'string') {
      errors.push(`${prefix}: field "color" must be a string`);
    } else if (!/^#[0-9A-Fa-f]{6}$/.test(n.color)) {
      errors.push(`${prefix}: field "color" must be a valid hex color code (e.g., #FF0000)`);
    }
  }

  // Check for additional properties
  const allowedProps = new Set(['id', 'name', 'category', 'proficiency', 'description', 'icon', 'color']);
  Object.keys(n).forEach(key => {
    if (!allowedProps.has(key)) {
      errors.push(`${prefix}: unexpected property "${key}"`);
    }
  });

  return errors;
}

/**
 * Validates a single connection edge
 */
function validateEdge(edge: unknown, index: number, validNodeIds: Set<string>): string[] {
  const errors: string[] = [];
  const prefix = `Edge at index ${index}`;

  if (typeof edge !== 'object' || edge === null) {
    errors.push(`${prefix}: must be an object`);
    return errors;
  }

  const e = edge as Record<string, unknown>;

  // Validate required fields
  const requiredFields = ['source', 'target', 'strength'];
  requiredFields.forEach(field => {
    if (!(field in e)) {
      errors.push(`${prefix}: missing required field "${field}"`);
    }
  });

  // Validate source
  if ('source' in e) {
    if (typeof e.source !== 'string') {
      errors.push(`${prefix}: field "source" must be a string`);
    } else if (e.source.length === 0) {
      errors.push(`${prefix}: field "source" must not be empty`);
    } else if (!validNodeIds.has(e.source)) {
      errors.push(`${prefix}: field "source" references non-existent node ID "${e.source}"`);
    }
  }

  // Validate target
  if ('target' in e) {
    if (typeof e.target !== 'string') {
      errors.push(`${prefix}: field "target" must be a string`);
    } else if (e.target.length === 0) {
      errors.push(`${prefix}: field "target" must not be empty`);
    } else if (!validNodeIds.has(e.target)) {
      errors.push(`${prefix}: field "target" references non-existent node ID "${e.target}"`);
    }
  }

  // Validate strength
  if ('strength' in e) {
    if (typeof e.strength !== 'number') {
      errors.push(`${prefix}: field "strength" must be a number`);
    } else if (e.strength < 0 || e.strength > 1) {
      errors.push(`${prefix}: field "strength" must be between 0 and 1 (got ${e.strength})`);
    }
  }

  // Validate optional type
  if ('type' in e && e.type !== undefined) {
    const validTypes = ['uses', 'related', 'alternative'];
    if (typeof e.type !== 'string') {
      errors.push(`${prefix}: field "type" must be a string`);
    } else if (!validTypes.includes(e.type)) {
      errors.push(`${prefix}: field "type" must be one of: ${validTypes.join(', ')}`);
    }
  }

  // Check for additional properties
  const allowedProps = new Set(['source', 'target', 'strength', 'type']);
  Object.keys(e).forEach(key => {
    if (!allowedProps.has(key)) {
      errors.push(`${prefix}: unexpected property "${key}"`);
    }
  });

  return errors;
}

/**
 * Validates metadata object
 */
function validateMetadata(metadata: unknown): string[] {
  const errors: string[] = [];
  const prefix = 'Metadata';

  if (typeof metadata !== 'object' || metadata === null) {
    errors.push(`${prefix}: must be an object`);
    return errors;
  }

  const m = metadata as Record<string, unknown>;

  // Validate optional version
  if ('version' in m && m.version !== undefined) {
    if (typeof m.version !== 'string') {
      errors.push(`${prefix}: field "version" must be a string`);
    } else if (!/^\d+\.\d+\.\d+$/.test(m.version)) {
      errors.push(`${prefix}: field "version" must follow semantic versioning (e.g., 1.0.0)`);
    }
  }

  // Validate optional lastUpdated
  if ('lastUpdated' in m && m.lastUpdated !== undefined) {
    if (typeof m.lastUpdated !== 'string') {
      errors.push(`${prefix}: field "lastUpdated" must be a string`);
    } else {
      // Validate ISO 8601 date-time format
      const date = new Date(m.lastUpdated);
      if (isNaN(date.getTime())) {
        errors.push(`${prefix}: field "lastUpdated" must be a valid ISO 8601 date-time string`);
      }
    }
  }

  // Check for additional properties
  const allowedProps = new Set(['version', 'lastUpdated']);
  Object.keys(m).forEach(key => {
    if (!allowedProps.has(key)) {
      errors.push(`${prefix}: unexpected property "${key}"`);
    }
  });

  return errors;
}
