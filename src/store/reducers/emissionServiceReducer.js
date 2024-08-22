import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const emissionServiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORT_EMISSIONS_SERVICE_START:
            return { ...state, isLoading: true, error: null, data: null };
        case constants.REPORT_EMISSIONS_SERVICE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.REPORT_EMISSIONS_SERVICE_FAILURE:
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
