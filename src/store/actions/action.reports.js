import * as Constants from "../constants/constants";
import reportService from "../../services/report.service";

export const getAllReports = (data) => {
  return (dispatch) => {
    dispatch(reportsStart());
    reportService
      .getReports(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const { jobsRepost } = response.data;
          const newRow = {
            job_id: "",
            job_address: "",
            job_date: "",
            service_name: "",
            transaction_cost: response.data.All_Transactions_Subtotal,
            first_name: "",
            last_name: "",
            EWC_Code: "Sub Total",
            WTN_Number: "",
            Disposal_Site: "",
            Tonnage: "",
            Diverted_Tonnage: "",
            Volume: "",
            Landfill_Diversion_Rate: "",
          };
          if (Object.keys(jobsRepost).length !== 0) {
            const totalReport = jobsRepost;
            const updatedReports = totalReport.concat(newRow);
            dispatch(reportsSuccess(updatedReports));
          } else {
            dispatch(reportsFailure(jobsRepost));
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
