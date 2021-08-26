import { combineReducers } from "redux";
import { userLogin } from "./users/index";

export default combineReducers({
  user: userLogin
})