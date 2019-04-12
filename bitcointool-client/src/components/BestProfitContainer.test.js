import React from "react";
import { shallow, mount } from "enzyme";
import configureStore from "redux-mock-store";
import { BestProfitContainer } from "./BestProfitContainer";

describe("BestProfitContainer", () => {
  // create any initial state needed
  const initialState = {};
  // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore();
  let wrapper;

  const store = mockStore(initialState);
  const mockGetBestProfits = jest.fn();

  it("renders correctly when refresh is false", () => {
    wrapper = shallow(
      <BestProfitContainer store={store} getBestProfits={mockGetBestProfits} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<p>No data</p>)).toBeTruthy();
    expect(mockGetBestProfits.mock.calls.length).toBe(0);
  });

  it("renders correctly when refresh is true but date and currency not supplied", () => {
    const refresh = true;
    wrapper = shallow(
      <BestProfitContainer
        store={store}
        refresh={refresh}
        getBestProfits={mockGetBestProfits}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<p>No data</p>)).toBeTruthy();
    expect(mockGetBestProfits.mock.calls.length).toBe(0);
  });

  it("renders correctly when refresh is true but date not supplied", () => {
    const refresh = true;
    const currency = "BTC";
    wrapper = shallow(
      <BestProfitContainer
        store={store}
        refresh={refresh}
        currency={currency}
        getBestProfits={mockGetBestProfits}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<p>No data</p>)).toBeTruthy();
    expect(mockGetBestProfits.mock.calls.length).toBe(0);
  });

  it("renders correctly when refresh is true but currency not supplied", () => {
    const refresh = true;
    const date = "20180507";
    wrapper = shallow(
      <BestProfitContainer
        store={store}
        refresh={refresh}
        date={date}
        getBestProfits={mockGetBestProfits}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<p>No data</p>)).toBeTruthy();
    expect(mockGetBestProfits.mock.calls.length).toBe(1);
  });

  it("calls getBestProfits function and renders child components when refresh is true", () => {
    const mockGetBestProfits = jest.fn();
    const refresh = true;
    const currency = "BTC";
    const date = "20180507";
    const history = {
      bestProfits: [
        {
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
        },
        {
          date: "07/05/2018",
          currency: "ETC",
          buy: {
            time: "08:30 AM",
            price: "1.30"
          },
          sell: {
            time: "12:30 PM",
            price: "1.50"
          },
          profit: "0.20"
        }
      ]
    };

    wrapper = shallow(
      <BestProfitContainer
        store={store}
        refresh={refresh}
        date={date}
        currency={currency}
        getBestProfits={mockGetBestProfits}
        history={history}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(mockGetBestProfits).toHaveBeenCalled();
    expect(wrapper.find("BestProfitTable").length).toEqual(2);
  });
});
