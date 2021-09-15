import HttpService from "./http.service";

class DashBoardService extends HttpService {
    
  getDashboardData = () => this.get("customers/dashboard");

}

export default new DashBoardService();