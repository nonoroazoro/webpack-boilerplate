const path = require("path");
const helmet = require("helmet");
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const compression = require("compression");

const viewsPath = path.resolve(__dirname, "./views");
const faviconPath = path.join(viewsPath, "./res/img/favicon.png");
const publicPath = path.resolve(__dirname, "../dist/public");
const assetsPath = path.join(publicPath, "assets", "assets.json");

const routes = require("./routes");

// init express.
const app = express();
const isDevMode = app.get("env") !== "production";

// view engine setup.
app.set("views", viewsPath);
app.set("view engine", "pug");

// security setup.
app.use(helmet());

// gzip setup.
app.use(compression());

// favicon setup.
app.use(favicon(faviconPath));

// body parser setup.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// dev setup.
if (isDevMode)
{
    // development: logger & HMR setup.
    const { blue } = require("chalk");
    console.log(blue("Current Environment:", "development"));

    const logger = require("morgan");
    app.use(logger("dev"));

    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackHotMiddleware = require("webpack-hot-middleware");
    const webpackDevConfig = require("../webpack.dev.config");
    const compiler = webpack(webpackDevConfig);
    const webpackDevMiddlewareInstance = webpackDevMiddleware(
        compiler,
        {
            stats:
            {
                chunks: false,
                colors: true
            },
            publicPath: webpackDevConfig.output.publicPath
        }
    );
    webpackDevMiddlewareInstance.waitUntilValid(() =>
    {
        // assets map setup.
        app.locals.map = require(assetsPath);
    });
    app.use(webpackDevMiddlewareInstance);
    app.use(webpackHotMiddleware(compiler));
}
else
{
    // production: assets map setup.
    app.locals.map = require(assetsPath);
}

// static file setup.
app.use(express.static(publicPath, { maxAge: "1y" }));

// router setup.
app.use("/", routes);

// catch 404 and forward to global error handler.
app.use((req, res, next) =>
{
    const err = new Error("404 Not Found");
    err.status = 404;
    next(err);
});

// global error handler.
app.use((err, req, res, next) =>
{
    const status = err.status | 500;
    if (isDevMode)
    {
        res.status(status).send(err);
    }
    else
    {
        res.status(status).send(`Error ${status}.`);
    }
});

module.exports = app;
