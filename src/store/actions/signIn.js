import { getCurrency } from "../../environment";
import authService from "../../services/auth.service";
import * as Constants from "../constants/constants";

export const userlogin = (data) => {
  return (dispatch) => {
    dispatch(loginStart());
    authService
      .login(data)
      .then((response) => {
        if (Object.keys(response.data.result).length !== 0) {
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("token", response.data.result.token);
          localStorage.setItem("user_id", response.data.result.user_id);
          localStorage.setItem(
            "c_d_storage",
            JSON.stringify(response.data.result)
          );
          localStorage.setItem(
            "currency",
            response?.data?.result?.country_currency !== null
              ? response?.data?.result?.country_currency?.currency_symbol
              : "£"
          );
          localStorage.setItem("role_id", response.data.result.role_id);
          localStorage.setItem("user_count", response.data.result.user_count);
          dispatch(loginSuccess(response.data.result));
        } else {
          dispatch(loginFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(loginFailure(err.message));
      });
  };
};

export const loginStart = () => {
  return {
    type: Constants.LOGIN_START,
  };
};

export const loginSuccess = (data) => {
  return {
    type: Constants.LOGIN_SUCCESS,
    payload: data,
  };
};

export const loginFailure = (error) => {
  return {
    type: Constants.LOGIN_FAILURE,
    payload: error,
  };
};
