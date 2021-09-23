import HttpService from "./http.service";

class TippingService extends HttpService {

    list = (params) => this.get('customers/tipping', params);
}

export default new TippingService();
