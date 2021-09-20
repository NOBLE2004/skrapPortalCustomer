import HttpService from "./http.service";

class SiteService extends HttpService {
    getSitesList = () => this.get('customers/siteManagerList')
    getAllSites = () => this.get("sites")
    addNewSite = (data) => this.post("siteManager/register" , data)
}

export default new SiteService();