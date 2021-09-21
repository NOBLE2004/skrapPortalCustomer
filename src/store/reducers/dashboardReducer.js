import * as constants from "../constants/constants";
const initialState = {
  loading: false,
  info: null,
  error: null,
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.DASHBOARD_DATA_START:
      return { ...state, loading: true, error: null, info: null };
    case constants.DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        info: action.payload,
      };
    case constants.DASHBOARD_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        info: null,
      };
    default:
      return { ...state };
  }
};
