import * as Constants from "../constants/constants";
import reportService from "../../services/report.service";

export const getAllReports = (data) => {
  return (dispatch) => {
    dispatch(reportsStart());
    reportService
      .getReports(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          dispatch(reportsSuccess(response.data));
        } else {
          dispatch(reportsFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(reportsFailure(err.message));
      });
  };
};
export const reportsStart = () => {
  return {
    type: Constants.REPORTS_START,
  };
};

export const reportsSuccess = (data) => {
  return {
    type: Constants.REPORTS_SUCCESS,
    payload: data,
  };
};

export const reportsFailure = (error) => {
  return {
    type: Constants.REPORTS_FAILURE,
    payload: error,
  };
};
