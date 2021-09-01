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

export const APP_URL = `https://apitest2.skrap.app/scrapapi`;
export const API_URL = `${APP_URL}`;
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
  { text: "Sites", key: "sites", sub: false, icon: sitesBlack },
  { text: "Tiping", key: "tiping", sub: false, icon: tipingBlack },
  { text: "Tickets", key: "tickets", sub: false, icon: ticketsBlack },
  { text: "Statements", key: "statement", sub: false, icon: statementBlack },
  { text: "search", key: "search", icon: search },
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
  title: "Customer portal",
  description: "Log in to cotinue to access to the platform",
};

export const dummyStatus = [
  { id: 0, price: 1000, status: "Total Delivered", statusName: "primary" },
  { id: 1, price: 500, status: "Pending", statusName: "pending" },
  { id: 2, price: 200, status: "Completed", statusName: "completed" },
];

export const jobsTableData = () => [
  {
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    title: "Regional Paradigm Technician",
    department: "Optimization",
    status: "Active",
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    service: "Mixed Waste Grab Hire",
    address: "Mixed Waste Grab Hire",
    cost: "56000",
    statuss: "pending",
    payment: "manual",
    bookedby: "Skrap",
    po: "0006",
  },
  {
    name: "Cody Fisher",
    email: "cody.fisher@example.com",
    title: "Product Directives Officer",
    department: "Intranet",
    status: "Active",
    role: "Owner",
    imgUrl:
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    service: "Mixed Waste Grab Hire",
    address: "Mixed Waste Grab Hire",
    cost: "56000",
    statuss: "assigned",
    payment: "manual",
    bookedby: "Skrap",
    po: "0006",
  },
  {
    name: "Esther Howard",
    email: "esther.howard@example.com",
    title: "Forward Response Developer",
    department: "Directives",
    status: "Active",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    service: "Mixed Waste Grab Hire",
    address: "Mixed Waste Grab Hire",
    cost: "56000",
    statuss: "pending",
    payment: "manual",
    bookedby: "Skrap",
    po: "0006",
  },
  {
    name: "Jenny Wilson",
    email: "jenny.wilson@example.com",
    title: "Central Security Manager",
    department: "Program",
    status: "Active",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    service: "Mixed Waste Grab Hire",
    address: "Mixed Waste Grab Hire",
    cost: "56000",
    statuss: "completed",
    payment: "manual",
    bookedby: "Skrap",
    po: "0006",
  },
  {
    name: "Kristin Watson",
    email: "kristin.watson@example.com",
    title: "Lean Implementation Liaison",
    department: "Mobility",
    status: "Active",
    role: "Admin",
    imgUrl:
      "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    service: "Mixed Waste Grab Hire",
    address: "Mixed Waste Grab Hire",
    cost: "56000",
    statuss: "assigned",
    payment: "manual",
    bookedby: "Skrap",
    po: "0006",
  },
  {
    name: "Cameron Williamson",
    email: "cameron.williamson@example.com",
    title: "Internal Applications Engineer",
    department: "Security",
    status: "Active",
    role: "Member",
    imgUrl:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
    service: "Mixed Waste Grab Hire",
    address: "Mixed Waste Grab Hire",
    cost: "56000",
    statuss: "pending",
    payment: "manual",
    bookedby: "Skrap",
    po: "0006",
  },
];
