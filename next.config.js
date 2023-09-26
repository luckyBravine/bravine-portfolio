/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
          test: /\.(pdf)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/public/files',
              outputPath: 'public/files/',
              name: 'BravineMmbayiaresume.pdf     ',
            },
          },
        });
        return config;
      },
}

module.exports = nextConfig
