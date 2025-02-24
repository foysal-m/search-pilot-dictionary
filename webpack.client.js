const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"), // output directory
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"], // resolve these file extensions
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // regex to match .ts and .tsx files
        use: "babel-loader", // use babel-loader to transpile TypeScript
        exclude: /node_modules/, // don't process node_modules
      },
      {
        test: /\.js$/, // for regular JavaScript files (React components etc.)
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    static: path.join(__dirname, "dist"), // serve static files
    port: 3000, // your server port
  },
};
