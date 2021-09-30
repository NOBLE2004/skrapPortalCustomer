import HttpService from "./http.service";

class TicketService extends HttpService {

    list = (params) => this.get('tickets', params);
}

export default new TicketService();
