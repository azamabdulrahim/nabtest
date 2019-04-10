import axios from "axios";
import { GET_ERRORS, GET_BEST_PROFITS, GET_HISTORY } from "./types";

export const getBestProfits = (date, currency) => async dispatch => {
  try {
    let res;
    if (!currency || currency.length === 0) {
      res = await axios.get(`/api/history/getBestProfit/${date}`);
    } else {
      res = await axios.get(`/api/history/getBestProfit/${date}/${currency}`);
    }
    dispatch({
      type: GET_BEST_PROFITS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getHistory = (date, currency) => async dispatch => {
  try {
    let res;
    if (!currency || currency.length === 0) {
      res = await axios.get(`/api/history/${date}`);
    } else {
      res = await axios.get(`/api/history/${date}/${currency}`);
    }
    dispatch({
      type: GET_HISTORY,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
