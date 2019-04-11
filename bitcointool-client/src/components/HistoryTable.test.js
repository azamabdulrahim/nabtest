import React from "react";
import { shallow } from "enzyme";
import HistoryTable from "./HistoryTable";

describe("HistoryTable", () => {
  let wrapper;

  it("renders correctly with no data", () => {
    wrapper = shallow(<HistoryTable />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("table").length).toEqual(0);
  });

  it("renders correctly with data", () => {
    const history = [
      {
        currency: "BTC",
        date: "20180507",
        quotes: [
          {
            time: "1025",
            price: "2.03"
          },
          {
            time: "1200",
            price: "2.45"
          },
          {
            time: "1430",
            price: "2.30"
          }
        ]
      },
      {
        currency: "ETC",
        date: "20180507",
        quotes: [
          {
            time: "0915",
            price: "1.23"
          },
          {
            time: "1130",
            price: "1.45"
          }
        ]
      }
    ];

    wrapper = shallow(<HistoryTable history={history} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("table").length).toEqual(1);
    expect(wrapper.find("tr").length).toEqual(6);
    expect(
      wrapper.containsMatchingElement(
        <tr>
          <td>BTC</td>
          <td>20180507</td>
          <td>1025</td>
          <td>2.03</td>
        </tr>
      )
    ).toBeTruthy();
    expect(
      wrapper.containsMatchingElement(
        <tr>
          <td>ETC</td>
          <td>20180507</td>
          <td>1130</td>
          <td>1.45</td>
        </tr>
      )
    ).toBeTruthy();
  });
});
