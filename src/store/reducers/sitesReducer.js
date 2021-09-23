import * as constants from "../constants/constants";
const initialState = {
  isLoading: false,
  siteData: null,
  error: null,
};

export const sitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SITES_LIST_DATA_START:
      return { ...state, isLoading: true, error: null, siteData: null };
    case constants.SITES_LIST_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        siteData: action.payload,
      };
    case constants.SITES_LIST_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        siteData: null,
      };
    default:
      return { ...state };
  }
};
