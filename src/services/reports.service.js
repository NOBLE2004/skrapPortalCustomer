import HttpService from "./http.service";

class ReportsService extends HttpService {
  getHireBreakdown = (data) => this.get("customers/report/hireBreakDown", data);
  getSitesBreakdown = (data) =>
    this.get("customers/report/sitesBreakDown", data);
  getJobsMeta = (data) => this.get("customers/report/jobsMeta", data);
  getSitesMovement = (data) => this.get("customers/report/siteMovements", data);
  getSiteMovementDetails = (data) =>
    this.get("customers/report/siteMovementsDetails", data);
  getEmissions = (data) => this.get("emissions", data);
  getEmissionsSiteBreakDown = (data) => this.get("getEmissions", data);
  getReportEmissionVehicle = (data) => this.get("getVehicle", data);
  getLandFillDiversion = (data) =>
    this.get("customers/report/landFillDiversion", data);
  getTonnage = (data) => this.get("customers/report/tonnage", data);
  getWaste = (data) => this.get("customers/report/wastes", data);
  getWasteOfEnergy = (data) => this.get("customers/report/wasteOfEnergy", data);
  getPortfolio = (data) => this.get("portfolios", data);
}

export default new ReportsService();
