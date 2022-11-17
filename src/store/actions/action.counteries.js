import * as Constants from "../constants/constants";
import DashBoardService from "../../services/dashboard.service";

export const getAllCounteries = (data) => {
  return (dispatch) => {
    dispatch(getCounteriesStart());
    DashBoardService.getAllCounteries(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const filter = [];
          response?.data?.result?.map((single) => {
            filter.push(single?.iso);
          });
          dispatch(getCounteriesSuccess(filter));
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
