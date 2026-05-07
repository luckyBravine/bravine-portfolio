/**
 * Network capability information from Navigator.connection API
 */
export interface NetworkCapabilities {
  effectiveType: '4g' | '3g' | '2g' | 'slow-2g' | 'unknown';
  downlink: number; // Mbps
  rtt: number; // ms
  saveData: boolean;
}

/**
 * Device hardware capability information
 */
export interface DeviceCapabilities {
  gpu: 'high' | 'medium' | 'low' | 'unknown';
  memory: number; // GB
  cores: number;
  devicePixelRatio: number;
}

/**
 * Browser feature support information
 */
export interface BrowserCapabilities {
  webgl: boolean;
  webgl2: boolean;
  serviceWorker: boolean;
  intersectionObserver: boolean;
}

/**
 * Complete capability measurements
 */
export interface CapabilityMeasurements {
  network: NetworkCapabilities;
  device: DeviceCapabilities;
  browser: BrowserCapabilities;
}

/**
 * Capability classification result
 */
export interface CapabilityClassification {
  level: 'fast' | 'medium' | 'slow';
  reason: string;
  timestamp: number;
}
