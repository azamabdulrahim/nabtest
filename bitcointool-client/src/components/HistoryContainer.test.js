import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { HistoryContainer } from "./HistoryContainer";

describe("HistoryContainer", () => {
  // create any initial state needed
  const initialState = {};
  // here it is possible to pass in any middleware if needed into //configureStore
  const mockStore = configureStore();
  let wrapper;

  const store = mockStore(initialState);
  let mockGetHistory;

  beforeEach(() => {
    mockGetHistory = jest.fn();
  });

  it("renders correctly when refresh is false", () => {
    wrapper = shallow(
      <HistoryContainer store={store} getHistory={mockGetHistory} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<span>No data</span>)).toBeTruthy();
    expect(mockGetHistory.mock.calls.length).toBe(0);
  });

  it("renders correctly when refresh is true but date and currency not supplied", () => {
    const refresh = true;
    wrapper = shallow(
      <HistoryContainer
        store={store}
        refresh={refresh}
        getHistory={mockGetHistory}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<span>No data</span>)).toBeTruthy();
    expect(mockGetHistory.mock.calls.length).toBe(0);
  });

  it("renders correctly when refresh is true but date not supplied", () => {
    const refresh = true;
    const currency = "BTC";
    wrapper = shallow(
      <HistoryContainer
        store={store}
        refresh={refresh}
        currency={currency}
        getHistory={mockGetHistory}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<span>No data</span>)).toBeTruthy();
    expect(mockGetHistory.mock.calls.length).toBe(0);
  });

  it("renders correctly when refresh is true but currency not supplied", () => {
    const refresh = true;
    const date = "20180507";
    wrapper = shallow(
      <HistoryContainer
        store={store}
        refresh={refresh}
        date={date}
        getHistory={mockGetHistory}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("div").length).toEqual(1);
    expect(wrapper.containsMatchingElement(<span>No data</span>)).toBeTruthy();
    expect(mockGetHistory.mock.calls.length).toBe(0);
  });

  it("calls getHistory function and renders child components when refresh is true", () => {
    const mockGetHistory = jest.fn();
    const refresh = true;
    const currency = "BTC";
    const date = "20180507";
    const history = {
      history: [
        {
          date: "20180705",
          currency: "BTC",
          quotes: [
            {
              time: "09:30 AM",
              price: "2.30"
            }
          ]
        },
        {
          date: "07/05/2018",
          currency: "ETC",
          quotes: [
            {
              time: "08:30 AM",
              price: "1.30"
            },
            {
              time: "12:30 PM",
              price: "1.50"
            }
          ]
        }
      ]
    };

    wrapper = shallow(
      <HistoryContainer
        store={store}
        refresh={refresh}
        date={date}
        currency={currency}
        getHistory={mockGetHistory}
        history={history}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(mockGetHistory).toHaveBeenCalled();
    expect(wrapper.find("HistoryTable").length).toEqual(1);
  });
});
