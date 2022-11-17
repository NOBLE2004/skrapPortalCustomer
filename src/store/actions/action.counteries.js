import * as Constants from "../constants/constants";
import DashBoardService from "../../services/dashboard.service";

export const getAllCounteries = (data) => {
  return (dispatch) => {
    dispatch(getCounteriesStart());
    DashBoardService.getAllCounteries(data)
      .then((response) => {
        console.log("reesss", response);
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(getCounteriesSuccess(siteBreakdown));
        } else {
          dispatch(getCounteriesFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(getCounteriesFailure(err.message));
      });
  };
};
export const getCounteriesStart = () => {
  return {
    type: Constants.ALL_COUNTERIES_LIST,
  };
};

export const getCounteriesSuccess = (data) => {
  return {
    type: Constants.ALL_COUNTERIES_LIST_SUCCESS,
    payload: data,
  };
};

export const getCounteriesFailure = (error) => {
  return {
    type: Constants.ALL_COUNTERIES_LIST_FAILURE,
    payload: error,
  };
};
