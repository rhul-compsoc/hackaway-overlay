const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackLiveReloadPlugin = require("webpack-livereload-plugin");
const path = require("path");
const { EnvironmentPlugin } = require("webpack");

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
];

const SRC = path.resolve(__dirname, "src");

const NODECG = path.resolve(
  __dirname,
  "nodecg",
  "bundles",
  "royalhackaway-overlay"
);

const configs = [
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
      new EnvironmentPlugin(["SPOTIFY_CLIENT_SECRET", "SPOTIFY_CLIENT_ID"]),
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
      mode: "development",
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

module.exports = configs;
