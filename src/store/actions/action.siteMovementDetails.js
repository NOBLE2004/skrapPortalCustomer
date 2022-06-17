import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getSiteMovementDetails = (data) => {
  return (dispatch) => {
    dispatch(siteMovementDetailStart());
    ReportsService.getSiteMovementDetails(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(siteMovementDetailSuccess(siteBreakdown));
        } else {
          dispatch(siteMovementDetailFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(siteMovementDetailFailure(err.message));
      });
  };
};
export const siteMovementDetailStart = () => {
  return {
    type: Constants.SITE_MOVEMENTS_DETAIL,
  };
};

export const siteMovementDetailSuccess = (data) => {
  return {
    type: Constants.SITE_MOVEMENT_DETAIL_SUCCESS,
    payload: data,
  };
};

export const siteMovementDetailFailure = (error) => {
  return {
    type: Constants.SITE_MOVEMENT_DETAIL_FAILURE,
    payload: error,
  };
};
