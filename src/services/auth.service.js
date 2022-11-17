import HttpService from "./http.service";

class AuthService extends HttpService {
    
  login = (data) => this.post("login", data);
  signup = (data) => this.post("registerCustomer", data);
  checkUserMobile = (data) => this.post("checkUserMobile", data);
  getVerificationCode = (data) => this.post("getVerificationCode", data);
  verifyPinCode = (data) => this.post("verifyPinCode", data);
  forgetPassword = (data) => this.post("forgot", data);

}

export default new AuthService();
