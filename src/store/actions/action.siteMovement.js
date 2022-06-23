import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getSiteMovement = (data) => {
    return (dispatch) => {
        dispatch(siteMovementStart());
        ReportsService
            .getHireBreakdown(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteMovement = response.data;
                    dispatch(siteMovementSuccess(siteMovement));
                } else {
                    dispatch(siteMovementFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(siteMovementFailure(err.message));
            });
    };
};
export const siteMovementStart = () => {
    return {
        type: Constants.REPORTS_SITE_MOVEMENT_START,
    };
};

export const siteMovementSuccess = (data) => {
    return {
        type: Constants.REPORTS_SITE_MOVEMENT_SUCCESS,
        payload: data,
    };
};

export const siteMovementFailure = (error) => {
    return {
        type: Constants.REPORTS_SITE_MOVEMENT_FAILURE,
        payload: error,
    };
};
