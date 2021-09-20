import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { siteManagerReducer } from "./siteManagerReducer";
import { dashboardReducer } from "./dashboardReducer";
export default combineReducers({
  auth: authReducer,
  siteManager: siteManagerReducer,
  dashboard: dashboardReducer,
});
