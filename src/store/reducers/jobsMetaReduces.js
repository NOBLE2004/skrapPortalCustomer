import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const totalSites = (state = initialState, action) => {
    switch (action.type) {
        case constants.JOBS_META_START:
            return { ...state, isLoading: true, error: null, reports: null };
        case constants.JOBS_META_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.JOBS_META_FAILURE:
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
