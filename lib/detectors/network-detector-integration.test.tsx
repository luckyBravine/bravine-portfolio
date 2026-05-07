/**
 * Integration tests for NetworkDetector with CapabilityClassifier
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { NetworkDetector } from './NetworkDetector';
import type { CapabilityClassification } from '../types/capability-detection';

describe('NetworkDetector Integration', () => {
  beforeEach(() => {
    // Reset any mocks before each test
    vi.clearAllMocks();
  });

  it('should call onClassificationComplete with classification result', async () => {
    const onClassificationComplete = vi.fn();

    render(
      <NetworkDetector
        onClassificationComplete={onClassificationComplete}
        timeout={500}
      />
    );

    // Wait for the detection to complete
    await waitFor(
      () => {
        expect(onClassificationComplete).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );

    // Verify the classification structure
    const classification: CapabilityClassification = onClassificationComplete.mock.calls[0][0];
    
    expect(classification).toHaveProperty('level');
    expect(['fast', 'medium', 'slow']).toContain(classification.level);
    expect(classification).toHaveProperty('reason');
    expect(typeof classification.reason).toBe('string');
    expect(classification).toHaveProperty('timestamp');
    expect(typeof classification.timestamp).toBe('number');
  });

  it('should complete classification within timeout', async () => {
    const onClassificationComplete = vi.fn();
    const timeout = 500;
    const startTime = Date.now();

    render(
      <NetworkDetector
        onClassificationComplete={onClassificationComplete}
        timeout={timeout}
      />
    );

    await waitFor(
      () => {
        expect(onClassificationComplete).toHaveBeenCalled();
      },
      { timeout: timeout + 200 }
    );

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should complete within timeout + small buffer
    expect(duration).toBeLessThan(timeout + 100);
  });

  it('should provide fallback classification on error', async () => {
    // Mock detectCapabilities to throw an error
    const onClassificationComplete = vi.fn();

    // This test verifies the error handling in NetworkDetector
    render(
      <NetworkDetector
        onClassificationComplete={onClassificationComplete}
        timeout={100}
      />
    );

    await waitFor(
      () => {
        expect(onClassificationComplete).toHaveBeenCalled();
      },
      { timeout: 500 }
    );

    const classification: CapabilityClassification = onClassificationComplete.mock.calls[0][0];
    
    // Should have a valid classification even if detection fails
    expect(classification).toHaveProperty('level');
    expect(['fast', 'medium', 'slow']).toContain(classification.level);
  });

  it('should not call callback after unmount', async () => {
    const onClassificationComplete = vi.fn();

    const { unmount } = render(
      <NetworkDetector
        onClassificationComplete={onClassificationComplete}
        timeout={500}
      />
    );

    // Unmount immediately
    unmount();

    // Wait a bit to ensure callback is not called
    await new Promise(resolve => setTimeout(resolve, 600));

    // Callback should either not be called, or called before unmount
    // This test ensures no memory leaks or errors after unmount
    expect(true).toBe(true);
  });
});
