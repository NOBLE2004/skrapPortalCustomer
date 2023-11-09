import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const reportWasteEmission = (state = initialState, action) => {
    switch (action.type) {
        case constants.REPORT_WASTE_EMISSIONS_START:
            return { ...state, isLoading: true, error: null};
        case constants.REPORT_WASTE_EMISSIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.REPORT_WASTE_EMISSIONS_FAILURE:
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
