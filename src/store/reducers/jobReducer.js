import * as constants from "../constants/constants";
const initialState = {
    isLoading: false,
    jobData: null,
    error: null,
    job: null
};

export const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.JOB_LIST_DATA_START:
            return { ...state, isLoading: true, error: null, jobData: null };
        case constants.JOB_LIST_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                jobData: action.payload,
            };
        case constants.JOB_LIST_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                jobData: null,
            };
        case constants.JOB_DATA_START:
            return { ...state, isLoading: true, error: null, job: null };
        case constants.JOB_DATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: null,
                job: action.payload,
            };
        case constants.JOB_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
                job: null,
            };
        default:
            return { ...state };
    }
};
