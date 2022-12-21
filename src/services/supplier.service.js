import HttpService from "./http.service";

class SupplierService extends HttpService {
  //site manager
  getAllSuppliers = (params) => this.get("suppliers", params);
  downloadFile = (user) => this.get(`suppliers/documents/${user}/download_all`);
}

export default new SupplierService();
