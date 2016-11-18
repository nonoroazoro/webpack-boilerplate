import "./res/index.less";

import React from "react";
import { render } from "react-dom";

import App from "./components/App";
import { AppContainer } from "react-hot-loader";

render(
    <AppContainer>
        <App name="Jack" />
    </AppContainer>,
    document.getElementById("root")
);

if (module.hot)
{
    module.hot.accept("./components/App", () =>
    {
        const NextApp = require("./components/App");
        render(
            <AppContainer>
                <NextApp name="Jack" />
            </AppContainer>,
            document.getElementById("root")
        );
    });
}
