# Capability Classifier

The Capability Classifier is responsible for analyzing device and network capabilities and classifying them into performance tiers (fast, medium, slow) to enable progressive enhancement.

## Overview

The classifier takes measurements from the Network Detector and applies a scoring algorithm to determine the optimal rendering strategy for the user's environment.

## Classification Levels

### Fast (score >= 70)
- **Requirements:**
  - Overall score >= 70
  - WebGL2 support
  - 4G+ network or downlink >= 5 Mbps
  - 4GB+ device memory

- **Rendering Strategy:**
  - Full 3D visualization with all effects
  - All particle animations
  - Post-processing effects
  - High-quality textures

### Medium (score >= 40)
- **Requirements:**
  - Overall score >= 40
  - WebGL support (WebGL1 or WebGL2)
  - 3G+ network or downlink >= 1 Mbps
  - 2GB+ device memory

- **Rendering Strategy:**
  - Simplified 3D visualization
  - Reduced particle count
  - No post-processing effects
  - Standard quality textures

### Slow (score < 40)
- **Fallback Conditions:**
  - Overall score < 40
  - No WebGL support
  - Slow network (2G or slower)
  - Limited memory (< 2GB)

- **Rendering Strategy:**
  - 2D SVG fallback visualization
  - No 3D rendering
  - Static or minimal animations
  - Optimized for low bandwidth

## Scoring Algorithm

The overall score is calculated as a weighted average of three components:

```
Overall Score = (Network Score × 0.3) + (Device Score × 0.4) + (Browser Score × 0.3)
```

### Network Score (0-100)

| Factor | Points | Criteria |
|--------|--------|----------|
| Effective Type | 0-40 | 4G: 40, 3G: 25, 2G: 10, slow-2G: 5, unknown: 20 |
| Downlink Speed | 0-30 | >=10 Mbps: 30, >=5 Mbps: 20, >=1 Mbps: 10 |
| RTT (Latency) | 0-20 | <=50ms: 20, <=100ms: 15, <=200ms: 10, <=500ms: 5 |
| Save Data | 0-10 | Off: 10, On: 0 |

### Device Score (0-100)

| Factor | Points | Criteria |
|--------|--------|----------|
| GPU | 0-40 | High: 40, Medium: 25, Low: 10, Unknown: 15 |
| Memory | 0-30 | >=8GB: 30, >=4GB: 20, >=2GB: 10, <2GB: 5 |
| CPU Cores | 0-20 | >=8: 20, >=4: 15, >=2: 10, <2: 5 |
| Device Pixel Ratio | 0-10 | <=1.5: 10, <=2: 7, <=3: 4, >3: 0 |

### Browser Score (0-100)

| Feature | Points | Criteria |
|---------|--------|----------|
| WebGL2 | 40 | Supported: 40, Not supported: 0 |
| WebGL | 20 | Supported (if no WebGL2): 20 |
| Service Worker | 30 | Supported: 30, Not supported: 0 |
| Intersection Observer | 30 | Supported: 30, Not supported: 0 |

## Usage

### Basic Classification

```typescript
import { classifyCapabilities } from '@/lib/classifiers/capability-classifier';
import { detectCapabilities } from '@/lib/detectors/network-detector';

// Detect capabilities
const measurements = await detectCapabilities(500);

// Classify
const classification = classifyCapabilities(measurements);

console.log(classification.level); // 'fast', 'medium', or 'slow'
console.log(classification.reason); // Human-readable explanation
console.log(classification.score); // Detailed score breakdown
```

### With React Context

```typescript
import { useCapability, useCapabilityLevel } from '@/lib/contexts/capability-context';

function MyComponent() {
  const { classification, isDetecting } = useCapability();
  const level = useCapabilityLevel();

  if (isDetecting) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <p>Capability Level: {level}</p>
      <p>Reason: {classification?.reason}</p>
    </div>
  );
}
```

### Conditional Rendering

```typescript
import { useCapabilityLevel } from '@/lib/contexts/capability-context';

function VisualizationRouter() {
  const level = useCapabilityLevel();

  switch (level) {
    case 'fast':
      return <Visualization3DFull />;
    case 'medium':
      return <Visualization3DSimplified />;
    case 'slow':
      return <Visualization2D />;
    default:
      return <LoadingSpinner />;
  }
}
```

## API Reference

### `calculateCapabilityScore(measurements: CapabilityMeasurements): CapabilityScore`

Calculates individual and overall scores from capability measurements.

**Parameters:**
- `measurements`: Complete capability measurements from the detector

**Returns:**
- `CapabilityScore` object with network, device, browser, and overall scores

### `classifyCapabilities(measurements: CapabilityMeasurements): DetailedCapabilityClassification`

Classifies capabilities into fast/medium/slow tiers based on scoring algorithm.

**Parameters:**
- `measurements`: Complete capability measurements from the detector

**Returns:**
- `DetailedCapabilityClassification` object with:
  - `level`: 'fast' | 'medium' | 'slow'
  - `reason`: Human-readable explanation
  - `timestamp`: Classification timestamp
  - `score`: Detailed score breakdown
  - `measurements`: Original measurements

## Testing

The classifier includes comprehensive unit tests covering:

- Score calculation for high/medium/low-end devices
- Classification logic for all three tiers
- Edge cases (missing WebGL, low memory, slow network)
- Classification rule enforcement (score thresholds)

Run tests:
```bash
npm test -- lib/classifiers/capability-classifier.test.ts
```

## Design Rationale

### Why Weighted Scoring?

The weighted average (30% network, 40% device, 30% browser) reflects the relative importance of each factor:

- **Device (40%)**: Most critical for 3D rendering performance
- **Network (30%)**: Important for initial load and asset streaming
- **Browser (30%)**: Essential for feature availability

### Why Three Tiers?

Three tiers provide a good balance between:
- **Simplicity**: Easy to understand and implement
- **Flexibility**: Enough granularity for meaningful optimization
- **Maintainability**: Not too many rendering paths to maintain

### Conservative Defaults

When capabilities cannot be detected (unknown values), the classifier uses conservative middle-ground defaults to avoid over-optimistic classifications that could lead to poor performance.

## Future Enhancements

Potential improvements for future iterations:

1. **Adaptive Classification**: Adjust classification based on actual runtime performance
2. **User Preferences**: Allow users to override automatic classification
3. **Historical Data**: Use past performance data to improve classification accuracy
4. **A/B Testing**: Test different scoring weights to optimize user experience
5. **Machine Learning**: Train a model on real-world performance data
