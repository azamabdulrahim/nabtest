import React, { Component } from "react";
import BestProfit from "./BestProfit";
import History from "./History";
import { getBestProfits } from "../actions/historyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      currency: "",
      date: null,
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
    let { date, currency } = this.state;
    if (!date) {
      alert("Please select date");
    } else {
      date = date.replace(/-/g, "");
      this.props.getBestProfits(date, currency);
      this.setState({ refresh: true });
    }
  }

  render() {
    let { refresh, date, currency } = this.state;
    const { bestProfits } = this.props.history;

    let displayResult;
    if (refresh) {
      if (bestProfits && bestProfits.length > 0) {
        date = date.replace(/-/g, "");
        displayResult = (
          <div>
            <p />
            <h5>History</h5>
            <History date={date} currency={currency} refresh={refresh} />
            <p />
            <h5>Best Profits</h5>
            {bestProfits.map(data => (
              <BestProfit key={data.currency} data={data} />
            ))}
          </div>
        );
      } else {
        displayResult = (
          <div>
            <p />
            <h5>History</h5>
            <p>No data</p>
            <p />
            <h5>Best Profits</h5>
            <p>No data</p>
          </div>
        );
      }
    } else {
      displayResult = <div />;
    }

    return (
      <div>
        <div className="col-md-4 m-auto">
          <h5 className="display-4 text-center">Best Profit Calculator</h5>
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

Home.propTypes = {
  history: PropTypes.object.isRequired,
  getBestProfits: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  history: state.history,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBestProfits }
)(Home);
