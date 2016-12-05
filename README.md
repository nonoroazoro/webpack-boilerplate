# webpack-2-boilerplate


## Based on:

- babel
- react
- react-hot-loader (v3)
- webpack (v2)
- webpack-dev-middleware
- webpack-hot-middleware
- express


## Enabling HMR:

1. Create Webpack config for **development**, such as `webpack.dev.config.js`.

    1. Add `react-hot-loader/patch` and `webpack-hot-middleware/client` to `entry` as **the first two** entry points:

        ```javascript
        for (const key of Object.keys(config.entry))
        {
            config.entry[key].unshift(
                "react-hot-loader/patch",
                "webpack-hot-middleware/client"
            );
        }
        ```

    2. ​Add `HotModuleReplacementPlugin` to `plugins`:

        ```javascript
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
        ```

2. Create Webpack entry file, such as `client/demo/index.jsx`.

    1. Use `react-hot-loader`'s `AppContainer` to replace the root component:

        ```javascript
        function renderRoot()
        {
            render(
                <AppContainer>
                    <App />
                </AppContainer>,
                document.getElementById("root")
            );
        }
        ```

    2. Add `module.hot` hook to auto re-render your root component (**This will not preserve state yet!**):

        ```javascript
        // HMR to preserve React's state.
        if (module.hot)
        {
            module.hot.accept("./components/App", renderRoot);
        }
        ```

3. Create `.babelrc` file, such as `client/demo/index.jsx`.

    1. Add `react-hot-loader/babel` plugin to enable HMR for React (**Finally, this will preserve state!**):

        ```javascript
        "plugins": [
            "react-hot-loader/babel"
        ]
        ```

    2. Add `presets` to compile ES2015 and React codes:

        ```json
        "presets": [
            "es2015",   // for ES2015
            "stage-2",  // for "draft" spec
            "react"     // for React
        ],
        ```

    3. Note that because Webpack 2 has built-in support for ES2015 modules, you won't need to re-require your app root in `module.hot.accept`. To make this work, you need to opt out of Babel transpiling ES2015 modules by changing the Babel ES2015 preset to be:

        ```json
        "presets": [
            [ "es2015", { "modules": false } ], // here changes
            "stage-2",
            "react"
        ],
        ```

3. Create express app, such as `server/app.js`.

    1. Add `webpack-dev-middleware` and `webpack-hot-middleware` to enable HMR of server rendering:

        ```javascript
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
        app.use(webpackDevMiddlewareInstance);
        app.use(webpackHotMiddleware(compiler));
        ```
