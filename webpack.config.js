const path = require('path');

module.exports = {
  mode: 'development', // Or 'production' when deploying your application
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.resolve(__dirname, 'client/src/components'),
      '@pages': path.resolve(__dirname, 'client/src/pages'),
      '@utils': path.resolve(__dirname, 'client/src/utils'),
    },
  },
};
