/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
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
    return config;
  },
}

module.exports = nextConfig;
