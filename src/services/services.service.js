import HttpService from "./http.service";

class ServicesService extends HttpService {

    list = (params) => this.get('getServices', params);
}

export default new ServicesService();
