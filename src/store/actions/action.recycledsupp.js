import * as Constants from "../constants/constants";
import ReportsService from "../../services/reports.service";

export const getSuppRecycled = (data) => {
    return (dispatch) => {
        dispatch(getRecycledSuppStart());
        ReportsService.getRecycledSupp(data)
            .then((response) => {
                if (Object.keys(response.data).length !== 0) {
                    const siteBreakdown = response.data;
                    dispatch(getRecycledSuppSuccess(siteBreakdown));
                } else {
                    dispatch(getRecycledSuppFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(getRecycledSuppFailure(err.message));
            });
    };
};
export const getRecycledSuppStart = () => {
    return {
        type: Constants.GET_RECYCLED_SUPP_START,
    };
};

export const getRecycledSuppSuccess = (data) => {
    return {
        type: Constants.GET_RECYCLED_SUPP_SUCCESS,
        payload: data,
    };
};

export const getRecycledSuppFailure = (error) => {
    return {
        type: Constants.GET_RECYCLED_SUPP_FAILURE,
        payload: error,
    };
};
