import React from "react";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router, Route, Switch, NavLink as Link } from "react-router-dom";

import App from "./App";
import About from "./About";

import styles from "./res/Root.less";

/**
 * Root (layout).
 *
 * @export
 */
const Root = () =>
{
    return (
        <Router>
            <div>
                <ul className={styles.list}>
                    <li><Link exact to="/" activeClassName={styles.active}>App</Link></li>
                    <li><Link exact to="/about" activeClassName={styles.active}>About</Link></li>
                </ul>

                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/about" component={About} />
                </Switch>
            </div>
        </Router>
    );
};

// Add hook to auto re-render the root component.
export default hot(module)(Root);
