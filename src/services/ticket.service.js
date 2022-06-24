import HttpService from "./http.service";

class TicketService extends HttpService {

    list = (params) => this.get('tickets', params);
    download = (params) => this.get('tickets/download', params);
}

export default new TicketService();
