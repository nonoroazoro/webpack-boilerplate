import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";

import Root from "./components/Root";

import "./res/index.less";

function renderRoot()
{
    render(
        <AppContainer>
            <Root />
        </AppContainer>,
        document.getElementById("root")
    );
}

renderRoot();

// HMR to preserve React's state.
if (module.hot)
{
    module.hot.accept("./components/Root", renderRoot);
}
