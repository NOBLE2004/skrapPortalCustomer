import HttpService from "./http.service";

class ReportService extends HttpService {
  getReports = (data) => this.post("getjobsReports", data);
}

export default new ReportService();
