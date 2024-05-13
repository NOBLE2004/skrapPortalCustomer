import HttpService from "./http.service";

class PledgeService extends HttpService {
  getPledgeData = (id) => this.get(`job/${id}/pledge`);
}

export default new PledgeService();
