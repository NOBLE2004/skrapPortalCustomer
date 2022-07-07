import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const getRecycledReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.GET_RECYCLED_START:
            return { ...state, isLoading: true, error: null, data: null };
        case constants.GET_RECYCLED_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.GET_RECYCLED_FAILURE:
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
