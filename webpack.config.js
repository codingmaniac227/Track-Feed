const path = require('path');

module.exports = {
  entry: './src/index.js',        // Where Webpack starts bundling
  output: {
    filename: 'main.js',          // The bundled file
    path: path.resolve(__dirname, 'dist'),
    clean: true                   // Clears old files in dist/
  },
  module: {
    rules: [
      {
        test: /\.js$/,            // All .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Optional: if you use Babel for ES6+ support
        },
      },
      {
        test: /\.css$/,           // Bundle CSS files too
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  mode: 'development',            // Can be 'production' for minified output
};
