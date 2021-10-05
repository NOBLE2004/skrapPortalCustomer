import HttpService from "./http.service";

class PaymentService extends HttpService {
    list = (data) => this.post("getCardList", data);

    create = (data) => this.post(`createCard`, data);

    pay = (data) => this.post(`chargeCustomer`, data);

    getData = (date) => this.post("getTimeSlots", date);

}

export default new PaymentService();
