import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getEfficencyList = (data) => {
  return (dispatch) => {
    dispatch(efficencyListStart());
    ReportsService.getEfficencyList(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const data = response.data;
          const filterData = {
            Utilization: [],
            date: [],
            TotalDeliveryJobs: [],
            job_service_name: [],
            utilization_service_name: [],
          };
          let procFirst = false;

          data?.data?.map((data) => {
            filterData.Utilization.push(data?.Utilization);
            filterData.date.push(data?.date);
            filterData.TotalDeliveryJobs.push(data?.TotalJobs);
          });
          dispatch(efficencyListSuccess(filterData));
        } else {
          dispatch(efficencyListFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(efficencyListFailure(err.message));
      });
  };
};
export const efficencyListStart = () => {
  return {
    type: Constants.REPORTS_EFFICENCY_LIST_START,
  };
};

export const efficencyListSuccess = (data) => {
  return {
    type: Constants.REPORTS_EFFICENCY_LIST_SUCCESS,
    payload: data,
  };
};

export const efficencyListFailure = (error) => {
  return {
    type: Constants.REPORTS_EFFICENCY_LIST_FAILURE,
    payload: error,
  };
};
