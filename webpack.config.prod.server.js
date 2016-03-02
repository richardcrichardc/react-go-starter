var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: "../client/server.js",
  target: "node",
  output: {
    path: "../prod/",
    filename: "server.js"
  },
  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin("style.css", { allChunks: true })
  ],
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query : {
          presets: ['react', 'es2015'],
          plugins: ['transform-class-properties', 'transform-object-rest-spread']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=10000' }
    ]
  }
};