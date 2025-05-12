const path = require('path');
const repoName = 'task-manager';

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? `/${repoName}/` : '/',
  devServer: {
    client: {
      overlay: false,
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.json$/,
          loader: 'json-loader',
          type: 'javascript/auto',
          include: [path.resolve(__dirname, 'src/locales')],
        },
      ],
    },
    resolve: {
      alias: {
        '@locales': path.resolve(__dirname, 'src/locales'),
      },
    },
  },
  chainWebpack: (config) => {
    config.plugin('copy').tap((args) => {
      args[0].patterns.push({
        from: path.resolve(__dirname, 'src/locales'),
        to: path.resolve(__dirname, 'dist/locales'),
        toType: 'dir',
      });
      return args;
    });
  },
};
