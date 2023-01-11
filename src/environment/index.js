import {
  dashboardBlack,
  jobBlack,
  customerBlack,
  search,
  invoice,
  document,
  vehicle,
  sitesBlack,
  ticketsBlack,
  tipingBlack,
  statementBlack,
} from "../assets/images/index";
// export const APP_URL = `https://apitest2.skrap.app/scrapapi`;
// export const APP_URL='http://192.168.10.111:8000'
export const APP_URL = `https://skrapapis.skrap.app/live/public/scrapapi`;



export const DOWNLOAD_URL = `https://portal.skrap.app/storage`;
export const API_URL = `${APP_URL}`;
export const RECAPTCHA_KEY = "6LdPaA8jAAAAACq9tEZOoVR4GPtKOfelW7o6Kh0z";
export const ENV = `prod`;
export const USER = 236;
export const FILE_DIR = "/storage";
export const LABELS = {
  GO_BACK: "← Back",
  LOGOUT: "↶ Logout",
  LOGIN: "Login",
  SIGNUP: "Sign Up",
  REGISTER: "Create User",
  EMAIL: "Email Address",
  NAME: "Username",
  FULL_NAME: "Full Name",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Confirm Password",
};
export const ERRORS = {
  NAME_REQUIRED: "Name is required",
  EMAIL_INVALID: "Invalid Username/Email Format",
  PASSWORD_INVALID: "Password is Required",
};
export const REGISTER = {
  SUCCESS_HEADER: "Success",
  SUCCESS_MESSAGE: "User Created Successfully!",
  FAILURE_HEADER: "Failure",
  FAILURE_MESSAGE:
    "Cannot Create User! User may already have been created with the given email!",
};
export const LOGIN = {
  FAILURE_HEADER: "Failure",
  FAILURE_MESSAGE: "Invalid Username AND/OR Password!",
};
export const REGEXP_EMAIL = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2;3})+$/;
export const C_OTC_STORAGE = "c_d_storage";

export const sidebarTabsList = [
  { text: "Dashboard", key: "dashboard", sub: false, icon: dashboardBlack },
  { text: "Sites", key: "sites", sub: false, icon: sitesBlack },
  {
    text: "Jobs",
    key: "jobs",
    sub: false,
    icon: jobBlack,
  },
  {
    text: "Site Managers",
    key: "site-managers",
    sub: false,
    icon: customerBlack,
  },
  /*{ text: "Tipping", key: "tiping", sub: false, icon: tipingBlack },*/

  
  { text: "Compliance", key: "tickets", sub: false, icon: ticketsBlack },


  //{ text: "Reports", key: "reports", sub: false, icon: statementBlack },
  { text: "Reports", key: "new-reports", sub: false, icon: statementBlack },
  // { text: "Supplier", key: "supplier", sub: false, icon: customerBlack },

  // { text: "search", key: "search", icon: search },
];

export const jobStatusDelivery = [
  { id: 0, status: "Pending", stage_id: 26 },
  { id: 2, status: "En route", stage_id: 27 },
  { id: 4, status: "Delivered", stage_id: 29 },
];
export const jobStatusExchange = [
  { id: 0, status: "Pending", stage_id: 32 },
  { id: 2, status: "En route", stage_id: 33 },
  { id: 3, status: "Completed", stage_id: 34 },
];

export const loginHeader = {
  title: "Customer Portal",
  description: "Login to continue to access to the platform",
};
export const registerHeaderData = {
  title: "Customer Portal",
  description: "Sign up to continue to hire",
};

export const forgetPasswordHeader = {
  title: "Customer Portal",
  description:
    "Enter your email and we'll send you a instructions to reset your password.",
};

export const dummyStatus = [
  { id: 0, price: 30, status: "Total Delivered", statusName: "primary" },
  { id: 1, price: 2, status: "Pending", statusName: "pending" },
  { id: 2, price: 20, status: "Completed", statusName: "completed" },
];

export const JOB_STATUS = [
  { id: 0, status: "Pending" },
  { id: 1, status: "Heading" },
  { id: 2, status: "Ongoing" },
  { id: 3, status: "Completed" },
  { id: 4, status: "Delivered" },
  { id: 6, status: "Pickup Ongoing" },
];
export const MARKET_PAY_LIST = [
  // {
  //   id: "PAY30 ",
  //   title: "Pay in 30 days",
  //   tooltip:
  //     "Pay by bank transfer on the 30th day after the service delivery. We will send you the payment details in the order confirmation email. MartketPay is powered by",
  //   text: "Remaining credit after transaction",
  // },
  {
    id: "PAY30EOFM",
    title: "Pay end of month following",
    tooltip1:
      "Pay by bank transfer by end of month following after the service delivery. We will send you the payment details in the order confirmation email. MartketPay is powered by ",
  },
];

export const MARKET_PAY_LIST1 = [
  {
    id: "PAY30EOFM",
    title: "Pay end of month following",
    tooltip:
      "Pay by bank transfer by end of month following after the service delivery. We will send you the payment details in the order confirmation email. MartketPay is powered by",
    text: "Remaining credit after transaction",
  },
];
