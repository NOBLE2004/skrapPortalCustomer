import HttpService from "./http.service";

class JobService extends HttpService {

    list = (data) => this.post("activeOrders", data);
}

export default new JobService();
