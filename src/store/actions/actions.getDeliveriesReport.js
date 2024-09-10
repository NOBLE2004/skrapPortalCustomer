import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getDeliveriesReport = (data) => {
    return (dispatch) => {
        dispatch(deliveriesStart());
        ReportsService.getDeliveriesGraph(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    dispatch(deliveriesSuccess(response?.data?.data));
                } else {
                    dispatch(deliveriesFailure(response?.data?.description));
                }
            })
            .catch((err) => {
                dispatch(deliveriesFailure(err.message));
            });
    };
};
export const deliveriesStart = () => {
    return {
        type: Constants.REPORTS_DELIVERIES_START,
    };
};

export const deliveriesSuccess = (data) => {
    return {
        type: Constants.REPORTS_DELIVERIES_SUCCESS,
        payload: data,
    };
};

export const deliveriesFailure = (error) => {
    return {
        type: Constants.REPORTS_DELIVERIES_FAILURE,
        payload: error,
    };
};
