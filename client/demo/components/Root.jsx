import styles from "./res/Root.less";

import React from "react";
import { BrowserRouter as Router, Route, NavLink as Link } from "react-router-dom";

import App from "./App";
import About from "./About";

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

                <hr />

                <Route exact path="/" component={App} />
                <Route exact path="/about" component={About} />
            </div>
        </Router>
    );
};

export default Root;
