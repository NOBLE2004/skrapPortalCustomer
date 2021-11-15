import HttpService from "./http.service";

class SiteService extends HttpService {
  //site manager
  getManagerList = () => this.get("customers/siteManagerList");
  getAllSites = () => this.get("sites");
  addNewManager = (data) => this.post("siteManager/register", data);
  showManagerDetail = (params) =>
    this.post("siteManager/details", { id: params });

  // sites

  getSitesList = (params) => this.get("sites/list"  , params);

  //site assign to manager
  siteAssignToManager = (data) => this.post("siteManager/addAddress" , data);

  getAllSubServicesOnly = () => this.get("getAllSubServicesOnly")
  purchaseOrder = (data) => this.post("PurchaseOrder", data)
}

 export default new SiteService();
