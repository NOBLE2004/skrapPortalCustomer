import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    site_movements_breakdown: null,
    error: null,
};

export const siteMovementBreakdownReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORTS_SITE_MOVEMENT_BREAKDOWN_START:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.REPORTS_SITE_MOVEMENT_BREAKDOWN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                site_movements_breakdown: action.payload,
            };
        case constants.REPORTS_SITE_MOVEMENT_BREAKDOWN_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                site_movements_breakdown: null,
            };
        default:
            return { ...state };
    }
};
