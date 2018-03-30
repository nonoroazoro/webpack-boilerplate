import React from "react";
import { shallow } from "enzyme";

import App from "../App";

test("App renders correctly.", () =>
{
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
});

test("App renders correctly when className is set.", () =>
{
    const wrapper = shallow(<App className="home" />);
    expect(wrapper).toMatchSnapshot();
});

test("App changes the text of button after click.", () =>
{
    const wrapper = shallow(<App />);
    expect(wrapper.find("button").text()).toEqual("Click: 0");

    wrapper.find("button").simulate("click");
    expect(wrapper.state("clicked")).toEqual(1);
    expect(wrapper.find("button").text()).toEqual("Click: 1");
});
