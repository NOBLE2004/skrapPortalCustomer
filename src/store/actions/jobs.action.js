import JobService from "../../services/job.service";
import * as Constants from "../constants/constants";

//getSites
export const getJob = (data) => {
    return (dispatch) => {
        dispatch(jobStart());
        JobService
            .show(data)
            .then((res) => {

                dispatch(jobSuccess(res.data.result[0]));
            })
            .catch((err) => {
                dispatch(jobFailure(err.message));
            });
    };
};

export const jobStart = () => {
    return {
        type: Constants.JOB_DATA_START,
    };
};

export const jobSuccess = (data) => {
    return {
        type: Constants.JOB_DATA_SUCCESS,
        payload: data,
    };
};

export const jobFailure = (error) => {
    return {
        type: Constants.JOB_DATA_FAILURE,
        payload: error,
    };
};



// getSiteList

export const getJobList = (data, filters) => {
    return (dispatch) => {
        dispatch(jobListStart());
        data.all = true;
        const params = Object.entries(filters).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
        JobService
            .list(data, params)
            .then((res) => {
                dispatch(jobListSuccess(res.data.result));
            })
            .catch((err) => {
                dispatch(jobListFailure(err.message));
            });
    };
};

export const jobListStart = () => {
    return {
        type: Constants.JOB_LIST_DATA_START,
    };
};

export const jobListSuccess = (data) => {
    return {
        type: Constants.JOB_LIST_DATA_SUCCESS,
        payload: data,
    };
};

export const jobListFailure = (error) => {
    return {
        type: Constants.JOB_LIST_DATA_FAILURE,
        payload: error,
    };
};
