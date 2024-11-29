/* eslint-disable */
const withTM = require('next-transpile-modules')([
  '@repo/ui',
  '@repo/utils',
  '@repo/data',
]);

module.exports = withTM({
  experimental: {
    externalDir: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: {
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      exclude: /node_modules/,
    });
    return config;
  },
});
