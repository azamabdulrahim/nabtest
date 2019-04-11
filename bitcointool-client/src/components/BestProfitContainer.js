import React, { Component } from "react";
import { getBestProfits } from "../actions/historyActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import BestProfitTable from "./BestProfitTable";

export class BestProfitContainer extends Component {
  componentDidMount() {
    const { refresh, date, currency } = this.props;

    if (refresh && date && currency) {
      this.props.getBestProfits(date, currency);
    }
  }

  render() {
    //const { bestProfits } = this.props.history;
    let displayResult;
    let bestProfits;
    if (this.props.history) {
      bestProfits = this.props.history.bestProfits;
    }

    if (bestProfits && bestProfits.length > 0) {
      displayResult = (
        <div>
          {bestProfits.map(data => (
            <BestProfitTable key={data.currency} data={data} />
          ))}
        </div>
      );
    } else {
      displayResult = <p>No data</p>;
    }

    return (
      <div>
        <p />
        <h2>Best Profits</h2>
        {displayResult}
      </div>
    );
  }
}

BestProfitContainer.propTypes = {
  history: PropTypes.object,
  getBestProfits: PropTypes.func,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  history: state.history,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getBestProfits }
)(BestProfitContainer);
