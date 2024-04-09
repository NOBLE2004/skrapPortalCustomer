import HttpService from "./http.service";

class ReportsService extends HttpService {
  getHireBreakdown = (data) => this.get("customers/report/hireBreakDown", data);
  getSitesBreakdown = (data) =>
    this.get("customers/report/sitesBreakDown", data);

  getRebateBreakdown = (data) =>
    this.get("customers/report/rebateReport", data);
  getSitesBreakdownList = (data) =>
    this.get("customers/report/sitesBreakDown/list", data);
  getJobsMeta = (data) => this.get("customers/report/jobsMeta", data);
  getSitesMovement = (data) => this.get("customers/report/siteMovements", data);
  getSitesMovementList = (data) =>
    this.get("customers/report/reductionReport", data);
  getSiteMovementDetails = (data) =>
    this.get("customers/report/siteMovementsDetails", data);
  getEmissions = (data) => this.get("emissions", data);
  getEmissionsSiteBreakDown = (data) => this.get("getEmissions", data);
  getWasteEmissionsYearly = (data) => this.get("customers/report/getWasteEmissionYearly", data);
  getReportEmissionVehicle = (data) => this.get("getVehicle", data);
  getLandFillDiversion = (data) =>
    this.get("customers/report/landFillDiversion", data);
  getLandFillDiversionList = (data) =>
    this.get("customers/report/landFillDiversion/list", data);
  getTonnage = (data) => this.get("customers/report/tonnage", data);
  getWaste = (data) => this.get("customers/report/wastes", data);
  getWasteOfEnergy = (data) => this.get("customers/report/wasteOfEnergy", data);
  getRecycled = (data) => this.get("customers/report/recycled", data);
  getRecycledSupp = (data) => this.get("customers/report/recycledSupplier", data);
  getPortfolio = (data) => this.get("portfolios", data);
  payOffSet = (data) => this.post(`placeOrderByValue?${data}`);
  offSetCharge = (data) => this.post(`offsetCharge`, data);
  getAccountStatement = (data) =>
    this.post(`customers/report/accountStatement`, data);
  getEfficencyList = (data) =>
    this.get(`customers/report/getEfficiencyList`, data);
  getWasteEmissionGraph = (data) =>
    this.get(`customers/report/getWasteEmission`, data);
  getUserService = (data) => this.get("getUserServices", data);
}

export default new ReportsService();
