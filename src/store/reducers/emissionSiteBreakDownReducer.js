import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const reportEmissionSiteBreakDown = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORT_EMISSIONS_SITE_BREAKDOWN_START:
            return { ...state, isLoading: true, error: null};
        case constants.REPORT_EMISSIONS_SITE_BREAKDOWN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.REPORTS_SITE_MOVEMENT_BREAKDOWN_FAILURE:
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
