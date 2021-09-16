import HttpService from "./http.service";

class ServiceService extends HttpService {
    list = (params) => this.get("getServices", params);

    subServicelist = (data) => this.post("getSubServices", data);

    getAllSubServicelist = () => this.get("getAllSubServices");

    create = (data) => this.post("suppliers/drivers", data);

    show = (data) => this.get("suppliers/drivers", data);

    update = (data, params) => this.put("suppliers/drivers");
}

export default new ServiceService();
