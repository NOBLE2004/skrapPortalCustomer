import HttpService from "./http.service";

class DashBoardService extends HttpService {
  getDashboardData = (params) => this.get("customers/dashboard", params);
  getDashboardMapData = (params) => this.get("customers/map", params);
  getDashboardServiceData = (params) => this.get("customers/serviceSales", params);
  getDashboardSaleData = (params) => this.get("customers/totalSales", params);
  getAllCounteries = (params) => this.get("countries", params);
}

export default new DashBoardService();
