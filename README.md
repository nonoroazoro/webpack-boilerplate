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


## Steps to Enable HMR with State Preserved

1. Create a webpack config file for **development**, such as `scripts/webpack/webpack.config.dev.js`.

    1. Add `webpack-hot-middleware/client` to each `entry` as **the first** entry point:

        ```javascript
        for (const key of Object.keys(config.entry))
        {
            config.entry[key].unshift("webpack-hot-middleware/client");
        }
        ```

        Note that the `react-hot-loader/patch` is no longer required, [see here](https://github.com/gaearon/react-hot-loader#no-patch-required).

    1. ​Add `HotModuleReplacementPlugin` to `plugins`:

        ```javascript
        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        ```

1. Setup `react-hot-loader` in your root component, such as `src/demo/components/Root.jsx` (**This will not preserve state yet!**):

    ```javascript
    // Add hook to auto re-render the root component.
    export default hot(module)(Root);
    ```

    Note that the `AppContainer` is no longer recommended, instead we use the new `hot` api now, [see here](https://github.com/gaearon/react-hot-loader#appcontainer-vs-hot).

    Therefore, don't forget to remove the `AppContainer` in your webpack entry file, such as `src/demo/index.jsx`.

1. Create a babel config file, such as `.babelrc`.

    1. Add `react-hot-loader/babel` plugin to properly propagate the hot updates (**Finally, this will preserve state!**):

        ```javascript
        "plugins": [
            "react-hot-loader/babel"
        ]
        ```

    1. Add `presets` to compile ES2015 and React codes:

        ```javascript
        "presets": [
            [
                "env",
                {
                    "targets": {
                        "browsers": [
                            "last 2 versions",
                            "safari >= 7"
                        ]
                    },
                    "modules": false,
                    "useBuiltIns": true
                }
            ],
            "stage-2",
            "react"
        ]
        ```

1. Create an [Express](https://expressjs.com/) app as our dev server, such as `lib/app.js` (or you can use [webpack-dev-server](https://github.com/webpack/webpack-dev-server) instead of `Express`).

    1. Add `webpack-dev-middleware` and `webpack-hot-middleware` to enable HMR of server rendering:

        ```javascript
        const webpack = require("webpack");
        const webpackDevMiddleware = require("webpack-dev-middleware");
        const webpackHotMiddleware = require("webpack-hot-middleware");

        const devConfig = require("../../scripts/webpack/webpack.config.dev");

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

        app.use(devMiddleware);
        app.use(webpackHotMiddleware(compiler));
        ```


## Unsolved issue

- Due to an [issue](https://github.com/gaearon/react-hot-loader/issues/391) of react-hot-loader, `this` isn't correctly bound while using `arrow functions` as class properties.
