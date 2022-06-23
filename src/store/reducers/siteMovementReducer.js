import * as constants from "../constants/constants";
import {REPORTS_SITE_MOVEMENT_START} from "../constants/constants";
const initialState = {
    isLoading: false,
    site_movements: null,
    error: null,
};

export const siteMovementReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORTS_SITE_MOVEMENT_START:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.REPORTS_SITE_MOVEMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                site_movements: action.payload,
            };
        case constants.REPORTS_SITE_MOVEMENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                site_movements: null,
            };
        default:
            return { ...state };
    }
};
