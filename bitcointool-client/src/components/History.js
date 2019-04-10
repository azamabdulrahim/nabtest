import React, { Component } from "react";
import { connect } from "react-redux";
import { getHistory } from "../actions/historyActions";
import PropTypes from "prop-types";

class History extends Component {
  componentDidMount() {
    const { refresh, date, currency } = this.props;

    if (refresh) {
      this.props.getHistory(date, currency);
    }
  }
  render() {
    const { history } = this.props.history;
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
    } else {
      historyTable = <span>No data</span>;
    }

    return <div>{historyTable}</div>;
  }
}

History.propTypes = {
  history: PropTypes.object.isRequired,
  getHistory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  history: state.history,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getHistory }
)(History);
