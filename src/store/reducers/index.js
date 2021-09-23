import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { siteManagerReducer } from "./siteManagerReducer";
import { dashboardReducer } from "./dashboardReducer";
import {sitesReducer} from "./sitesReducer";
import { allSiteReducer } from "./allSiteReducer";
export default combineReducers({
  auth: authReducer,
  siteManager: siteManagerReducer,
  dashboard: dashboardReducer,
  sites : sitesReducer,
  allsites: allSiteReducer,
});
