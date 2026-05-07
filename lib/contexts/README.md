# Capability Context

React Context for managing and accessing capability classification results throughout the application.

## Overview

The Capability Context provides a centralized way to store and access device/network capability classification results. This allows all components in the application to adapt their rendering based on the user's environment without prop drilling.

## Components

### `CapabilityProvider`

Wraps the application to provide capability classification to all child components.

**Props:**
- `children`: React nodes to wrap

**Example:**
```typescript
import { CapabilityProvider } from '@/lib/contexts/capability-context';

function App() {
  return (
    <CapabilityProvider>
      <YourApp />
    </CapabilityProvider>
  );
}
```

### Hooks

#### `useCapability()`

Access the full capability context including classification and setter.

**Returns:**
```typescript
{
  classification: CapabilityClassification | null;
  setClassification: (classification: CapabilityClassification) => void;
  isDetecting: boolean;
}
```

**Example:**
```typescript
import { useCapability } from '@/lib/contexts/capability-context';

function MyComponent() {
  const { classification, setClassification, isDetecting } = useCapability();

  if (isDetecting) {
    return <div>Detecting capabilities...</div>;
  }

  return (
    <div>
      <p>Level: {classification?.level}</p>
      <p>Reason: {classification?.reason}</p>
    </div>
  );
}
```

#### `useCapabilityLevel()`

Get just the capability level (fast/medium/slow).

**Returns:** `'fast' | 'medium' | 'slow' | null`

**Example:**
```typescript
import { useCapabilityLevel } from '@/lib/contexts/capability-context';

function VisualizationRouter() {
  const level = useCapabilityLevel();

  if (!level) {
    return <LoadingSpinner />;
  }

  switch (level) {
    case 'fast':
      return <FullVisualization />;
    case 'medium':
      return <SimplifiedVisualization />;
    case 'slow':
      return <FallbackVisualization />;
  }
}
```

#### `useIsCapabilityDetected()`

Check if capability detection is complete.

**Returns:** `boolean`

**Example:**
```typescript
import { useIsCapabilityDetected } from '@/lib/contexts/capability-context';

function MyComponent() {
  const isDetected = useIsCapabilityDetected();

  if (!isDetected) {
    return <LoadingSpinner />;
  }

  return <Content />;
}
```

## Integration with NetworkDetector

The Capability Context is designed to work seamlessly with the NetworkDetector component:

```typescript
import { CapabilityProvider, useCapability } from '@/lib/contexts/capability-context';
import { NetworkDetector } from '@/lib/detectors/NetworkDetector';

function App() {
  return (
    <CapabilityProvider>
      <AppContent />
    </CapabilityProvider>
  );
}

function AppContent() {
  const { setClassification } = useCapability();

  return (
    <>
      <NetworkDetector
        onClassificationComplete={setClassification}
        timeout={500}
      />
      <MainContent />
    </>
  );
}
```

## Usage Patterns

### Conditional Rendering

```typescript
function AdaptiveComponent() {
  const level = useCapabilityLevel();

  return (
    <div>
      {level === 'fast' && <ExpensiveFeature />}
      {level === 'medium' && <ModerateFeature />}
      {level === 'slow' && <LightweightFeature />}
    </div>
  );
}
```

### Progressive Enhancement

```typescript
function ProgressiveImage() {
  const level = useCapabilityLevel();

  const quality = {
    fast: 'high',
    medium: 'medium',
    slow: 'low',
  }[level || 'slow'];

  return <Image src={`/image-${quality}.jpg`} />;
}
```

### Feature Flags

```typescript
function FeatureGate({ children }: { children: React.ReactNode }) {
  const level = useCapabilityLevel();

  // Only render expensive features on fast devices
  if (level !== 'fast') {
    return null;
  }

  return <>{children}</>;
}
```

### Loading States

```typescript
function ContentWithDetection() {
  const { classification, isDetecting } = useCapability();

  if (isDetecting) {
    return (
      <div className="loading">
        <Spinner />
        <p>Optimizing experience for your device...</p>
      </div>
    );
  }

  return (
    <div>
      <p>Optimized for {classification?.level} performance</p>
      <Content />
    </div>
  );
}
```

## Error Handling

The `useCapability` hook will throw an error if used outside of a `CapabilityProvider`:

```typescript
// ❌ This will throw an error
function BadComponent() {
  const capability = useCapability(); // Error: must be used within CapabilityProvider
  return <div>{capability.level}</div>;
}

// ✅ This is correct
function GoodComponent() {
  return (
    <CapabilityProvider>
      <ComponentUsingCapability />
    </CapabilityProvider>
  );
}
```

## State Management

The context uses React's built-in state management:

- **Initial State**: `classification` is `null`, `isDetecting` is `true`
- **After Detection**: `classification` is set, `isDetecting` becomes `false`
- **Persistence**: Classification persists for the lifetime of the provider

## Performance Considerations

### Minimal Re-renders

The context is optimized to minimize re-renders:
- Uses `useCallback` for the setter function
- Classification is only set once during detection
- Components only re-render when classification changes

### Selective Subscriptions

Use the specific hooks for your needs:
- `useCapabilityLevel()` - Only re-renders on level changes
- `useIsCapabilityDetected()` - Only re-renders on detection completion
- `useCapability()` - Re-renders on any context change

## Testing

When testing components that use capability context:

```typescript
import { render } from '@testing-library/react';
import { CapabilityProvider } from '@/lib/contexts/capability-context';

function renderWithCapability(ui: React.ReactElement) {
  return render(
    <CapabilityProvider>
      {ui}
    </CapabilityProvider>
  );
}

test('component adapts to capability level', () => {
  const { container } = renderWithCapability(<MyComponent />);
  // Test your component
});
```

## Best Practices

1. **Place Provider High**: Put `CapabilityProvider` near the root of your app
2. **Single Provider**: Use only one `CapabilityProvider` per app
3. **Early Detection**: Run `NetworkDetector` as early as possible
4. **Graceful Degradation**: Always handle the `null` case for classification
5. **Loading States**: Show appropriate loading UI while `isDetecting` is true
6. **Type Safety**: Use TypeScript to ensure correct usage of capability levels

## Related

- [Capability Classifier](../classifiers/README.md) - Classification logic
- [Network Detector](../detectors/README.md) - Capability detection
- [Design Document](../../.kiro/specs/interactive-portfolio-enhancement/design.md) - Overall architecture
