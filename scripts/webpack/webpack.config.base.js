const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname, "../../");
const SRC_PATH = path.resolve(ROOT_PATH, "./src/demo");
const BUILD_PATH = path.join(ROOT_PATH, "./dist/public/assets");

module.exports = {
    context: SRC_PATH,
    entry: {
        vendor: ["./common/vendor"],
        demo: ["./index"]
    },
    devtool: "source-map",
    output: {
        path: BUILD_PATH,
        publicPath: "/assets/",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: "vendor",
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/
                }
            }
        }
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: { cacheDirectory: true }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            name: "res/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            mimetype: "application/font-woff",
                            name: "res/fonts/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                    [
                        {
                            loader: "file-loader",
                            options: {
                                limit: 8192,
                                mimetype: "application/font-woff",
                                name: "res/fonts/[name].[ext]"
                            }
                        }
                    ]
            }
        ]
    },
    plugins: [
        new AssetsPlugin({
            filename: "assets.json",
            path: BUILD_PATH
        })
    ],
    stats: {
        children: false,
        modules: false
    }
};
