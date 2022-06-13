import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getJobsMeta = (data) => {
  return (dispatch) => {
    dispatch(jobsMetaStart());
    ReportsService.getJobsMeta(data)
      .then((response) => {
        if (Object.keys(response.data).length !== 0) {
          const siteBreakdown = response.data;
          dispatch(JobsMetaSuccess(siteBreakdown));
        } else {
          dispatch(jobsMetaFailure(response.data.description));
        }
      })
      .catch((err) => {
        dispatch(jobsMetaFailure(err.message));
      });
  };
};
export const jobsMetaStart = () => {
  return {
    type: Constants.JOBS_META_START,
  };
};

export const JobsMetaSuccess = (data) => {
  return {
    type: Constants.JOBS_META_SUCCESS,
    payload: data,
  };
};

export const jobsMetaFailure = (error) => {
  return {
    type: Constants.JOBS_META_FAILURE,
    payload: error,
  };
};
