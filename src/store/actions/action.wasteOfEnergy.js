import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getWasteOfEnergy = (data) => {
  return (dispatch) => {
    dispatch(getWasteOfEnergyStart());
    ReportsService.getWasteOfEnergy(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(getWasteOfEnergySuccess(siteBreakdown));
        } else {
          dispatch(getWasteOfEnergyFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(getWasteOfEnergyFailure(err.message));
      });
  };
};
export const getWasteOfEnergyStart = () => {
  return {
    type: Constants.GET_WASTE_OF_ENERGY_START,
  };
};

export const getWasteOfEnergySuccess = (data) => {
  return {
    type: Constants.GET_WASTE_OF_ENERGY_SUCCESS,
    payload: data,
  };
};

export const getWasteOfEnergyFailure = (error) => {
  return {
    type: Constants.GET_WASTE_OF_ENERGY_FAILURE,
    payload: error,
  };
};
