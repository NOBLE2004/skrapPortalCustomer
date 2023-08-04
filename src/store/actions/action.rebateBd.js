import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getRebateBreakdown = (data) => {
    return (dispatch) => {
        dispatch(rebateBreakdownStart());
        ReportsService
            .getRebateBreakdown(data)
            .then((response) => {
                if (response.data.code == 0) {
                    const siteBreakdown = response.data;
                    dispatch(rebateBreakdownSuccess(siteBreakdown));
                } else {
                    dispatch(rebateBreakdownFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(rebateBreakdownFailure(err.message));
            });
    };
};
export const rebateBreakdownStart = () => {
    return {
        type: Constants.REPORTS_REBATE_BREAKDOWN_START,
    };
};

export const rebateBreakdownSuccess = (data) => {
    return {
        type: Constants.REPORTS_REBATE_BREAKDOWN_SUCCESS,
        payload: data,
    };
};

export const rebateBreakdownFailure = (error) => {
    return {
        type: Constants.REPORTS_REBATE_BREAKDOWN_FAILURE,
        payload: error,
    };
};
