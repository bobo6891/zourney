const webpack = require('webpack');
const path = require('path');
const { CLIENTJS } = require('./settings.js');

const wbConfig = {
  entry: ['./src/ui/index.jsx'],
  output: {
    path: __dirname + '/dist/client',
    publicPath: '/assets',
    filename: `${CLIENTJS}.js`
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        SERVER_PORT: JSON.stringify(process.env.SERVER_PORT),
        BUILD_VERSION: JSON.stringify(process.env.BUILD_VERSION),
        CLUSTER_MANAGER_API: JSON.stringify(process.env.CLUSTER_MANAGER_API)
      }
    })
  ],

  target: 'web',

  resolve: {
    modules: ['node_modules', 'src/ui/**/*', './'],
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    loaders: [{ test: /\.(js?|jsx?)$/, exclude: /node_modules/, loaders: ['babel-loader'] }],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};

module.exports = wbConfig;
