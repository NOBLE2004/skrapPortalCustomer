import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    site_breakdown: null,
    error: null,
};

export const rebateBreakdownReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORTS_REBATE_BREAKDOWN_START:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.REPORTS_REBATE_BREAKDOWN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                rebate_breakdown: action.payload,
            };
        case constants.REPORTS_REBATE_BREAKDOWN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                rebate_breakdown: null,
            };
        default:
            return { ...state };
    }
};
