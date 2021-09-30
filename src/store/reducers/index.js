import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { siteManagerReducer } from "./siteManagerReducer";
import { dashboardReducer } from "./dashboardReducer";
import {sitesReducer} from "./sitesReducer";
import { allSiteReducer } from "./allSiteReducer";
import {jobReducer} from "./jobReducer";
import {tippingReducer} from "./tippingReducer";
import {ticketReducer} from "./ticketReducer";
export default combineReducers({
  auth: authReducer,
  siteManager: siteManagerReducer,
  dashboard: dashboardReducer,
  sites : sitesReducer,
  jobs : jobReducer,
  allsites: allSiteReducer,
  tippings: tippingReducer,
  tickets: ticketReducer
});
