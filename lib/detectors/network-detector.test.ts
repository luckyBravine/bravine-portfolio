/**
 * Unit tests for network and device capability detection
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  detectNetworkCapabilities,
  detectGPUCapability,
  detectDeviceMemory,
  detectCPUCores,
  detectDevicePixelRatio,
  detectDeviceCapabilities,
  detectWebGLSupport,
  detectWebGL2Support,
  detectServiceWorkerSupport,
  detectIntersectionObserverSupport,
  detectBrowserCapabilities,
  detectCapabilities,
} from './network-detector';

describe('Network Capability Detection', () => {
  beforeEach(() => {
    // Reset navigator mocks
    vi.clearAllMocks();
  });

  it('should detect network capabilities when API is available', () => {
    // Mock Navigator.connection API
    const mockConnection = {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false,
    };
    
    Object.defineProperty(navigator, 'connection', {
      value: mockConnection,
      writable: true,
      configurable: true,
    });

    const capabilities = detectNetworkCapabilities();
    
    expect(capabilities.effectiveType).toBe('4g');
    expect(capabilities.downlink).toBe(10);
    expect(capabilities.rtt).toBe(50);
    expect(capabilities.saveData).toBe(false);
  });

  it('should return unknown network capabilities when API is unavailable', () => {
    // Remove connection API
    Object.defineProperty(navigator, 'connection', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const capabilities = detectNetworkCapabilities();
    
    expect(capabilities.effectiveType).toBe('unknown');
    expect(capabilities.downlink).toBe(0);
    expect(capabilities.rtt).toBe(0);
    expect(capabilities.saveData).toBe(false);
  });
});

describe('GPU Capability Detection', () => {
  it('should detect high-end GPU from renderer string', () => {
    const mockCanvas = {
      getContext: vi.fn(() => ({
        getExtension: vi.fn(() => ({
          UNMASKED_RENDERER_WEBGL: 0x9246,
        })),
        getParameter: vi.fn(() => 'NVIDIA GeForce RTX 3080'),
      })),
    };

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);

    const gpu = detectGPUCapability();
    expect(gpu).toBe('high');
  });

  it('should detect low-end GPU from renderer string', () => {
    const mockCanvas = {
      getContext: vi.fn(() => ({
        getExtension: vi.fn(() => ({
          UNMASKED_RENDERER_WEBGL: 0x9246,
        })),
        getParameter: vi.fn(() => 'Intel HD Graphics 620'),
      })),
    };

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);

    const gpu = detectGPUCapability();
    expect(gpu).toBe('low');
  });

  it('should return unknown when WebGL is unavailable', () => {
    const mockCanvas = {
      getContext: vi.fn(() => null),
    };

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);

    const gpu = detectGPUCapability();
    expect(gpu).toBe('unknown');
  });
});

describe('Device Memory Detection', () => {
  it('should detect device memory when API is available', () => {
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
      configurable: true,
    });

    const memory = detectDeviceMemory();
    expect(memory).toBe(8);
  });

  it('should return default 4GB when API is unavailable', () => {
    Object.defineProperty(navigator, 'deviceMemory', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const memory = detectDeviceMemory();
    expect(memory).toBe(4);
  });
});

describe('CPU Cores Detection', () => {
  it('should detect CPU cores when API is available', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
      configurable: true,
    });

    const cores = detectCPUCores();
    expect(cores).toBe(8);
  });

  it('should return default 4 cores when API is unavailable', () => {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const cores = detectCPUCores();
    expect(cores).toBe(4);
  });
});

describe('Device Pixel Ratio Detection', () => {
  it('should detect device pixel ratio', () => {
    Object.defineProperty(window, 'devicePixelRatio', {
      value: 2,
      writable: true,
      configurable: true,
    });

    const dpr = detectDevicePixelRatio();
    expect(dpr).toBe(2);
  });

  it('should return 1 when devicePixelRatio is unavailable', () => {
    Object.defineProperty(window, 'devicePixelRatio', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    const dpr = detectDevicePixelRatio();
    expect(dpr).toBe(1);
  });
});

describe('Device Capabilities Detection', () => {
  it('should detect all device capabilities', () => {
    Object.defineProperty(navigator, 'deviceMemory', {
      value: 8,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      value: 8,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, 'devicePixelRatio', {
      value: 2,
      writable: true,
      configurable: true,
    });

    const capabilities = detectDeviceCapabilities();
    
    expect(capabilities.memory).toBe(8);
    expect(capabilities.cores).toBe(8);
    expect(capabilities.devicePixelRatio).toBe(2);
    expect(capabilities.gpu).toBeDefined();
  });
});

describe('Browser Feature Detection', () => {
  it('should detect WebGL support', () => {
    const mockCanvas = {
      getContext: vi.fn(() => ({})),
    };

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);

    const hasWebGL = detectWebGLSupport();
    expect(hasWebGL).toBe(true);
  });

  it('should detect WebGL2 support', () => {
    const mockCanvas = {
      getContext: vi.fn((type: string) => {
        if (type === 'webgl2') return {};
        return null;
      }),
    };

    vi.spyOn(document, 'createElement').mockReturnValue(mockCanvas as any);

    const hasWebGL2 = detectWebGL2Support();
    expect(hasWebGL2).toBe(true);
  });

  it('should detect Service Worker support', () => {
    Object.defineProperty(navigator, 'serviceWorker', {
      value: {},
      writable: true,
      configurable: true,
    });

    const hasServiceWorker = detectServiceWorkerSupport();
    expect(hasServiceWorker).toBe(true);
  });

  it('should detect Intersection Observer support', () => {
    (global as any).IntersectionObserver = class {};

    const hasIntersectionObserver = detectIntersectionObserverSupport();
    expect(hasIntersectionObserver).toBe(true);
  });

  it('should detect all browser capabilities', () => {
    const capabilities = detectBrowserCapabilities();
    
    expect(capabilities).toHaveProperty('webgl');
    expect(capabilities).toHaveProperty('webgl2');
    expect(capabilities).toHaveProperty('serviceWorker');
    expect(capabilities).toHaveProperty('intersectionObserver');
  });
});

describe('Complete Capability Detection', () => {
  it('should detect all capabilities within timeout', async () => {
    const measurements = await detectCapabilities(500);
    
    expect(measurements).toHaveProperty('network');
    expect(measurements).toHaveProperty('device');
    expect(measurements).toHaveProperty('browser');
    
    expect(measurements.network).toHaveProperty('effectiveType');
    expect(measurements.device).toHaveProperty('gpu');
    expect(measurements.browser).toHaveProperty('webgl');
  });

  it('should complete detection within specified timeout', async () => {
    const startTime = Date.now();
    await detectCapabilities(100);
    const endTime = Date.now();
    
    const duration = endTime - startTime;
    expect(duration).toBeLessThan(150); // Allow some margin
  });

  it('should return default measurements on error', async () => {
    // Force an error by making document.createElement throw
    vi.spyOn(document, 'createElement').mockImplementation(() => {
      throw new Error('Test error');
    });

    const measurements = await detectCapabilities(500);
    
    // Should still return measurements with defaults
    expect(measurements).toHaveProperty('network');
    expect(measurements).toHaveProperty('device');
    expect(measurements).toHaveProperty('browser');
  });
});
