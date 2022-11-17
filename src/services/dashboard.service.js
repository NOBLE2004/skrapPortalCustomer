import HttpService from "./http.service";

class DashBoardService extends HttpService {
  getDashboardData = (params) =>
    this.get("customers/dashboard", { year: params });
  getAllCounteries = (params) => this.get("counteries", params);
}

export default new DashBoardService();
