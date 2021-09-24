import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    tippingList: null,
    error: null,
};

export const tippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.TIPPING_LIST_DATA_START:
            return { ...state, isLoading: true, error: null, tippingList: null };
        case constants.TIPPING_LIST_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                tippingList: action.payload,
            };
        case constants.TIPPING_LIST_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                tippingList: null,
            };
        default:
            return { ...state };
    }
};
