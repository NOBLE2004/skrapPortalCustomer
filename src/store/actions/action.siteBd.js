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
