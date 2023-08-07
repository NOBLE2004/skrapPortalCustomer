import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getWasteEmssionData = (data) => {
  return (dispatch) => {
    dispatch(wasteEmissionStart());
    ReportsService.getWasteEmissionGraph(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
           const filterData = {
            Emission: [],
            date: [],
            TotalJobs: [],
          };
          response?.data?.data?.map((data) => {
            filterData.Emission.push(data?.Emission);
            filterData.date.push(data?.date);
            filterData.TotalJobs.push(data?.TotalJobs);
          });
          dispatch(wasteEmissionSuccess(filterData));
        } else {
          dispatch(wasteEmissionFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(wasteEmissionFailure(err.message));
      });
  };
};
export const wasteEmissionStart = () => {
  return {
    type: Constants.REPORTS_WASTE_EMISSION_START,
  };
};

export const wasteEmissionSuccess = (data) => {
  return {
    type: Constants.REPORTS_WASTE_EMISSION_SUCCESS,
    payload: data,
  };
};

export const wasteEmissionFailure = (error) => {
  return {
    type: Constants.REPORTS_WASTE_EMISSION_FAILURE,
    payload: error,
  };
};
