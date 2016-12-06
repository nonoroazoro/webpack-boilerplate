import React from "react";
import { render } from "react-dom";

import App from "./components/App";
import { AppContainer } from "react-hot-loader";

import "./res/index.less";

function renderRoot()
{
    render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.getElementById("root")
    );
}

renderRoot();

// HMR to preserve React's state.
if (module.hot)
{
    module.hot.accept("./components/App", renderRoot);
}
