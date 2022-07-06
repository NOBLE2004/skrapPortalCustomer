import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getTonnage = (data) => {
  return (dispatch) => {
    dispatch(getTonnageStart());
    ReportsService.getTonnage(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(getTonnageSuccess(siteBreakdown));
        } else {
          dispatch(getTonnageFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(getTonnageFailure(err.message));
      });
  };
};
export const getTonnageStart = () => {
  return {
    type: Constants.GET_TONNAGE_START,
  };
};

export const getTonnageSuccess = (data) => {
  return {
    type: Constants.GET_TONNAGE_SUCCESS,
    payload: data,
  };
};

export const getTonnageFailure = (error) => {
  return {
    type: Constants.GET_TONNAGE_FAILURE,
    payload: error,
  };
};
