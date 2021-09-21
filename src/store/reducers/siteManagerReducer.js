import * as constants from "../constants/constants";
const initialState = {
  loading: false,
  sites: null,
  error: null,
};

export const siteManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SITE_MANAGER_DATA_START:
      return { ...state, loading: true, error: null, sites: null };
    case constants.SITE_MANAGER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        sites: action.payload,
      };
    case constants.SITE_MANAGER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        sites: null,
      };
    default:
      return { ...state };
  }
};
