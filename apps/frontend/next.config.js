import withTM from 'next-transpile-modules';

const transpileModules = withTM(['@repo/ui', '@repo/utils', '@repo/data']);

export default transpileModules({
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
