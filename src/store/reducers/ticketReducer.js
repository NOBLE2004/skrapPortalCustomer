import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    ticketList: null,
    error: null,
};

export const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.TICKETS_LIST_DATA_START:
            return { ...state, isLoading: true, error: null, ticketList: null };
        case constants.TICKETS_LIST_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                ticketList: action.payload,
            };
        case constants.TICKETS_LIST_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                ticketList: null,
            };
        default:
            return { ...state };
    }
};
