import * as Constants from "../constants/constants";
import reportService from "../../services/report.service";

export const getAllReports = (data) => {
  return (dispatch) => {
    dispatch(reportsStart());
    reportService
      .getReports(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const { jobsReport } = response.data;
          const newRow = {
            job_id: "",
            job_address: "",
            job_date: "",
            service_name: "",
            transaction_cost: response.data.All_Transactions_Subtotal
              ? response.data.All_Transactions_Subtotal
              : "",
            full_name: response.data.co2_emissions_average ? "Average" : "",
            EWC_Code: response.data.All_Transactions_Subtotal
              ? "Sub Total"
              : "",
            WTN_Number: response.data.co2_emissions_average
              ? response.data.co2_emissions_average
              : "",
            Disposal_Site: "",
            Tonnage: "",
            Diverted_Tonnage: "",
            Volume: "",
            Landfill_Diversion_Rate: "",
          };
          if (Object.keys(jobsReport).length !== 0) {
            const totalReport = jobsReport;
            const updatedReports = totalReport.concat(newRow);
            dispatch(reportsSuccess(updatedReports));
          } else {
            dispatch(reportsFailure(jobsReport));
          }
        } else {
          dispatch(reportsFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(reportsFailure(err.message));
      });
  };
};
export const reportsStart = () => {
  return {
    type: Constants.REPORTS_START,
  };
};

export const reportsSuccess = (data) => {
  return {
    type: Constants.REPORTS_SUCCESS,
    payload: data,
  };
};

export const reportsFailure = (error) => {
  return {
    type: Constants.REPORTS_FAILURE,
    payload: error,
  };
};
