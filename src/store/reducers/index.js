import { combineReducers } from "redux";
import { authReducer, signUpReducer } from "./authReducer";
import { siteManagerReducer } from "./siteManagerReducer";
import {
  dashboardReducer,
  dashboardMapReducer,
  dashboardSaleReducer,
  dashboardServiceReducer,
} from "./dashboardReducer";
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
// import { getWasteOfEnergyListReducer } from "./wasteOfEnergyReducer";
import { siteBreakdownListReducer } from "./siteBreakdownReducer";
import { getRecycledReducer } from "./recycledReducer";
import { siteMovementsList } from "./siteMovementsReducer";
import { landfillDiversionList } from "./landfillDiversionReducer";
import { allCounteriesReducer } from "./allCounteriesReducer";
import { supplierReducer } from "./supplierReducer";
import { rebateBreakdownReducer } from "./rebateBreakdownReducer";
import { reportEfficencyReducer } from "./reportEfficencyReducer";
import { userServiceReducer } from "./userService";
import { jobFilterReducer } from "./jobReducer";
import { sitesFilterReducer } from "./sitesReducer";
import { wasteEmissionReducer } from "./reportWasteEmissionReducer";
import {reportWasteEmission} from "./wasteEmissonReducer";
import {getRecycledSuppReducer} from "./rescycledSuppReducer";
import {wasteEmissionServiceReducer} from "./wasteEmissionServiceReducer";
import {emissionServiceReducer} from "./emissionServiceReducer";
export default combineReducers({
  auth: authReducer,
  signup: signUpReducer,
  siteManager: siteManagerReducer,
  dashboard: dashboardReducer,
  dashboardMap: dashboardMapReducer,
  dashboardService: dashboardServiceReducer,
  dashboardSale: dashboardSaleReducer,
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
  landfillList: landfillDiversionList,
  siteBreakdownList: siteBreakdownListReducer,
  siteMovementsList: siteMovementsList,
  recycled: getRecycledReducer,
  allCounteries: allCounteriesReducer,
  allSupplier: supplierReducer,
  rebateBreakDown: rebateBreakdownReducer,
  userService: userServiceReducer,
  efficencyList: reportEfficencyReducer,
  wasteEmission: wasteEmissionReducer,
  jobsFilter: jobFilterReducer,
  sitesFilter: sitesFilterReducer,
  reportWasteEmissions: reportWasteEmission,
  recycledSupp: getRecycledSuppReducer,
  wasteEmissionService: wasteEmissionServiceReducer,
  emissionService: emissionServiceReducer
});
