import sitesService from "../../services/sites.service";
import * as Constants from "../constants/constants";

export const getSiteManager = (params) => {
  return (dispatch) => {
    dispatch(siteManagerStart());
    sitesService
      .getManagerList(params)
      .then((res) => {
        dispatch(siteManagerSuccess(res.data.result));
      })
      .catch((err) => {
        dispatch(siteManagerFailure(err.message));
      });
  };
};

export const siteManagerStart = () => {
  return {
    type: Constants.SITE_MANAGER_DATA_START,
  };
};

export const siteManagerSuccess = (data) => {
  return {
    type: Constants.SITE_MANAGER_DATA_SUCCESS,
    payload: data,
  };
};

export const siteManagerFailure = (error) => {
  return {
    type: Constants.SITE_MANAGER_DATA_FAILURE,
    payload: error,
  };
};
