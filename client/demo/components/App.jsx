import "./res/App.less";

import React from "react";

let count = 0;

export default (p_props) =>
{
    const clickHandler = () =>
    {
        count++;
        console.log(count);
    };

    return (
        <div className="App" onClick={clickHandler}>
            AAA {p_props.name}
        </div>
    );
};
