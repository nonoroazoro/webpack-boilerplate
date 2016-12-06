import classNames from "classnames";
import React, { PureComponent, PropTypes } from "react";

import styles from "./res/App.less";

export default class App extends PureComponent
{
    static defaultProps = {
        name: "World"
    };

    static propTypes = {
        name: PropTypes.string,
        className: PropTypes.string
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
                <button onClick={() => this.clickHandler()}>
                    {`Click: ${this.state.clicked}`}
                </button>
            </div>
        );
    }
}
