const path = require('path');
const fs = require('fs');

const nodeModules = fs.readdirSync('node_modules').filter(x => ['.bin'].indexOf(x) === -1);

const wbConfig = {
  entry: './src/server/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist/server'),
    filename: 'index.js'
  },
  node: {
    __dirname: true,
    __filename: true
  },
  
  externals: [
    (context, request, callback) => {
      const pathStart = request.split('/')[0];
      if (nodeModules.indexOf(pathStart) >= 0 && request !== 'webpack/hot/signal.js') {
        return callback(null, `commonjs ${request}`);
      }
      callback();
    }
  ],

  resolve: {
    modules: ['node_modules', 'src/server/**/*', './'],
    extensions: ['.js', '.jsx', '.json']
  },
  
  module: {
    loaders: [{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] }],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      }
    ]
  }
};

module.exports = wbConfig;
