const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");
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
        publicPath: "/assets/",
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
                use: ["babel-loader"],
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
        new AssetsPlugin({
            filename: "assets.json",
            path: distPath,
            prettyPrint: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
