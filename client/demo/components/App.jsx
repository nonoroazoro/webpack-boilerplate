import classNames from "classnames";
import React, { PureComponent, PropTypes } from "react";

import styles from "./res/App.less";

export default class App extends PureComponent
{
    static defaultProps = {
        className: "",
        name: "World"
    };

    static propTypes = {
        className: PropTypes.string,
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
            <div className={classNames(styles.root, this.props.className)}>
                <p className={styles.title}>Hello {this.props.name}!</p>
                <button onClick={(e) => this.clickHandler(e)}>
                    {`Click: ${this.state.clicked}`}
                </button>
            </div>
        );
    }
}
