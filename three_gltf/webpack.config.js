const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { title } = require("process");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: { index: "./src/index.js", prototype: "./src/prototype.js"},
  mode: "development",
  devServer: {
    open: true,
  },
  module: {
    rules: [
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".scss"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      title: "artEcho Home",
      excludeChunks: ["prototype"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/prototype.html",
      title: "artEcho prototype",
      filename: "prototype.html",
      excludeChunks: ["index"],
      Chunks: ["prototype","audioManager"],
    }),
  ],
};
