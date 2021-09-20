import HttpService from "./http.service";

class SiteService extends HttpService {
    getSitesList = () => this.get('customers/siteManagerList')
}

export default new SiteService();