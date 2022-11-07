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

export const getSitesMovementList = (data) => {
  return (dispatch) => {
    dispatch(siteMovementListStart());
    ReportsService.getSitesMovementList(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(siteMovementListSuccess(siteBreakdown));
        } else {
          dispatch(siteMovementListFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(siteMovementListFailure(err.message));
      });
  };
};
export const siteMovementListStart = () => {
  return {
    type: Constants.SITE_MOVEMENTS_LIST,
  };
};

export const siteMovementListSuccess = (data) => {
  return {
    type: Constants.SITE_MOVEMENT_LIST_SUCCESS,
    payload: data,
  };
};

export const siteMovementListFailure = (error) => {
  return {
    type: Constants.SITE_MOVEMENT_LIST_FAILURE,
    payload: error,
  };
};

