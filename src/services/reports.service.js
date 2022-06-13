import HttpService from "./http.service";

class ReportsService extends HttpService {
    getHireBreakdown = (data) => this.get("customers/report/hireBreakDown", data);
    getSitesBreakdown = (data) => this.get("customers/report/sitesBreakDown", data);
    getJobsMeta = (data) => this.get("customers/report/jobsMeta", data);
}

export default new ReportsService();
