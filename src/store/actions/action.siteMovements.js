import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getSitesMovement = (data) => {
  return (dispatch) => {
    dispatch(siteMovementStart());
    ReportsService.getSitesMovement(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(siteMovementSuccess(siteBreakdown));
        } else {
          dispatch(siteMovementFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(siteMovementFailure(err.message));
      });
  };
};
export const siteMovementStart = () => {
  return {
    type: Constants.SITE_MOVEMENTS,
  };
};

export const siteMovementSuccess = (data) => {
  return {
    type: Constants.SITE_MOVEMENT_SUCCESS,
    payload: data,
  };
};

export const siteMovementFailure = (error) => {
  return {
    type: Constants.SITE_MOVEMENT_FAILURE,
    payload: error,
  };
};
