/**
 * Capability Classifier
 * 
 * Classifies device and network capabilities into fast/medium/slow categories
 * based on a scoring algorithm that evaluates network, device, and browser capabilities.
 */

import type {
  CapabilityMeasurements,
  CapabilityClassification,
  NetworkCapabilities,
  DeviceCapabilities,
  BrowserCapabilities,
} from '../types/capability-detection';

/**
 * Score breakdown for debugging and transparency
 */
export interface CapabilityScore {
  network: number; // 0-100
  device: number; // 0-100
  browser: number; // 0-100
  overall: number; // 0-100
}

/**
 * Extended classification with score details
 */
export interface DetailedCapabilityClassification extends CapabilityClassification {
  score: CapabilityScore;
  measurements: CapabilityMeasurements;
}

/**
 * Score network capabilities (0-100)
 */
function scoreNetworkCapabilities(network: NetworkCapabilities): number {
  let score = 0;

  // Effective type scoring (0-40 points)
  switch (network.effectiveType) {
    case '4g':
      score += 40;
      break;
    case '3g':
      score += 25;
      break;
    case '2g':
      score += 10;
      break;
    case 'slow-2g':
      score += 5;
      break;
    case 'unknown':
      score += 20; // Conservative middle ground
      break;
  }

  // Downlink speed scoring (0-30 points)
  if (network.downlink >= 10) {
    score += 30;
  } else if (network.downlink >= 5) {
    score += 20;
  } else if (network.downlink >= 1) {
    score += 10;
  }

  // RTT (Round Trip Time) scoring (0-20 points)
  if (network.rtt <= 50) {
    score += 20;
  } else if (network.rtt <= 100) {
    score += 15;
  } else if (network.rtt <= 200) {
    score += 10;
  } else if (network.rtt <= 500) {
    score += 5;
  }

  // Save data penalty (0-10 points)
  if (!network.saveData) {
    score += 10;
  }

  return Math.min(score, 100);
}

/**
 * Score device capabilities (0-100)
 */
function scoreDeviceCapabilities(device: DeviceCapabilities): number {
  let score = 0;

  // GPU scoring (0-40 points)
  switch (device.gpu) {
    case 'high':
      score += 40;
      break;
    case 'medium':
      score += 25;
      break;
    case 'low':
      score += 10;
      break;
    case 'unknown':
      score += 15; // Conservative middle ground
      break;
  }

  // Memory scoring (0-30 points)
  if (device.memory >= 8) {
    score += 30;
  } else if (device.memory >= 4) {
    score += 20;
  } else if (device.memory >= 2) {
    score += 10;
  } else {
    score += 5;
  }

  // CPU cores scoring (0-20 points)
  if (device.cores >= 8) {
    score += 20;
  } else if (device.cores >= 4) {
    score += 15;
  } else if (device.cores >= 2) {
    score += 10;
  } else {
    score += 5;
  }

  // Device pixel ratio scoring (0-10 points)
  // Lower DPR is better for performance (fewer pixels to render)
  if (device.devicePixelRatio <= 1.5) {
    score += 10;
  } else if (device.devicePixelRatio <= 2) {
    score += 7;
  } else if (device.devicePixelRatio <= 3) {
    score += 4;
  }

  return Math.min(score, 100);
}

/**
 * Score browser capabilities (0-100)
 */
function scoreBrowserCapabilities(browser: BrowserCapabilities): number {
  let score = 0;

  // WebGL2 support (0-40 points) - most important for 3D rendering
  if (browser.webgl2) {
    score += 40;
  } else if (browser.webgl) {
    score += 20; // WebGL1 is still useful but less capable
  }

  // Service Worker support (0-30 points) - important for PWA
  if (browser.serviceWorker) {
    score += 30;
  }

  // Intersection Observer support (0-30 points) - important for performance
  if (browser.intersectionObserver) {
    score += 30;
  }

  return Math.min(score, 100);
}

/**
 * Calculate overall capability score
 */
export function calculateCapabilityScore(
  measurements: CapabilityMeasurements
): CapabilityScore {
  const networkScore = scoreNetworkCapabilities(measurements.network);
  const deviceScore = scoreDeviceCapabilities(measurements.device);
  const browserScore = scoreBrowserCapabilities(measurements.browser);

  // Weighted average: network 30%, device 40%, browser 30%
  const overall = Math.round(
    networkScore * 0.3 + deviceScore * 0.4 + browserScore * 0.3
  );

  return {
    network: networkScore,
    device: deviceScore,
    browser: browserScore,
    overall,
  };
}

/**
 * Classify capabilities based on score
 * 
 * Classification rules:
 * - Fast: overall score >= 70, WebGL2 support, 4G+ network, 4GB+ memory
 * - Medium: overall score >= 40, WebGL support, 3G+ network, 2GB+ memory
 * - Slow: overall score < 40, or any critical capability missing
 */
export function classifyCapabilities(
  measurements: CapabilityMeasurements
): DetailedCapabilityClassification {
  const score = calculateCapabilityScore(measurements);
  const { network, device, browser } = measurements;

  // Determine classification level
  let level: 'fast' | 'medium' | 'slow';
  let reason: string;

  if (
    score.overall >= 70 &&
    browser.webgl2 &&
    (network.effectiveType === '4g' || network.downlink >= 5) &&
    device.memory >= 4
  ) {
    level = 'fast';
    reason = `High performance environment (score: ${score.overall})`;
  } else if (
    score.overall >= 40 &&
    browser.webgl &&
    (network.effectiveType === '3g' || 
     network.effectiveType === '4g' || 
     network.downlink >= 1) &&
    device.memory >= 2
  ) {
    level = 'medium';
    reason = `Moderate performance environment (score: ${score.overall})`;
  } else {
    level = 'slow';
    const reasons: string[] = [];
    
    if (score.overall < 40) {
      reasons.push(`low overall score (${score.overall})`);
    }
    if (!browser.webgl) {
      reasons.push('no WebGL support');
    }
    if (network.effectiveType === '2g' || network.effectiveType === 'slow-2g') {
      reasons.push('slow network');
    }
    if (device.memory < 2) {
      reasons.push('limited memory');
    }
    
    reason = `Limited performance environment: ${reasons.join(', ')}`;
  }

  return {
    level,
    reason,
    timestamp: Date.now(),
    score,
    measurements,
  };
}
