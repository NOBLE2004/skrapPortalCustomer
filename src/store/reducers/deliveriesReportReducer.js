import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const deliveriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORTS_DELIVERIES_START:
            return { ...state, isLoading: true, error: null, data: null };
        case constants.REPORTS_DELIVERIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.REPORTS_DELIVERIES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                data: null,
            };
        default:
            return { ...state };
    }
};
