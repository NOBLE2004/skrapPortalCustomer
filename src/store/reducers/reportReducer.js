import * as constants from "../constants/constants";
const initialState = {
  isLoading: false,
  reports: null,
  error: null,
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.REPORTS_START:
      return { ...state, isLoading: true, error: null, reports: null };
    case constants.REPORTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        reports: action.payload,
      };
    case constants.REPORTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        reports: null,
      };
    default:
      return { ...state };
  }
};
