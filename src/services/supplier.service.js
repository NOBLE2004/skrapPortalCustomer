import HttpService from "./http.service";

class SupplierService extends HttpService {
  //site manager
  getAllSuppliers = (params) => this.get("suppliers",params);
}

export default new SupplierService();
