const { blue } = require("chalk");
const logger = require("morgan");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const devConfig = require("../../scripts/webpack/webpack.config.dev");

/**
 * inject debug settings to express app.
 */
module.exports.inject = (app, options = {}) =>
{
    console.log(blue("Environment: development\n"));

    // set logger.
    app.use(logger("dev"));

    // set webpack.
    const compiler = webpack(devConfig);
    const devMiddleware = webpackDevMiddleware(
        compiler,
        {
            stats:
                {
                    children: false,
                    colors: true,
                    modules: false
                },
            publicPath: devConfig.output.publicPath
        }
    );
    devMiddleware.waitUntilValid(() =>
    {
        // assets map setup.
        app.locals.map = require(options.assetsPath);
    });

    app.use(devMiddleware);
    app.use(webpackHotMiddleware(compiler));
};
