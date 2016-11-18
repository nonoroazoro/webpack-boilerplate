import "./res/App.less";

import React, { PureComponent, PropTypes } from "react";

export default class App extends PureComponent
{
    static defaultProps = {
        name: "World"
    };

    static propTypes = {
        name: PropTypes.string
    };

    state = {
        clicked: 0
    };

    clickHandler()
    {
        this.setState(Object.assign(
            {},
            this.state,
            {
                clicked: this.state.clicked + 1
            }
        ));
    }

    render()
    {
        return (
            <div className="App">
                <p>Hello {this.props.name}!</p>
                <button onClick={() => this.clickHandler()}>
                    {`Click: ${this.state.clicked}`}
                </button>
            </div>
        );
    }
}
