import * as Constants from "../constants/constants";
import reportService from "../../services/report.service";

export const getSiteBreakdown = (data) => {
    return (dispatch) => {
        dispatch(siteBreakdownStart());
        reportService
            .getReports(data)
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
