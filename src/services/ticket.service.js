import HttpService from "./http.service";

class TicketService extends HttpService {

    list = (params) => this.get('tickets', params);
    download = (params) => this.getportal('tickets/download', params);
}

export default new TicketService();
