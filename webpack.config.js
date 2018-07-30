const path = require("path");
const nodeExternals = require("webpack-node-externals");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// const serverConfig = {
//   target: "node",
//   mode: "development",
//   externals: [nodeExternals()],
//   entry: {
//     app: "./src/server/app",
//     index: "./src/server/index"
//   },
//   output: {
//     path: path.resolve(__dirname, "dist"),
//     filename: "[name].js"
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /(node_modules)/,
//         use: { loader: "babel-loader" }
//       }
//     ]
//   },
//   devServer: {
//     contentBase: path.join(__dirname, "dist"),
//     // compress: true,
//     port: 3000
//   },
// };

const clientConfig = {
  target: "web",
  mode: "development",
  entry: "./src/web/main.js",
  // externals: [nodeExternals()],
  devtool: "eval-source-map",
  output: {
    path: path.resolve(__dirname, ".build/static"),
    filename: "[name].js",
    publicPath: "/"
  },
  devServer: {
    contentBase: "./.build/static"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: { loader: "vue-loader" },
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file)
      },
      // { test: /\.js$/, use: { loader: "babel-loader" } },
      { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./src/web/index.html" }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "@": __dirname + "/src/web",
      Components: __dirname + "/src/web/components",
      controls: __dirname + "/src/web/components/controls"
    },
    symlinks: false
  }
};

module.exports = clientConfig;
