import TippingService from "../../services/tipping.service";
import * as Constants from "../constants/constants";

//getSites
export const getTippingList = (filters) => {
    return (dispatch) => {
        dispatch(tippingListStart());
        const params = Object.entries(filters).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
        TippingService
            .list(params)
            .then((res) => {
                console.log(res.data.data);
                dispatch(tippingListSuccess(res.data.data));
            })
            .catch((err) => {
                dispatch(tippingListFailure(err.message));
            });
    };
};
export const tippingListStart = () => {
    return {
        type: Constants.TIPPING_LIST_DATA_START,
    };
};

export const tippingListSuccess = (data) => {
    return {
        type: Constants.TIPPING_LIST_DATA_SUCCESS,
        payload: data,
    };
};

export const tippingListFailure = (error) => {
    return {
        type: Constants.TIPPING_LIST_DATA_FAILURE,
        payload: error,
    };
};
