'use client';

/**
 * NetworkDetector React Component
 * 
 * Detects network and device capabilities on mount and calls the callback
 * with the classification result.
 */

import { useEffect } from 'react';
import { detectCapabilities } from './network-detector';
import { classifyCapabilities } from '../classifiers/capability-classifier';
import type { CapabilityClassification } from '../types/capability-detection';

export interface NetworkDetectorProps {
  onClassificationComplete: (classification: CapabilityClassification) => void;
  timeout?: number; // default 500ms
}

/**
 * NetworkDetector component
 * 
 * This component runs capability detection on mount and returns null (renders nothing).
 * It's designed to be included in the app layout to perform detection early.
 */
export function NetworkDetector({ 
  onClassificationComplete, 
  timeout = 500 
}: NetworkDetectorProps): null {
  useEffect(() => {
    let mounted = true;

    const runDetection = async () => {
      try {
        const measurements = await detectCapabilities(timeout);
        
        if (!mounted) return;

        // Classify the measurements using the capability classifier
        const classification = classifyCapabilities(measurements);

        onClassificationComplete(classification);
      } catch (error) {
        console.warn('Capability detection failed, using conservative fallback', error);
        
        if (!mounted) return;

        // Fallback to slow classification on error
        onClassificationComplete({
          level: 'slow',
          reason: 'Detection failed, using safe fallback',
          timestamp: Date.now(),
        });
      }
    };

    runDetection();

    return () => {
      mounted = false;
    };
  }, [onClassificationComplete, timeout]);

  return null;
}
