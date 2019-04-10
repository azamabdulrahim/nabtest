import React, { Component } from "react";

class BestProfit extends Component {
  render() {
    const { data } = this.props;

    let display;
    if (data) {
      display = (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th colspan="2">{data.date}</th>
            </tr>
            <tr className="table-active">
              <td colspan="2">{data.currency}</td>
            </tr>
            <tr>
              <td>Buy</td>
              <td>Sell</td>
            </tr>
            <tr>
              <td>${data.buy.price}</td>
              <td>${data.sell.price}</td>
            </tr>
            <tr>
              <td>{data.buy.time}</td>
              <td>{data.sell.time}</td>
            </tr>
            <tr>
              <td colspan="2">Profit: ${data.profit}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      display = <div>No data</div>;
    }

    return <div>{display}</div>;
  }
}

export default BestProfit;
