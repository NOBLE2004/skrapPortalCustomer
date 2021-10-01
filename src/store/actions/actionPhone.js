import * as actionTypes from "../constants/constants";
import authService from "../../services/auth.service";

export const updatePhone = (data) => {
  return (dispatch) => {
    dispatch(phoneStart());
    authService.checkUserMobile(data)
      .then((res) => {
        if (res.data.code === 0) {
          dispatch(phoneSuccess({ phone: data.mobile, code: res.data.code }));
        } else {
          dispatch(phoneSuccess({ phone: data.mobile, code: res.data.code }));
        }
      })
      .catch((err) => {
        dispatch(phoneFailure(err.message));
      });
  };
};

export const phoneStart = () => {
  return {
    type: actionTypes.PHONE_START,
  };
};

export const phoneSuccess = (data) => {
  return {
    type: actionTypes.PHONE_SUCCESS,
    payload: data,
  };
};

export const phoneFailure = (err) => {
  return {
    type: actionTypes.PHONE_FAILURE,
    payload: err,
  };
};
