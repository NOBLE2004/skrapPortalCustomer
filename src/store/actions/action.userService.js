import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getUserService = (data) => {
  return (dispatch) => {
    dispatch(userServiceStart());
    ReportsService.getUserService(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(userServiceSuccess(siteBreakdown));
        } else {
          dispatch(userServiceFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(userServiceFailure(err.message));
      });
  };
};
export const userServiceStart = () => {
  return {
    type: Constants.REPORTS_USER_SERVICE_START,
  };
};

export const userServiceSuccess = (data) => {
  return {
    type: Constants.REPORTS_USER_SERVICE_SUCCESS,
    payload: data,
  };
};

export const userServiceFailure = (error) => {
  return {
    type: Constants.REPORTS_USER_SERVICE_FAILURE,
    payload: error,
  };
};
