import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const getWasteReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.GET_WASTE_START:
            return { ...state, isLoading: true, error: null, data: null };
        case constants.GET_WASTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.GET_WASTE_FAILURE:
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
