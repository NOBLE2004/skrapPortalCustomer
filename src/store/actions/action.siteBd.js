import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getSiteBreakdown = (data) => {
    return (dispatch) => {
        dispatch(siteBreakdownStart());
        ReportsService
            .getSitesBreakdown(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteBreakdown = response.data;
                        dispatch(siteBreakdownSuccess(siteBreakdown));
                } else {
                    dispatch(siteBreakdownFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(siteBreakdownFailure(err.message));
            });
    };
};
export const siteBreakdownStart = () => {
    return {
        type: Constants.REPORTS_SITE_BREAKDOWN_START,
    };
};

export const siteBreakdownSuccess = (data) => {
    return {
        type: Constants.REPORTS_SITE_BREAKDOWN_SUCCESS,
        payload: data,
    };
};

export const siteBreakdownFailure = (error) => {
    return {
        type: Constants.REPORTS_SITE_BREAKDOWN_FAILURE,
        payload: error,
    };
};


export const getSiteBreakdownlist = (data) => {
    return (dispatch) => {
        dispatch(siteBreakdownListStart());
        ReportsService
            .getSitesBreakdownList(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteBreakdown = response.data;
                        dispatch(siteBreakdownListSuccess(siteBreakdown));
                } else {
                    dispatch(siteBreakdownListFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(siteBreakdownListFailure(err.message));
            });
    };
};
export const siteBreakdownListStart = () => {
    return {
        type: Constants.REPORTS_SITE_BREAKDOWN_LIST_START,
    };
};

export const siteBreakdownListSuccess = (data) => {
    return {
        type: Constants.REPORTS_SITE_BREAKDOWN_LIST_SUCCESS,
        payload: data,
    };
};

export const siteBreakdownListFailure = (error) => {
    return {
        type: Constants.REPORTS_SITE_BREAKDOWN_LIST_FAILURE,
        payload: error,
    };
};
