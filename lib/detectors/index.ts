/**
 * Capability Detection Module
 * 
 * Exports network, device, and browser capability detection functions
 * and the NetworkDetector React component.
 */

export {
  detectNetworkCapabilities,
  detectDeviceCapabilities,
  detectBrowserCapabilities,
  detectCapabilities,
  detectGPUCapability,
  detectDeviceMemory,
  detectCPUCores,
  detectDevicePixelRatio,
  detectWebGLSupport,
  detectWebGL2Support,
  detectServiceWorkerSupport,
  detectIntersectionObserverSupport,
} from './network-detector';

export { NetworkDetector } from './NetworkDetector';
export type { NetworkDetectorProps } from './NetworkDetector';
