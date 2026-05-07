/**
 * Performance Monitoring Utilities
 * 
 * Tracks Core Web Vitals and custom performance metrics
 */

export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
  fps?: number; // Frames per second (for 3D viz)
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {};
  private fpsFrames: number[] = [];
  private fpsLastTime = performance.now();
  private isDevelopment = process.env.NODE_ENV === 'development';

  constructor() {
    if (typeof window === 'undefined') return;
    this.initWebVitals();
  }

  /**
   * Initialize Core Web Vitals tracking
   */
  private initWebVitals() {
    // FCP - First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find((entry) => entry.name === 'first-contentful-paint');
      if (fcp) {
        this.metrics.fcp = fcp.startTime;
        this.logMetric('FCP', fcp.startTime);
      }
    });

    try {
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      // Paint timing not supported
    }

    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.lcp = lastEntry.startTime;
      this.logMetric('LCP', lastEntry.startTime);
    });

    try {
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP not supported
    }

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.metrics.fid = entry.processingStart - entry.startTime;
        this.logMetric('FID', this.metrics.fid);
      });
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // FID not supported
    }

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          this.metrics.cls = clsValue;
          this.logMetric('CLS', clsValue);
        }
      });
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // CLS not supported
    }

    // TTFB - Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
      this.logMetric('TTFB', this.metrics.ttfb);
    }
  }

  /**
   * Track FPS for 3D visualization
   */
  public trackFrame() {
    const now = performance.now();
    const delta = now - this.fpsLastTime;
    this.fpsLastTime = now;

    const fps = 1000 / delta;
    this.fpsFrames.push(fps);

    // Keep only last 60 frames
    if (this.fpsFrames.length > 60) {
      this.fpsFrames.shift();
    }

    // Calculate average FPS
    const avgFps = this.fpsFrames.reduce((a, b) => a + b, 0) / this.fpsFrames.length;
    this.metrics.fps = Math.round(avgFps);

    return this.metrics.fps;
  }

  /**
   * Get current metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Get FPS
   */
  public getFPS(): number {
    return this.metrics.fps || 0;
  }

  /**
   * Log metric in development
   */
  private logMetric(name: string, value: number) {
    if (this.isDevelopment) {
      console.log(`[Performance] ${name}: ${value.toFixed(2)}ms`);
    }
  }

  /**
   * Check if performance is acceptable
   */
  public isPerformanceAcceptable(): boolean {
    const { fcp, lcp, fid, cls, fps } = this.metrics;

    // Core Web Vitals thresholds (good)
    const fcpGood = !fcp || fcp < 1800;
    const lcpGood = !lcp || lcp < 2500;
    const fidGood = !fid || fid < 100;
    const clsGood = !cls || cls < 0.1;
    const fpsGood = !fps || fps >= 30;

    return fcpGood && lcpGood && fidGood && clsGood && fpsGood;
  }

  /**
   * Get performance report
   */
  public getReport(): string {
    const { fcp, lcp, fid, cls, ttfb, fps } = this.metrics;

    return `
Performance Report:
- FCP: ${fcp ? fcp.toFixed(2) + 'ms' : 'N/A'} (target: <1800ms)
- LCP: ${lcp ? lcp.toFixed(2) + 'ms' : 'N/A'} (target: <2500ms)
- FID: ${fid ? fid.toFixed(2) + 'ms' : 'N/A'} (target: <100ms)
- CLS: ${cls ? cls.toFixed(3) : 'N/A'} (target: <0.1)
- TTFB: ${ttfb ? ttfb.toFixed(2) + 'ms' : 'N/A'}
- FPS: ${fps || 'N/A'} (target: ≥60)
    `.trim();
  }
}

// Singleton instance
let performanceMonitor: PerformanceMonitor | null = null;

export function getPerformanceMonitor(): PerformanceMonitor {
  if (!performanceMonitor) {
    performanceMonitor = new PerformanceMonitor();
  }
  return performanceMonitor;
}
