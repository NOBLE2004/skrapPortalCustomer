import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    hire_breakdown: null,
    error: null,
};

export const hireBreakdownReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORTS_HIRE_BREAKDOWN_START:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.REPORTS_HIRE_BREAKDOWN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                hire_breakdown: action.payload,
            };
        case constants.REPORTS_HIRE_BREAKDOWN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                hire_breakdown: null,
            };
        default:
            return { ...state };
    }
};
