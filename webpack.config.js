const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
    filename: 'bundle.js', // Output filename
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
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
        use: ['style-loader', 'css-loader'], // Add CSS loader support
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Add support for resolving .jsx file extensions
    alias: {
      // Define aliases for commonly used paths in your project
      '@components': path.resolve(__dirname, 'client/src/components'),
      '@pages': path.resolve(__dirname, 'client/src/pages'),
      '@utils': path.resolve(__dirname, 'client/src/utils'),
      // Add more aliases as needed for other directories
    },
  },
};
