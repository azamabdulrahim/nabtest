import React, { Component } from "react";
import BestProfitContainer from "./BestProfitContainer";
import HistoryContainer from "./HistoryContainer";

class BitCoinProfitAnalyzer extends Component {
  constructor() {
    super();

    this.state = {
      currency: "",
      date: undefined,
      refresh: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ refresh: false });
  }

  onSubmit(e) {
    e.preventDefault();
    let { date } = this.state;
    if (!date) {
      alert("Please select date");
    } else {
      this.setState({ refresh: true });
    }
  }

  render() {
    let { refresh, date, currency } = this.state;
    let displayResult;
    if (refresh) {
      date = date.replace(/-/g, "");
      displayResult = (
        <div>
          <HistoryContainer date={date} currency={currency} refresh={refresh} />
          <BestProfitContainer
            date={date}
            currency={currency}
            refresh={refresh}
          />
        </div>
      );
    } else {
      displayResult = <div />;
    }

    return (
      <div>
        <div className="col-md-4 m-auto">
          <h1 className="text-center">Best Profit Calculator</h1>
          <hr />
          <form onSubmit={this.onSubmit}>
            <div className="form-group text-left">
              <label htmlFor="currency">Currency</label>
              <div>
                <select
                  id="currency"
                  name="currency"
                  className="form-control"
                  value={this.state.currency}
                  onChange={this.onChange}
                >
                  <option value="">All</option>
                  <option value="BTC">BTC</option>
                  <option value="ETC">ETC</option>
                  <option value="LTC">LTC</option>
                </select>
              </div>
            </div>
            <div className="form-group text-left">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                className="form-control"
                name="date"
                value={this.state.date}
                onChange={this.onChange}
              />
            </div>

            <input type="submit" className="btn btn-primary" />
          </form>
          {displayResult}
        </div>
      </div>
    );
  }
}

export default BitCoinProfitAnalyzer;
