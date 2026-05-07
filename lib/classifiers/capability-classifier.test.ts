/**
 * Unit tests for Capability Classifier
 */

import { describe, it, expect } from 'vitest';
import {
  calculateCapabilityScore,
  classifyCapabilities,
  type CapabilityScore,
} from './capability-classifier';
import type { CapabilityMeasurements } from '../types/capability-detection';

describe('Capability Classifier', () => {
  describe('calculateCapabilityScore', () => {
    it('should score high-end capabilities correctly', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '4g',
          downlink: 15,
          rtt: 30,
          saveData: false,
        },
        device: {
          gpu: 'high',
          memory: 16,
          cores: 8,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: true,
          webgl2: true,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const score = calculateCapabilityScore(measurements);

      expect(score.network).toBeGreaterThanOrEqual(90);
      expect(score.device).toBeGreaterThanOrEqual(90);
      expect(score.browser).toBe(100);
      expect(score.overall).toBeGreaterThanOrEqual(90);
    });

    it('should score low-end capabilities correctly', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '2g',
          downlink: 0.5,
          rtt: 600,
          saveData: true,
        },
        device: {
          gpu: 'low',
          memory: 1,
          cores: 2,
          devicePixelRatio: 3,
        },
        browser: {
          webgl: false,
          webgl2: false,
          serviceWorker: false,
          intersectionObserver: false,
        },
      };

      const score = calculateCapabilityScore(measurements);

      expect(score.network).toBeLessThan(30);
      expect(score.device).toBeLessThan(30);
      expect(score.browser).toBe(0);
      expect(score.overall).toBeLessThan(30);
    });

    it('should score medium capabilities correctly', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '3g',
          downlink: 3,
          rtt: 150,
          saveData: false,
        },
        device: {
          gpu: 'medium',
          memory: 4,
          cores: 4,
          devicePixelRatio: 2,
        },
        browser: {
          webgl: true,
          webgl2: false,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const score = calculateCapabilityScore(measurements);

      expect(score.network).toBeGreaterThan(40);
      expect(score.network).toBeLessThan(70);
      expect(score.device).toBeGreaterThan(40);
      expect(score.device).toBeLessThan(70);
      expect(score.browser).toBeGreaterThan(70);
      expect(score.overall).toBeGreaterThan(40);
      expect(score.overall).toBeLessThan(80);
    });
  });

  describe('classifyCapabilities', () => {
    it('should classify as fast for high-end capabilities', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '4g',
          downlink: 15,
          rtt: 30,
          saveData: false,
        },
        device: {
          gpu: 'high',
          memory: 8,
          cores: 8,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: true,
          webgl2: true,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.level).toBe('fast');
      expect(classification.score.overall).toBeGreaterThanOrEqual(70);
      expect(classification.reason).toContain('High performance');
      expect(classification.timestamp).toBeGreaterThan(0);
      expect(classification.measurements).toEqual(measurements);
    });

    it('should classify as medium for moderate capabilities', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '3g',
          downlink: 2,
          rtt: 150,
          saveData: false,
        },
        device: {
          gpu: 'medium',
          memory: 4,
          cores: 4,
          devicePixelRatio: 2,
        },
        browser: {
          webgl: true,
          webgl2: false,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.level).toBe('medium');
      expect(classification.score.overall).toBeGreaterThanOrEqual(40);
      expect(classification.score.overall).toBeLessThan(70);
      expect(classification.reason).toContain('Moderate performance');
    });

    it('should classify as slow for low-end capabilities', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '2g',
          downlink: 0.5,
          rtt: 600,
          saveData: true,
        },
        device: {
          gpu: 'low',
          memory: 1,
          cores: 2,
          devicePixelRatio: 3,
        },
        browser: {
          webgl: false,
          webgl2: false,
          serviceWorker: false,
          intersectionObserver: false,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.level).toBe('slow');
      expect(classification.score.overall).toBeLessThan(40);
      expect(classification.reason).toContain('Limited performance');
    });

    it('should classify as slow when WebGL is not supported', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '4g',
          downlink: 10,
          rtt: 50,
          saveData: false,
        },
        device: {
          gpu: 'medium',
          memory: 4,
          cores: 4,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: false,
          webgl2: false,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.level).toBe('slow');
      expect(classification.reason).toContain('no WebGL support');
    });

    it('should classify as slow when memory is insufficient', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '4g',
          downlink: 10,
          rtt: 50,
          saveData: false,
        },
        device: {
          gpu: 'medium',
          memory: 1,
          cores: 4,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: true,
          webgl2: true,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.level).toBe('slow');
      expect(classification.reason).toContain('limited memory');
    });

    it('should classify as medium when WebGL2 is not supported but WebGL is', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '3g',
          downlink: 3,
          rtt: 100,
          saveData: false,
        },
        device: {
          gpu: 'medium',
          memory: 4,
          cores: 4,
          devicePixelRatio: 2,
        },
        browser: {
          webgl: true,
          webgl2: false,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.level).toBe('medium');
    });

    it('should include score breakdown in classification', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '4g',
          downlink: 10,
          rtt: 50,
          saveData: false,
        },
        device: {
          gpu: 'high',
          memory: 8,
          cores: 8,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: true,
          webgl2: true,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.score).toBeDefined();
      expect(classification.score.network).toBeGreaterThan(0);
      expect(classification.score.device).toBeGreaterThan(0);
      expect(classification.score.browser).toBeGreaterThan(0);
      expect(classification.score.overall).toBeGreaterThan(0);
    });

    it('should handle unknown network type conservatively', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: 'unknown',
          downlink: 5,
          rtt: 100,
          saveData: false,
        },
        device: {
          gpu: 'medium',
          memory: 4,
          cores: 4,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: true,
          webgl2: false,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      // Should still be able to classify based on other metrics
      expect(classification.level).toBe('medium');
    });
  });

  describe('classification rules', () => {
    it('should require score >= 70 for fast classification', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '4g',
          downlink: 10,
          rtt: 50,
          saveData: false,
        },
        device: {
          gpu: 'high',
          memory: 8,
          cores: 8,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: true,
          webgl2: true,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      if (classification.level === 'fast') {
        expect(classification.score.overall).toBeGreaterThanOrEqual(70);
      }
    });

    it('should require score >= 40 for medium classification', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: '3g',
          downlink: 2,
          rtt: 150,
          saveData: false,
        },
        device: {
          gpu: 'medium',
          memory: 4,
          cores: 4,
          devicePixelRatio: 2,
        },
        browser: {
          webgl: true,
          webgl2: false,
          serviceWorker: true,
          intersectionObserver: true,
        },
      };

      const classification = classifyCapabilities(measurements);

      if (classification.level === 'medium') {
        expect(classification.score.overall).toBeGreaterThanOrEqual(40);
      }
    });

    it('should classify as slow when score < 40', () => {
      const measurements: CapabilityMeasurements = {
        network: {
          effectiveType: 'slow-2g',
          downlink: 0.1,
          rtt: 1000,
          saveData: true,
        },
        device: {
          gpu: 'low',
          memory: 1,
          cores: 1,
          devicePixelRatio: 3,
        },
        browser: {
          webgl: false,
          webgl2: false,
          serviceWorker: false,
          intersectionObserver: false,
        },
      };

      const classification = classifyCapabilities(measurements);

      expect(classification.level).toBe('slow');
      expect(classification.score.overall).toBeLessThan(40);
    });
  });
});
