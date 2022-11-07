import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getSiteMovementBreakdown = (data) => {
    return (dispatch) => {
        dispatch(siteMovementBreakdownStart());
        ReportsService
            .getHireBreakdown(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteMovementBd = response.data;
                    dispatch(siteMovementBreakdownSuccess(siteMovementBd));
                } else {
                    dispatch(siteMovementBreakdownFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(siteMovementBreakdownFailure(err.message));
            });
    };
};
export const siteMovementBreakdownStart = () => {
    return {
        type: Constants.REPORTS_SITE_MOVEMENT_BREAKDOWN_START,
    };
};

export const siteMovementBreakdownSuccess = (data) => {
    return {
        type: Constants.REPORTS_SITE_MOVEMENT_BREAKDOWN_SUCCESS,
        payload: data,
    };
};

export const siteMovementBreakdownFailure = (error) => {
    return {
        type: Constants.REPORTS_SITE_MOVEMENT_BREAKDOWN_FAILURE,
        payload: error,
    };
};
