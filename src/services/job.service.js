import HttpService from "./http.service";

class JobService extends HttpService {

    list = (data, params) => this.post("activeOrders", data, params);

    createOrder = (data) => this.post(`orderRequest`, data);

    acceptOrderRequest = (data) => this.post('acceptOrderRequest' , data)
    rejectOrderRequest = (data) => this.post('rejectOrderRequest' , data)

    show = (data) => this.post(`customers/getBookingDetail`, data);

    invoice = (data) => this.post(`downloadJobInvoice`, data);

    cancel = (data) => this.post(`cancelAppointment`, data);

    createExchange = (data) => this.post(`exchangeSkip`, data);

    requestCollection = (data) => this.post(`requestCollection`, data);

    copy = (data) => this.post(`copyJob`, data);

    getWasteTypes = (params) => this.get(`suppliers/waste-types`, params);

    csvExport = (params) => this.get('suppliers/job/export', params);

    paymentStatus = (data) => this.post('jobs/payments/status', data);

    xeroInvoice = (params) => this.get('uploadInvoice', params);


}

export default new JobService();
