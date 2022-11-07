import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    data: null,
    error: null,
};

export const reportEmissionVehicle = (state = initialState, action) => {
    switch (action.type) {
        case constants.GET_REPORT_VEHICLE_START:
            return { ...state, isLoading: true, error: null};
        case constants.GET_REPORT_VEHICLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case constants.GET_REPORT_VEHICLE_FAILURE:
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
