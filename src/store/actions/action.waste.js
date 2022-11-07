import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getWaste = (data) => {
  return (dispatch) => {
    dispatch(getWasteStart());
    ReportsService.getWaste(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(getWasteSuccess(siteBreakdown));
        } else {
          dispatch(getWasteFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(getWasteFailure(err.message));
      });
  };
};
export const getWasteStart = () => {
  return {
    type: Constants.GET_WASTE_START,
  };
};

export const getWasteSuccess = (data) => {
  return {
    type: Constants.GET_WASTE_SUCCESS,
    payload: data,
  };
};

export const getWasteFailure = (error) => {
  return {
    type: Constants.GET_WASTE_FAILURE,
    payload: error,
  };
};
