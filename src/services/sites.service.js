import HttpService from "./http.service";

class SiteService extends HttpService {
  //site manager
  getManagerList = () => this.post("multiuser/getUserList");
  getAllSites = () => this.get("sites");
  addNewManager = (data) => this.post("siteManager/register", data);

  getPermission = () => this.post("multiuser/permissions");
  showManagerDetail = (ids, params) =>
    this.post("siteManager/details", { id: ids }, params);

  // sites
  showSitesDetail = (siteId, params) =>
    this.post("sites/details", { id: siteId }, params);
  getSitesList = (params) => this.get("sites/list", params);
  createNewSite = (data) => this.post("sites/create", data);
  selectCurrentSite = (data) => this.post("sites/selectCurrentSite", data);
  siteByUdprn = (data) => this.post("sites/selectSiteByUdprn", data);

  //site assign to manager
  siteAssignToManager = (data) => this.post("siteManager/addAddress", data);

  getAllSubServicesOnly = () => this.get("getAllSubServicesOnly");
  purchaseOrder = (data) => this.post("PurchaseOrder", data);
  updateManager = (data) => this.post("siteManager/update", data);

}

export default new SiteService();
