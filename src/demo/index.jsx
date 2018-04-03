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

// Add hook to auto re-render the root component.
if (module.hot)
{
    module.hot.accept("./components/Root", renderRoot);
}
