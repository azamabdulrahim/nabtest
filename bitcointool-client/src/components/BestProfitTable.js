import React, { Component } from "react";

class BestProfitTable extends Component {
  render() {
    const { data } = this.props;

    let display;
    if (data) {
      display = (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th colSpan="2">{data.date}</th>
            </tr>
            <tr className="table-active">
              <td colSpan="2">{data.currency}</td>
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
              <td colSpan="2">Profit: ${data.profit}</td>
            </tr>
          </tbody>
        </table>
      );
    }

    return <div>{display}</div>;
  }
}

export default BestProfitTable;
