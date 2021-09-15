import HttpService from "./http.service";

class AuthService extends HttpService {
    
  login = (data) => this.post("login", data);
  signup = (data) => this.post("registerCustomer", data);
  userlogout = () => this.get("logout");
}

export default new AuthService();
