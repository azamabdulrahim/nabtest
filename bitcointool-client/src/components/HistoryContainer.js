import React, { Component } from "react";
import { connect } from "react-redux";
import { getHistory } from "../actions/historyActions";
import PropTypes from "prop-types";
import HistoryTable from "./HistoryTable";

export class HistoryContainer extends Component {
  componentDidMount() {
    const { refresh, date, currency } = this.props;

    if (refresh && date) {
      this.props.getHistory(date, currency);
    }
  }
  render() {
    let displayResult;
    let history;

    if (this.props.history) {
      history = this.props.history.history;
    }

    if (history && history.length > 0) {
      displayResult = <HistoryTable history={history} />;
    } else {
      displayResult = <span>No data</span>;
    }

    return (
      <div>
        <p />
        <h2>Price History</h2>
        {displayResult}
      </div>
    );
  }
}

HistoryContainer.propTypes = {
  history: PropTypes.object,
  getHistory: PropTypes.func,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  history: state.history,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getHistory }
)(HistoryContainer);
