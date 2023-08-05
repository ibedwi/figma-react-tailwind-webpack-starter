const path = require("path");
/** Plugin for creating a HTML file for the bundle */
const HtmlWebpackPlugin = require("html-webpack-plugin");
/** Plugin for inlining the bundle in the HTML file */
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");

module.exports = (env, argv) => ({
  mode: argv.mode === "production" ? "production" : "development",
  devtool: argv.mode === "production" ? false : "inline-source-map",

  /**
   * Since we all of our code is in the `src` directory, this line allows us to
   * resolving entry point based on `src` directory.
   *
   * Ref: https://webpack.js.org/configuration/entry-context/#context
   */
  context: path.resolve(__dirname, "src"),

  /**
   * Since our Figma plugin has two files, one for the "backend" (logic) and one
   * for the UI, we need to add them here.
   *
   * Ref: https://webpack.js.org/configuration/entry-context/#entry
   */
  entry: {
    ui: "./app/app.tsx",
    code: "./code.ts",
  },

  /**
   * Options for how each module is treated. Different types might be treated differently..
   * Ref: https://webpack.js.org/configuration/module
   */
  module: {
    rules: [
      /**
       * Converts TypeScript code (.ts, .tsx) to JavaScript.
       *
       * Ref: https://webpack.js.org/guides/typescript/
       */
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      /**
       * Enables including CSS by doing "import './file.css'" in your TypeScript code.
       * `postcss-loader` enable TailwindCSS support.
       */
      {
        test: /\.css$/,
        use: ["style-loader", { loader: "css-loader" }, "postcss-loader"],
      },
    ],
  },

  /**
   * Automatically resolve certain extensions if we omit the file extension on import.
   * For example: `import App from './App'` will be resolved as `import App from './App.tsx'`
   *
   * Ref: https://webpack.js.org/configuration/resolve/#resolveextensions
   */
  resolve: { extensions: [".tsx", ".ts", ".jsx", ".js"] },

  /**
   * Options to configure the output of the compilation.
   *
   * Ref: https://webpack.js.org/configuration/output
   */
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"), // Compile into a folder called "dist"
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "ui.html",
      chunks: ["ui"],
      cache: false,
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
});
