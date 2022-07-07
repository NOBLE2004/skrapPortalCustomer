import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getRecycled = (data) => {
  return (dispatch) => {
    dispatch(getRecycledStart());
    ReportsService.getRecycled(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(getRecycledSuccess(siteBreakdown));
        } else {
          dispatch(getRecycledFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(getRecycledFailure(err.message));
      });
  };
};
export const getRecycledStart = () => {
  return {
    type: Constants.GET_RECYCLED_START,
  };
};

export const getRecycledSuccess = (data) => {
  return {
    type: Constants.GET_RECYCLED_SUCCESS,
    payload: data,
  };
};

export const getRecycledFailure = (error) => {
  return {
    type: Constants.GET_RECYCLED_FAILURE,
    payload: error,
  };
};
