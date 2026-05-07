/**
 * Application Configuration
 * Centralized configuration management for environment variables
 */

export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'Interactive Portfolio',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  features: {
    enable3DVisualization: process.env.NEXT_PUBLIC_ENABLE_3D_VISUALIZATION === 'true',
    enablePWA: process.env.NEXT_PUBLIC_ENABLE_PWA === 'true',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  performance: {
    enableMonitoring: process.env.NEXT_PUBLIC_PERFORMANCE_MONITORING === 'true',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  },
  analytics: {
    gaTrackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID || '',
    vercelAnalyticsId: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID || '',
  },
} as const;

export type Config = typeof config;
