import styles from "./index.less";

import classNames from "classnames";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";

/**
 * App Page.
 *
 * @export
 * @class App
 * @extends {PureComponent}
 */
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
        this.setState({
            ...this.state,
            clicked: this.state.clicked + 1
        });
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
