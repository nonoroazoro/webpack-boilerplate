const webpack = require("webpack");
const config = require("./webpack.base.config");

config.module.rules.push(
    {
        enforce: "pre",
        test: /\.jsx?$/,
        use: ["eslint-loader"],
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
    },
    {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
    }
);

config.plugins.push(
    new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        exclude: ["vendor.js"]
    })
);

// HMR.
// config.module.loaders[0].loaders.unshift("react-hot");
// for (const key of Object.keys(config.entry))
// {
//     config.entry[key].push("webpack-hot-middleware/client?reload=true");
// }
// config.plugins.push(
//     new webpack.HotModuleReplacementPlugin()
// );

module.exports = config;
