const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const srcPath = path.resolve(__dirname, "./client/demo");
const distPath = path.resolve(__dirname, "./dist/public/assets");

module.exports = {
    context: srcPath,
    entry:
    {
        vendor: ["./common/vendor"],
        demo: ["./index"]
    },
    output:
    {
        path: distPath,
        publicPath: "/assets",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    resolve:
    {
        extensions: [".js", ".jsx"]
    },
    module:
    {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["es2015", { "modules": false }],
                                "react",
                                "stage-2"
                            ]
                        }
                    }
                ]
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
                            name: "res/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 8192,
                            mimetype: "application/font-woff",
                            name: "res/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([distPath]),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
