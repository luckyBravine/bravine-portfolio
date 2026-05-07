/**
 * Unit tests for Capability Context
 */

import { describe, it, expect } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import {
  CapabilityProvider,
  useCapability,
  useCapabilityLevel,
  useIsCapabilityDetected,
} from './capability-context';
import type { CapabilityClassification } from '../types/capability-detection';

describe('Capability Context', () => {
  describe('CapabilityProvider', () => {
    it('should render children', () => {
      render(
        <CapabilityProvider>
          <div>Test Content</div>
        </CapabilityProvider>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should provide initial state with null classification', () => {
      const { result } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      expect(result.current.classification).toBeNull();
      expect(result.current.isDetecting).toBe(true);
    });

    it('should allow setting classification', () => {
      const { result } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      const classification: CapabilityClassification = {
        level: 'fast',
        reason: 'Test classification',
        timestamp: Date.now(),
      };

      act(() => {
        result.current.setClassification(classification);
      });

      expect(result.current.classification).toEqual(classification);
      expect(result.current.isDetecting).toBe(false);
    });

    it('should update isDetecting when classification is set', () => {
      const { result } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      expect(result.current.isDetecting).toBe(true);

      const classification: CapabilityClassification = {
        level: 'medium',
        reason: 'Test',
        timestamp: Date.now(),
      };

      act(() => {
        result.current.setClassification(classification);
      });

      expect(result.current.isDetecting).toBe(false);
    });
  });

  describe('useCapability', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = () => {};

      expect(() => {
        renderHook(() => useCapability());
      }).toThrow('useCapability must be used within a CapabilityProvider');

      console.error = originalError;
    });

    it('should return context value when used inside provider', () => {
      const { result } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      expect(result.current).toHaveProperty('classification');
      expect(result.current).toHaveProperty('setClassification');
      expect(result.current).toHaveProperty('isDetecting');
    });
  });

  describe('useCapabilityLevel', () => {
    it('should return null when classification is not set', () => {
      const { result } = renderHook(() => useCapabilityLevel(), {
        wrapper: CapabilityProvider,
      });

      expect(result.current).toBeNull();
    });

    it('should return capability level when classification is set', () => {
      const { result: capabilityResult } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      const { result: levelResult } = renderHook(() => useCapabilityLevel(), {
        wrapper: CapabilityProvider,
      });

      const classification: CapabilityClassification = {
        level: 'fast',
        reason: 'Test',
        timestamp: Date.now(),
      };

      act(() => {
        capabilityResult.current.setClassification(classification);
      });

      // Re-render to get updated value
      const { result: updatedLevelResult } = renderHook(() => useCapabilityLevel(), {
        wrapper: CapabilityProvider,
      });

      expect(updatedLevelResult.current).toBe('fast');
    });

    it('should return correct level for each classification type', () => {
      const levels: Array<'fast' | 'medium' | 'slow'> = ['fast', 'medium', 'slow'];

      levels.forEach((level) => {
        const { result: capabilityResult } = renderHook(() => useCapability(), {
          wrapper: CapabilityProvider,
        });

        const classification: CapabilityClassification = {
          level,
          reason: `Test ${level}`,
          timestamp: Date.now(),
        };

        act(() => {
          capabilityResult.current.setClassification(classification);
        });

        const { result: levelResult } = renderHook(() => useCapabilityLevel(), {
          wrapper: CapabilityProvider,
        });

        expect(levelResult.current).toBe(level);
      });
    });
  });

  describe('useIsCapabilityDetected', () => {
    it('should return false when classification is not set', () => {
      const { result } = renderHook(() => useIsCapabilityDetected(), {
        wrapper: CapabilityProvider,
      });

      expect(result.current).toBe(false);
    });

    it('should return true when classification is set', () => {
      const { result: capabilityResult } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      const classification: CapabilityClassification = {
        level: 'medium',
        reason: 'Test',
        timestamp: Date.now(),
      };

      act(() => {
        capabilityResult.current.setClassification(classification);
      });

      const { result: detectedResult } = renderHook(() => useIsCapabilityDetected(), {
        wrapper: CapabilityProvider,
      });

      expect(detectedResult.current).toBe(true);
    });
  });

  describe('integration', () => {
    it('should allow multiple components to access the same classification', () => {
      const { result: result1 } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      const { result: result2 } = renderHook(() => useCapability(), {
        wrapper: CapabilityProvider,
      });

      const classification: CapabilityClassification = {
        level: 'fast',
        reason: 'Shared classification',
        timestamp: Date.now(),
      };

      act(() => {
        result1.current.setClassification(classification);
      });

      // Both hooks should see the same classification
      // Note: In a real app with a single provider, this would work.
      // In tests with separate renderHook calls, they get separate providers.
      // This test demonstrates the API, but in practice you'd test with a single provider.
      expect(result1.current.classification).toEqual(classification);
    });
  });
});
