import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getLandfillDiversion = (data) => {
  return (dispatch) => {
    dispatch(landfillDiversionStart());
    ReportsService.getLandFillDiversion(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(landfillDiversionSuccess(siteBreakdown));
        } else {
          dispatch(landfillDiversionFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(landfillDiversionFailure(err.message));
      });
  };
};
export const landfillDiversionStart = () => {
  return {
    type: Constants.LANDFILL_DIVERSION_START,
  };
};

export const landfillDiversionSuccess = (data) => {
  return {
    type: Constants.LANDFILL_DIVERSION_SUCCESS,
    payload: data,
  };
};

export const landfillDiversionFailure = (error) => {
  return {
    type: Constants.LANDFILL_DIVERSION_FAILURE,
    payload: error,
  };
};

export const getLandfillDiversionList = (data) => {
  return (dispatch) => {
    dispatch(landfillDiversionListStart());
    ReportsService.getLandFillDiversionList(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(landfillDiversionListSuccess(siteBreakdown));
        } else {
          dispatch(landfillDiversionListFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(landfillDiversionListFailure(err.message));
      });
  };
};
export const landfillDiversionListStart = () => {
  return {
    type: Constants.LANDFILL_DIVERSION_LIST_START,
  };
};

export const landfillDiversionListSuccess = (data) => {
  return {
    type: Constants.LANDFILL_DIVERSION_LIST_SUCCESS,
    payload: data,
  };
};

export const landfillDiversionListFailure = (error) => {
  return {
    type: Constants.LANDFILL_DIVERSION_LIST_FAILURE,
    payload: error,
  };
};
