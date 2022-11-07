import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getReportSiteBreakDownEmissions = (data) => {
    return (dispatch) => {
        dispatch(reportEmissionSiteBreakDownStart());
        ReportsService.getEmissionsSiteBreakDown(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteBreakdown = response.data;
                    dispatch(reportEmissionSiteBreakDownSuccess(siteBreakdown));
                } else {
                    dispatch(reportEmissionSiteBreakdownFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(reportEmissionSiteBreakdownFailure(err.message));
            });
    };
};
export const reportEmissionSiteBreakDownStart = () => {
    return {
        type: Constants.REPORT_EMISSIONS_SITE_BREAKDOWN_START,
    };
};

export const reportEmissionSiteBreakDownSuccess = (data) => {
    return {
        type: Constants.REPORT_EMISSIONS_SITE_BREAKDOWN_SUCCESS,
        payload: data,
    };
};

export const reportEmissionSiteBreakdownFailure = (error) => {
    return {
        type: Constants.REPORT_EMISSIONS_SITE_BREAKDOWN_FAILURE,
        payload: error,
    };
};
