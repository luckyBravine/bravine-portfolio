/**
 * Network and Device Capability Detector
 * 
 * Detects network speed, device capabilities, and browser features
 * to determine optimal rendering strategy for progressive enhancement.
 */

import type {
  NetworkCapabilities,
  DeviceCapabilities,
  BrowserCapabilities,
  CapabilityMeasurements,
} from '../types/capability-detection';

/**
 * Detect network capabilities using Navigator.connection API
 */
export function detectNetworkCapabilities(): NetworkCapabilities {
  // Check if Network Information API is available
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;

  if (!connection) {
    return {
      effectiveType: 'unknown',
      downlink: 0,
      rtt: 0,
      saveData: false,
    };
  }

  return {
    effectiveType: connection.effectiveType || 'unknown',
    downlink: connection.downlink || 0,
    rtt: connection.rtt || 0,
    saveData: connection.saveData || false,
  };
}

/**
 * Detect GPU capability by attempting to create WebGL context
 */
export function detectGPUCapability(): 'high' | 'medium' | 'low' | 'unknown' {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      return 'unknown';
    }

    const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      const rendererLower = renderer.toLowerCase();
      
      // High-end GPUs
      if (rendererLower.includes('nvidia') || 
          rendererLower.includes('amd') || 
          rendererLower.includes('radeon') ||
          rendererLower.includes('geforce')) {
        return 'high';
      }
      
      // Low-end GPUs (integrated, mobile)
      if (rendererLower.includes('intel') || 
          rendererLower.includes('mali') ||
          rendererLower.includes('adreno') ||
          rendererLower.includes('powervr')) {
        return 'low';
      }
    }

    // Default to medium if we can't determine
    return 'medium';
  } catch (error) {
    return 'unknown';
  }
}

/**
 * Detect device memory in GB
 */
export function detectDeviceMemory(): number {
  // Navigator.deviceMemory returns approximate amount of device memory in GB
  const memory = (navigator as any).deviceMemory;
  return memory || 4; // Default to 4GB if unavailable
}

/**
 * Detect number of CPU cores
 */
export function detectCPUCores(): number {
  return navigator.hardwareConcurrency || 4; // Default to 4 cores if unavailable
}

/**
 * Detect device pixel ratio
 */
export function detectDevicePixelRatio(): number {
  return window.devicePixelRatio || 1;
}

/**
 * Detect device capabilities
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  return {
    gpu: detectGPUCapability(),
    memory: detectDeviceMemory(),
    cores: detectCPUCores(),
    devicePixelRatio: detectDevicePixelRatio(),
  };
}

/**
 * Detect WebGL support
 */
export function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      canvas.getContext('webgl') || 
      canvas.getContext('experimental-webgl')
    );
  } catch (error) {
    return false;
  }
}

/**
 * Detect WebGL2 support
 */
export function detectWebGL2Support(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch (error) {
    return false;
  }
}

/**
 * Detect Service Worker support
 */
export function detectServiceWorkerSupport(): boolean {
  return 'serviceWorker' in navigator;
}

/**
 * Detect Intersection Observer support
 */
export function detectIntersectionObserverSupport(): boolean {
  return 'IntersectionObserver' in window;
}

/**
 * Detect browser feature capabilities
 */
export function detectBrowserCapabilities(): BrowserCapabilities {
  return {
    webgl: detectWebGLSupport(),
    webgl2: detectWebGL2Support(),
    serviceWorker: detectServiceWorkerSupport(),
    intersectionObserver: detectIntersectionObserverSupport(),
  };
}

/**
 * Detect all capabilities with timeout
 * @param timeout - Maximum time in milliseconds to wait for detection (default: 500ms)
 * @returns Promise that resolves with capability measurements
 */
export async function detectCapabilities(
  timeout: number = 500
): Promise<CapabilityMeasurements> {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      // Return measurements even if timeout is reached
      resolve({
        network: detectNetworkCapabilities(),
        device: detectDeviceCapabilities(),
        browser: detectBrowserCapabilities(),
      });
    }, timeout);

    try {
      // Perform all detections
      const measurements: CapabilityMeasurements = {
        network: detectNetworkCapabilities(),
        device: detectDeviceCapabilities(),
        browser: detectBrowserCapabilities(),
      };

      clearTimeout(timeoutId);
      resolve(measurements);
    } catch (error) {
      // If any error occurs, still return measurements with defaults
      clearTimeout(timeoutId);
      resolve({
        network: {
          effectiveType: 'unknown',
          downlink: 0,
          rtt: 0,
          saveData: false,
        },
        device: {
          gpu: 'unknown',
          memory: 4,
          cores: 4,
          devicePixelRatio: 1,
        },
        browser: {
          webgl: false,
          webgl2: false,
          serviceWorker: false,
          intersectionObserver: false,
        },
      });
    }
  });
}
