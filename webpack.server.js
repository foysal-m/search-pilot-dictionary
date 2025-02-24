const path = require("path");
const externals = require("webpack-node-externals");

module.exports = {
  target: "node", // Target Node.js environment
  entry: "./server/server.tsx", // Entry point for server-side code
  // mode: "production", // Set mode to production for optimized output
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "server.js", // Output file for the server-side code
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Handle these file types
  },
  externals: [externals()], // Exclude node_modules from the bundle
  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/, // Match JavaScript and TypeScript files
        exclude: /node_modules/,
        use: {
          loader: "ts-loader", // Use ts-loader for TypeScript and JSX
        },
      },
      // Ignore CSS and SCSS files on the server since you don't need them bundled in SSR
      {
        test: /\.css$/,
        use: "ignore-loader", // Ignore CSS files on the server-side
      },
      {
        test: /\.scss$/,
        use: "ignore-loader", // Ignore SCSS files on the server-side
      },
    ],
  },
};
