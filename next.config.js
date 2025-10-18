/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons'],
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Compression
  compress: true,
  // Bundle analyzer (uncomment for debugging)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
  webpack: (config, { dev, isServer }) => {
    // PDF loader
    config.module.rules.push({
      test: /\.(pdf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/public/static/',
          outputPath: 'public/static/',
          name: '[name].[ext]',
        },
      },
    });

    // Performance optimizations
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
}

module.exports = nextConfig;
