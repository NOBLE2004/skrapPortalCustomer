import { combineReducers } from "redux";
import { authReducer, signUpReducer } from "./authReducer";
import { siteManagerReducer } from "./siteManagerReducer";
import { dashboardReducer } from "./dashboardReducer";
import { sitesReducer } from "./sitesReducer";
import { allSiteReducer } from "./allSiteReducer";
import { jobReducer } from "./jobReducer";
import { tippingReducer } from "./tippingReducer";
import { ticketReducer } from "./ticketReducer";
import { phoneReducer } from "./phoneReducer";
import { reportReducer } from "./reportReducer";
import { hireBreakdownReducer } from "./hireBreakdownReducer";
import { siteBreakdownReducer } from "./siteBreakdownReducer";
import { siteMovementReducer } from "./siteMovementReducer";
import { totalSites } from "./jobsMetaReduces";
import { siteMovementBreakdownReducer } from "./siteMovementBreakdownReducer";
import { siteMovements } from "./siteMovementsReducer";
import { siteMovementDetail } from "./siteMovementDetailReducer";
import { reportEmission } from "./emissonReducer";
import { reportEmissionSiteBreakDown } from "./emissionSiteBreakDownReducer";
import { reportEmissionVehicle } from "./emissionVehicleReducer";
import { landfillDiversion } from "./landfillDiversionReducer";
import { portfolio } from "./portfolioReducer";
import { getTonnageReducer } from "./tonnageReducer";
import { getWasteReducer } from "./wasteReducer";
import { getWasteOfEnergyReducer } from "./wasteOfEnergyReducer";
import { getWasteOfEnergyListReducer } from "./wasteOfEnergyReducer";
import { siteBreakdownListReducer } from "./siteBreakdownReducer";
import { getRecycledReducer } from "./recycledReducer";
export default combineReducers({
  auth: authReducer,
  signup: signUpReducer,
  siteManager: siteManagerReducer,
  dashboard: dashboardReducer,
  sites: sitesReducer,
  jobs: jobReducer,
  allsites: allSiteReducer,
  tippings: tippingReducer,
  tickets: ticketReducer,
  phone: phoneReducer,
  report: reportReducer,
  hireBreakdown: hireBreakdownReducer,
  siteBreakdown: siteBreakdownReducer,
  siteMovement: siteMovementReducer,
  siteMovementBreakdown: siteMovementBreakdownReducer,
  totalSites: totalSites,
  siteMovements: siteMovements,
  siteMovementDetail: siteMovementDetail,
  reportEmission: reportEmission,
  reportEmissionSiteBreakDown: reportEmissionSiteBreakDown,
  reportEmissionVehicle: reportEmissionVehicle,
  landfillDiversion: landfillDiversion,
  portfolio: portfolio,
  tonnage: getTonnageReducer,
  waste: getWasteReducer,
  energy: getWasteOfEnergyReducer,
  energyList:getWasteOfEnergyListReducer,
  siteBreakdownList:siteBreakdownListReducer,
  recycled: getRecycledReducer,
});
