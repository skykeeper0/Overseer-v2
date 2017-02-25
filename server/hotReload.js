module.exports = (app) => {
  console.log('DEVELOPMENT MODE');
  console.log('HOTLOADING CHANGES');
  const webpack = require('webpack');
  const webpackConfig = require('../webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true
    },
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
