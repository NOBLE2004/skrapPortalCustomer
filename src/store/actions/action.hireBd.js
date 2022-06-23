import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getHireBreakdown = (data) => {
    return (dispatch) => {
        dispatch(hireBreakdownStart());
        ReportsService
            .getHireBreakdown(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const hireBreakdown = response.data;
                    dispatch(hireBreakdownSuccess(hireBreakdown));
                } else {
                    dispatch(hireBreakdownFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(hireBreakdownFailure(err.message));
            });
    };
};
export const hireBreakdownStart = () => {
    return {
        type: Constants.REPORTS_HIRE_BREAKDOWN_START,
    };
};

export const hireBreakdownSuccess = (data) => {
    return {
        type: Constants.REPORTS_HIRE_BREAKDOWN_SUCCESS,
        payload: data,
    };
};

export const hireBreakdownFailure = (error) => {
    return {
        type: Constants.REPORTS_HIRE_BREAKDOWN_FAILURE,
        payload: error,
    };
};
