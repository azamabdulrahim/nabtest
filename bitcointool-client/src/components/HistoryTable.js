import React, { Component } from "react";

class HistoryTable extends Component {
  render() {
    const { history } = this.props;

    let historyTable;

    if (history && history.length > 0) {
      historyTable = (
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Currency</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
            </tr>
            {history.map(data =>
              data.quotes.map(quote => (
                <tr>
                  <td>{data.currency}</td>
                  <td>{data.date}</td>
                  <td>{quote.time}</td>
                  <td>{quote.price}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      );
    }

    return <div>{historyTable}</div>;
  }
}

export default HistoryTable;
