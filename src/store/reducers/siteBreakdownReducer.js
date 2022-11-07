import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    site_breakdown: null,
    error: null,
};

export const siteBreakdownReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORTS_SITE_BREAKDOWN_START:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.REPORTS_SITE_BREAKDOWN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                site_breakdown: action.payload,
            };
        case constants.REPORTS_SITE_BREAKDOWN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                site_breakdown: null,
            };
        default:
            return { ...state };
    }
};


export const siteBreakdownListReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORTS_SITE_BREAKDOWN_LIST_START:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.REPORTS_SITE_BREAKDOWN_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                site_breakdown: action.payload,
            };
        case constants.REPORTS_SITE_BREAKDOWN_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                site_breakdown: null,
            };
        default:
            return { ...state };
    }
};
