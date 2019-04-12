import React from "react";
import { shallow } from "enzyme";
import BitCoinProfitAnalyzer from "./BitCoinProfitAnalyzer";

describe("BitCoinProfitAnalyzer", () => {
  let wrapper;

  it("initializes correctly with no result shown", () => {
    wrapper = shallow(<BitCoinProfitAnalyzer />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("form").length).toEqual(1);
    expect(wrapper.find("#currency").length).toEqual(1);
    expect(wrapper.find("#date").length).toEqual(1);
    expect(wrapper.find("#results").length).toEqual(0);
  });

  it("updates component states when inputs change", () => {
    wrapper = shallow(<BitCoinProfitAnalyzer />);

    let refresh = wrapper.state().refresh;
    let currency = wrapper.state().currency;
    let date = wrapper.state().date;

    //test initial states
    expect(refresh).toBeFalsy();
    expect(currency).toEqual("");
    expect(date).toBeUndefined();

    wrapper
      .find("#currency")
      .simulate("change", { target: { name: "currency", value: "BTC" } });

    currency = wrapper.state().currency;
    expect(currency).toEqual("BTC");
    refresh = false; //reset
    refresh = wrapper.state().refresh;
    expect(refresh).toBeFalsy();

    wrapper
      .find("#currency")
      .simulate("change", { target: { name: "currency", value: "ETC" } });
    currency = wrapper.state().currency;
    expect(currency).toEqual("ETC");
    refresh = false; //reset
    refresh = wrapper.state().refresh;
    expect(refresh).toBeFalsy();

    wrapper
      .find("#date")
      .simulate("change", { target: { name: "date", value: "10-04-2019" } });

    date = wrapper.state().date;
    expect(date).toEqual("10-04-2019");
    refresh = false; //reset
    refresh = wrapper.state().refresh;
    expect(refresh).toBeFalsy();

    wrapper
      .find("#date")
      .simulate("change", { target: { name: "date", value: "11-04-2019" } });
    date = wrapper.state().date;
    expect(date).toEqual("11-04-2019");
    refresh = false; //reset
    refresh = wrapper.state().refresh;
    expect(refresh).toBeFalsy();
  });

  it("sets state.refresh to true and renders results when form is valid and submitted", () => {
    wrapper = shallow(<BitCoinProfitAnalyzer />);

    wrapper
      .find("#date")
      .simulate("change", { target: { name: "date", value: "10-04-2019" } });

    wrapper.find("form").simulate("submit", {
      preventDefault: () => {}
    });
    let refresh = wrapper.state().refresh;
    expect(refresh).toBeTruthy();

    wrapper.update();
    expect(wrapper.find("#results").length).toEqual(1);
  });
});
