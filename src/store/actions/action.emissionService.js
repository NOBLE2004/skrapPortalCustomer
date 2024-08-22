import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getEmissionServiceBased = (data) => {
    return (dispatch) => {
        dispatch(reportEmissionStart());
        ReportsService.getEmissionServices(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteBreakdown = response.data;
                    dispatch(reportEmissionSuccess(siteBreakdown));
                } else {
                    dispatch(reportEmissionFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(reportEmissionFailure(err.message));
            });
    };
};
export const reportEmissionStart = () => {
    return {
        type: Constants.REPORT_EMISSIONS_SERVICE_START,
    };
};

export const reportEmissionSuccess = (data) => {
    return {
        type: Constants.REPORT_EMISSIONS_SERVICE_SUCCESS,
        payload: data,
    };
};

export const reportEmissionFailure = (error) => {
    return {
        type: Constants.REPORT_EMISSIONS_SERVICE_FAILURE,
        payload: error,
    };
};
