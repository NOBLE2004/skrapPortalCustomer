import HttpService from "./http.service";

class SiteService extends HttpService {
    getManagerList = () => this.get('customers/siteManagerList')
    getAllSites = () => this.get("sites")
    addNewManager = (data) => this.post("siteManager/register" , data);
    showManagerDetail = (params) => this.post("siteManager/details" , {id : params})
}

export default new SiteService();