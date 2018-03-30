# webpack-boilerplate [![Dependency Status](https://david-dm.org/nonoroazoro/webpack-boilerplate.svg?style=flat-square)](https://david-dm.org/nonoroazoro/webpack-boilerplate) [![Build Status](https://travis-ci.org/nonoroazoro/webpack-boilerplate.svg?branch=master)](https://travis-ci.org/nonoroazoro/webpack-boilerplate)


## Based on

- babel
- react
- react-router (v4)
- react-hot-loader (v4)
- css-modules
- webpack (v4)
- webpack-dev-middleware
- webpack-hot-middleware
- express


## Testing

- jest
- enzyme


## Enabling HMR

1. Create a webpack config for **development**, such as `scripts/webpack/webpack.config.dev.js`.

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

    1. ​Add `HotModuleReplacementPlugin` to `plugins`:

        ```javascript
        config.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
        ```

1. Create the webpack entry file, such as `src/demo/index.jsx`.

    1. Use `react-hot-loader`'s `AppContainer` to replace the root component:

        ```javascript
        function renderRoot()
        {
            render(
                <AppContainer>
                    <Root />
                </AppContainer>,
                document.getElementById("root")
            );
        }
        ```

    1. Add `module.hot` hook to auto re-render your root component (**This will not preserve state yet!**):

        ```javascript
        // HMR to preserve React's state.
        if (module.hot)
        {
            module.hot.accept("./components/Root", renderRoot);
        }
        ```

1. Create `.babelrc` file, such as `src/demo/index.jsx`.

    1. Add `react-hot-loader/babel` plugin to enable HMR for React (**Finally, this will preserve state!**):

        ```javascript
        "plugins": [
            "react-hot-loader/babel"
        ]
        ```

    1. Add `presets` to compile ES2015 and React codes:

        ```javascript
        "presets": [
            "es2015",   // for ES2015
            "stage-2",  // for "draft" spec
            "react"     // for React
        ],
        ```

    1. Note that because Webpack 2 has built-in support for ES2015 modules, you won't need to re-require your app root in `module.hot.accept`. To make this work, you need to opt out of Babel transpiling ES2015 modules by changing the Babel ES2015 preset to be:

        ```javascript
        "presets": [
            [ "es2015", { "modules": false } ], // here changes
            "stage-2",
            "react"
        ],
        ```
        Note that disabling Babel's module plugin is not only necessary for HMR. If you don't disable it you'll run into many other issues (see [Migrating from v1 to v2](https://webpack.js.org/guides/migrating/) and [webpack-tree-shaking](http://www.2ality.com/2015/12/webpack-tree-shaking.html)).

1. Create express app, such as `lib/app.js`.

    1. Add `webpack-dev-middleware` and `webpack-hot-middleware` to enable HMR of server rendering:

        ```javascript
        const webpack = require("webpack");
        const webpackDevMiddleware = require("webpack-dev-middleware");
        const webpackHotMiddleware = require("webpack-hot-middleware");
        const webpackDevConfig = require("../../scripts/webpack/webpack.config.dev");
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

## Unsolved issue

- Due to an [issue](https://github.com/gaearon/react-hot-loader/issues/391) of react-hot-loader, `this` isn't correctly bound while using arrow functions as class properties.
