import { C_OTC_STORAGE } from "../environment";

export const getUserDataFromLocalStorage = () => {
  const userObj =
    (localStorage.getItem(C_OTC_STORAGE) &&
      JSON.parse(localStorage.getItem(C_OTC_STORAGE))) ||
    null;
  return userObj;
};
export const setUserDataInLocalStorage = (user) => {
  localStorage.setItem(C_OTC_STORAGE, JSON.stringify(user));
};

export const payment = (type) => {
  if (type === 0) {
    return "Stripe";
  } else if (type === 1) {
    return "Wallet";
  } else if (type === 2) {
    return "Credit";
  } else if (type === 3) {
    return "Card, Wallet";
  } else if (type === 4) {
    return "Card, Credit";
  } else if (type === 5) {
    return "Credit, Wallet";
  } else if (type === 6) {
    return "Credit, Card, Wallet";
  } else if (type === 7) {
    return "Manual";
  } else if (type === 10) {
    return "Kriya";
  } else {
    return "----";
  }
};
export const status = (status) => {
  if (status === 0) {
    return "Pending";
  } else if (status === 1) {
    return "Heading";
  } else if (status === 2) {
    return "Ongoing";
  } else if (status === 3 || status === 14) {
    return "Completed";
  } else if (status === 4) {
    return "Delivered";
  } else if (status === 5) {
    return "Pickup Heading";
  } else if (status === 6) {
    return "Pickup Ongoing";
  } else if (status === 7) {
    return "Exchange";
  } else if (status === 8) {
    return "Canceled";
  } else if (status === 9) {
    return "Pickup Booked";
  } else if (status === 10) {
    return "collection requested";
  } else if (status === 11) {
    return "To be allocated";
  } else if (status === 12) {
    return "Allocated to supplier";
  } else if (status === 13) {
    return "Confirmed by supplier";
  } else if (status === 14) {
    return "Requested";
  } else {
    return "Pending";
  }
};
