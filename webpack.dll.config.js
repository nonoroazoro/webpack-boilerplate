const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const distPath = path.resolve(__dirname, "./dist/public/vendor/");

module.exports = {
    entry:
    {
        vendor: [
            "normalize.css",
            "prop-types",
            "react",
            "react-dom",
            "react-router",
            "react-router-dom"
        ]
    },
    output:
    {
        path: distPath,
        filename: "[name].[chunkhash:8].js",
        library: "[name]"
    },
    resolve:
    {
        extensions: [".js", ".jsx"]
    },
    module:
    {
        rules:
        [
            {
                test: /\.jsx?$/,
                use:
                [
                    {
                        loader: "babel-loader",
                        options: { cacheDirectory: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        use: ["css-loader"],
                        fallback: "style-loader"
                    }
                )
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(
                    {
                        use: ["css-loader", "less-loader"],
                        fallback: "style-loader"
                    }
                )
            },
            {
                test: /\.(png|jpg)$/,
                use:
                [
                    {
                        loader: "url-loader",
                        options:
                        {
                            limit: 8192,
                            name: "res/[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use:
                [
                    {
                        loader: "url-loader",
                        options:
                        {
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
                        options:
                        {
                            limit: 8192,
                            mimetype: "application/font-woff",
                            name: "res/fonts/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins:
    [
        new CleanWebpackPlugin([distPath], { verbose: false }),
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new webpack.DllPlugin({
            path: path.join(distPath, "[name].manifest.json"),
            name: "[name]"
        }),
        new ExtractTextPlugin({
            filename: "res/[name].[contenthash:8].css",
            allChunks: true,
            ignoreOrder: true
        }),
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify("production") }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ],
    stats:
    {
        children: false,
        maxModules: 0
    }
};
