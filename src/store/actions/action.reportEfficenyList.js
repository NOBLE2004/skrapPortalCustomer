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
          };
          let procFirst = false;

          data?.data?.reduce((prev, curr) => {
            if (!procFirst) {
              filterData.Utilization.push(prev?.Utilization);
              filterData.date.push(prev?.date);
              filterData.TotalDeliveryJobs.push(prev?.TotalDeliveryJobs);
              procFirst = true;
            }
            filterData.Utilization.push(curr?.Utilization);
            filterData.date.push(curr?.date);
            filterData.TotalDeliveryJobs.push(curr?.TotalDeliveryJobs);
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
