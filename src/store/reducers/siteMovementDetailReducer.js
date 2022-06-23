import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const siteMovementDetail = (state = initialState, action) => {
    switch (action.type) {
        case constants.SITE_MOVEMENTS_DETAIL:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.SITE_MOVEMENT_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.SITE_MOVEMENT_DETAIL_FAILURE:
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
