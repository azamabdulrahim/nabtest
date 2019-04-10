import { GET_BEST_PROFITS, GET_HISTORY } from "../actions/types";

const initialState = {
  bestProfits: [],
  history: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BEST_PROFITS:
      return {
        ...state,
        bestProfits: action.payload
      };
    case GET_HISTORY:
      return {
        ...state,
        history: action.payload
      };
    default:
      return state;
  }
}
