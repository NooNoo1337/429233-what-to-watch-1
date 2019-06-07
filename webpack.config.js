const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, `./src`)
    },
    extensions: [`.ts`, `.tsx`, `.js`, `json`]
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    historyApiFallback: true,
    compress: false,
    port: 1337,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },

  devtool: `source-map`
};
