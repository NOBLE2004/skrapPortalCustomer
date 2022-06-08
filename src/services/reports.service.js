import HttpService from "./http.service";

class ReportsService extends HttpService {
    getHireBreakdown = (data) => this.get("customers/report/hireBreakDown", data);
    getSitesBreakdown = (data) => this.get("customers/report/sitesBreakDown", data);
    getSites = (data) => this.get("customers/sites", data);
}

export default new ReportsService();
