import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const landfillDiversion = (state = initialState, action) => {
    switch (action.type) {
        case constants.LANDFILL_DIVERSION_START:
            return { ...state, isLoading: true, error: null, data: null };
        case constants.LANDFILL_DIVERSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.LANDFILL_DIVERSION_FAILURE:
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

export const landfillDiversionList = (state = initialState, action) => {
    switch (action.type) {
        case constants.LANDFILL_DIVERSION_LIST_START:
            return { ...state, isLoading: true, error: null, data: null };
        case constants.LANDFILL_DIVERSION_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.LANDFILL_DIVERSION_LIST_FAILURE:
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

