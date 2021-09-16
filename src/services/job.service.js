import HttpService from "./http.service";

class JobService extends HttpService {

    list = (data) => this.post("activeOrders", data);

    create = (data) => this.post(`suppliers/job`, data);

    createOrder = (data) => this.post(`orderRequest`, data);

    assignDriver = (data) => this.post("suppliers/jobs/assignDriver", data);

    show = (id) => this.get(`suppliers/job/${id}`);

    update = (id, data) => this.put(`suppliers/job/${id}`, data);

    editJob = (id, data) => this.post(`suppliers/job/${id}/edit `, data);

    invoice = (data) => this.post(`downloadJobInvoice`, data);

    ticket = (data) => this.post(`drivers/wasteHierchyDoc`, data);

    cancel = (data) => this.post(`cancelAppointment`, data);

    createExchange = (data) => this.post(`exchangeSkip`, data);

    requestCollection = (data) => this.post(`requestCollection`, data);

    copy = (data) => this.post(`copyJob`, data);

    addWaste = (id, data) => this.put(`suppliers/job/${id}/waste`, data);

    getWasteTypes = (params) => this.get(`suppliers/waste-types`, params);

    csvExport = (params) => this.get('suppliers/job/export', params);

    paymentStatus = (data) => this.post('jobs/payments/status', data);
}

export default new JobService();
