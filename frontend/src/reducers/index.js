import { combineReducers } from "redux";
import authentication from "./authentication";
import data from "./data";

export default combineReducers({
  authentication,
  data
});
