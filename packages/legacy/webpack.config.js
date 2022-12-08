const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackLiveReloadPlugin = require("webpack-livereload-plugin");
const path = require("path");
// const { EnvironmentPlugin } = require("webpack");
const DotenvWebpackPlugin = require("dotenv-webpack");

const entrypoints = ["./dashboard/index.tsx", "./graphics/index.tsx"];
const pages = [
  "eventsList",
  "eventPicker",
  "logoMark",
  "timer",
  "doovde",
  "spotify",
  "sidePopup",
  "live",
  "all",
];

const SRC = path.resolve(__dirname, "src");

const NODECG = path.resolve(
  "..",
  "..",
  "nodecg",
  "bundles",
  "royalhackaway-overlay"
);

const configs = ({ environment = "development" }) => {
  return [
    {
      entry: path.resolve(SRC, "index.js"),
      plugins: [
        new CopyWebpackPlugin({
          patterns: [path.resolve(SRC, "static")],
        }),
      ],
      output: {
        path: NODECG,
      },
    },
    {
      entry: path.resolve(SRC, "extension", "index.ts"),
      devtool: "source-map",
      context: path.resolve(SRC, "extension"),
      target: "node",
      module: {
        rules: [
          {
            test: /\.tsx?$/i,
            use: "babel-loader",
            exclude: /node_modules/,
          },
        ],
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      plugins: [
        new DotenvWebpackPlugin({
          path: "../../.env",
        }),
      ],
      output: {
        path: path.resolve(NODECG, "extension"),
        filename: "index.js",
        library: {
          type: "commonjs2",
        },
      },
    },
    ...entrypoints.map((entrypoint) => {
      const parsed = path.parse(entrypoint);

      return {
        mode: environment,
        devtool: "source-map",
        context: path.resolve(SRC, parsed.dir),
        entry: "./" + parsed.base,
        module: {
          rules: [
            {
              test: /\.tsx?$/i,
              use: "babel-loader",
              exclude: /node_modules/,
            },
            {
              test: /\.css$/i,
              use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
              test: /\.s[ac]ss$/i,
              use: [
                "style-loader",
                "css-loader",
                "postcss-loader",
                {
                  loader: "sass-loader",
                  options: {
                    sassOptions: {
                      includePaths: [path.resolve(SRC, parsed.dir, "scss")],
                    },
                  },
                },
              ],
            },
            {
              test: /\.(png|jpe?g|gif|svg|woff2?)$/i,
              use: [
                {
                  loader: "file-loader",
                },
              ],
            },
          ],
        },
        resolve: {
          extensions: [".tsx", ".ts", ".js"],
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: path.resolve(SRC, parsed.dir, "index.html"),
          }),
          ...pages.map(
            (page) =>
              new HtmlWebpackPlugin({
                template: path.resolve(SRC, parsed.dir, "index.html"),
                filename: page + ".html",
              })
          ),
          new WebpackLiveReloadPlugin({
            port: 0,
            appendScriptTag: true,
          }),
        ],
        output: {
          path: path.resolve(NODECG, parsed.dir),
        },
      };
    }),
  ];
};

module.exports = configs;
