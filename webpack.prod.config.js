const webpack = require("webpack");
const config = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.output.filename = "[name].[chunkhash:8].js";
config.output.chunkFilename = "[id].[chunkhash:8].chunk.js";

config.module.rules.push(
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
            loader: "css-loader",
            fallbackLoader: "style-loader"
        })
    },
    {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
            loader: ["css-loader", "less-loader"],
            fallbackLoader: "style-loader"
        })
    }
);

config.plugins.push(
    new ExtractTextPlugin("res/[name].[contenthash:8].css"),
    new webpack.DefinePlugin({
        "process.env":
        {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress:
        {
            warnings: false
        }
    })
);

module.exports = config;
