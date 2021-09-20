import * as Constants from "../constants/constants";
import dashboardService from "../../services/dashboard.service";
export const getDashboardsData = (year) => {
  return (dispatch) => {
    dispatch(dashboardStart());
    dashboardService
      .getDashboardData(year)
      .then((res) => {
        dispatch(dashboardSuccess(res.data));
      })
      .catch((err) => {
        dispatch(dashboardFailure(err.message));
      });
  };
};

export const dashboardStart = () => {
  return {
    type: Constants.DASHBOARD_DATA_START,
  };
};

export const dashboardSuccess = (data) => {
  return {
    type: Constants.DASHBOARD_DATA_SUCCESS,
    payload: data,
  };
};

export const dashboardFailure = (error) => {
  return {
    type: Constants.DASHBOARD_DATA_FAILURE,
    payload: error,
  };
};
