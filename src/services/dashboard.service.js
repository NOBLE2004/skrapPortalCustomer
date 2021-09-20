import HttpService from "./http.service";

class DashBoardService extends HttpService {
    
  getDashboardData = (params) => this.get("customers/dashboard" , {year:params});

}

export default new DashBoardService();