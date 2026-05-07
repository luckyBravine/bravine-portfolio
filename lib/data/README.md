# Technology Graph Data

This directory contains technology graph configuration files for the 3D visualization system.

## Files

- **technology-graph.example.json**: Example configuration with realistic technology data
- This file demonstrates the structure and relationships between various technologies used in the portfolio

## Schema

The technology graph configuration must conform to the JSON schema defined in `lib/schemas/technology-graph.schema.json`.

## Structure

### Nodes

Each node represents a technology or skill with the following properties:

- `id` (required): Unique identifier (1-50 characters)
- `name` (required): Display name (1-100 characters)
- `category` (required): One of: `language`, `framework`, `tool`, `platform`, `database`, `cloud`
- `proficiency` (required): Skill level from 0 to 100
- `description` (optional): Detailed description (max 500 characters)
- `icon` (optional): Icon identifier or path (max 200 characters)
- `color` (optional): Hex color code (e.g., `#3178C6`)

### Edges

Each edge represents a connection between two nodes with the following properties:

- `source` (required): Source node ID
- `target` (required): Target node ID
- `strength` (required): Connection strength from 0 to 1
- `type` (optional): Relationship type - `uses`, `related`, or `alternative`

### Metadata

Optional metadata about the graph:

- `version`: Semantic version (e.g., `1.0.0`)
- `lastUpdated`: ISO 8601 timestamp

## Example Usage

```typescript
import technologyGraph from './technology-graph.example.json';
import { TechnologyGraph } from '../types/technology-graph';

const graph: TechnologyGraph = technologyGraph;

// Access nodes
console.log(graph.nodes.length); // 25 nodes

// Access edges
console.log(graph.edges.length); // 37 edges

// Find a specific node
const typescript = graph.nodes.find(n => n.id === 'typescript');
console.log(typescript?.proficiency); // 95
```

## Validation

To validate a technology graph configuration:

1. Ensure all node IDs are unique
2. Ensure all edge source/target IDs reference existing nodes
3. Ensure proficiency values are between 0-100
4. Ensure strength values are between 0-1
5. Ensure color codes match the hex pattern `^#[0-9A-Fa-f]{6}$`

## Creating Your Own Graph

To create a custom technology graph:

1. Copy `technology-graph.example.json` to a new file
2. Modify the nodes array with your technologies
3. Update the edges array to reflect relationships
4. Update the metadata with current version and timestamp
5. Validate against the schema before deployment


---

# Portfolio Content Data

This directory also contains portfolio content data for all application sections.

## Files

- **portfolio-content.ts**: Complete portfolio content data for all sections (Hero, About, Experience, Projects, Skills, Education, Contact)
- **index.ts**: Central export point for all data files

## Content Structure

The `portfolio-content.ts` file contains all the content displayed in the portfolio application. It follows the `PortfolioContent` interface defined in `lib/types/content.ts`.

### Content Sections

1. **Hero**: Name, title, tagline, and call-to-action buttons
2. **About**: Professional summary and highlights
3. **Experience**: Work experience entries with achievements and technologies
4. **Projects**: Project entries with descriptions, technologies, and links
5. **Skills**: Categorized skill lists
6. **Education**: Educational background with achievements
7. **Contact**: Contact information and social media links

### Updating Content

To update the portfolio content:

1. Open `lib/data/portfolio-content.ts`
2. Modify the `portfolioContent` object with your information
3. Ensure all required fields are provided according to the TypeScript interfaces
4. The changes will be reflected in the application automatically

### Example Usage

```typescript
import { portfolioContent } from './portfolio-content';

// Access hero content
console.log(portfolioContent.hero.name);
console.log(portfolioContent.hero.title);

// Access experience entries
const experiences = portfolioContent.experience.entries;
console.log(experiences[0].company); // "Digital Qatalyst"

// Access projects
const projects = portfolioContent.projects.entries;
console.log(projects[0].name); // "Vendure.js E-commerce Platform"
```

### Digital Qatalyst Experience

The Experience section includes specific Power Automate and Dynamics 365 integration achievements as required:

- **Real-time synchronization**: Developed custom Power Automate cloud flows to automate newsletter subscriber synchronization from Dynamics 365/Dataverse to external production endpoints
- **Efficient processing**: Implemented pagination ($top/$skip), batch processing (500 records per iteration), 60-second throttling, and dynamic token refresh (Bearer authentication with expiration handling)
- **Secure integration**: Integrated secure token acquisition (OAuth password grant), JSON payload transformation, and HTTP POST actions with error handling and retry logic
- **Optimization**: Debugged and optimized complex expressions, variable persistence, and conditional branching to achieve fully automated, single-run execution

These achievements demonstrate expertise in enterprise CRM integrations and automation workflows.

## Type Safety

All content data is fully typed using TypeScript interfaces from `lib/types/content.ts`. This ensures:

- Type checking at compile time
- IntelliSense support in editors
- Validation of required fields
- Prevention of runtime errors due to missing or incorrect data
