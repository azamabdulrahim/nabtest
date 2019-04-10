import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import historyReducer from "./historyReducer";

export default combineReducers({
  errors: errorReducer,
  history: historyReducer
});
