import React from "react";
import { shallow } from "enzyme";
import BestProfitTable from "./BestProfitTable";

describe("BestProfitTable", () => {
  let wrapper;
  it("renders correctly with no data", () => {
    wrapper = shallow(<BestProfitTable />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("table").length).toEqual(0);
  });

  it("renders correctly with data", () => {
    const data = {
      date: "07/05/2018",
      currency: "BTC",
      buy: {
        time: "09:30 AM",
        price: "2.30"
      },
      sell: {
        time: "04:30 PM",
        price: "2.58"
      },
      profit: "0.28"
    };

    wrapper = shallow(<BestProfitTable data={data} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.containsMatchingElement(<span>No data</span>)).toBeFalsy();
    expect(wrapper.find("table").length).toEqual(1);
    expect(wrapper.html().search("07/05/2018")).toBeGreaterThan(0);
    expect(wrapper.html().search("BTC")).toBeGreaterThan(0);
    expect(wrapper.html().search("09:30 AM")).toBeGreaterThan(0);
    expect(wrapper.html().search("04:30 PM")).toBeGreaterThan(0);
    expect(wrapper.html().search("2.30")).toBeGreaterThan(0);
    expect(wrapper.html().search("2.58")).toBeGreaterThan(0);
    expect(wrapper.html().search("0.28")).toBeGreaterThan(0);
  });
});
