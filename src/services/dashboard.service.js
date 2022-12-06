import HttpService from "./http.service";

class DashBoardService extends HttpService {
  getDashboardData = (params) =>
    this.get("customers/dashboard",  params);
  getAllCounteries = (params) => this.get("countries", params);
}

export default new DashBoardService();
