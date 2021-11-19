import * as Constants from "../constants/constants";

export const getPoOrders = (data) => {
  return (dispatch) => {
    dispatch(poStart());

    dispatch(poSuccess(data));
  };
};

export const poStart = () => {
  return {
    type: Constants.PO_DATA_START,
  };
};

export const poSuccess = (data) => {
  return {
    type: Constants.PO_DATA_SUCCESS,
    payload: data,
  };
};

export const poFailure = (error) => {
  return {
    type: Constants.PO_DATA_FAILURE,
    payload: error,
  };
};
