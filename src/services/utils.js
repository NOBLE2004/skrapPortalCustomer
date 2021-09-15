import {C_OTC_STORAGE} from "../environment";

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
