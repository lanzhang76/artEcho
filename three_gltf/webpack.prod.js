const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: { index: "./src/index.js", prototype: "./src/prototype.js" },
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
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".scss"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Production",
    }),
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
      Chunks: ["prototype", "audioManager"],
    }),
    new CopyPlugin({
      patterns: [
        { from: "audio", to: "audio" },
        { from: "draco", to: "draco" },
        { from: "img", to: "img" },
        { from: "models", to: "models" },
      ],
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
