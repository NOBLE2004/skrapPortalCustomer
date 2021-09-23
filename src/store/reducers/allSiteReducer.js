import * as constants from "../constants/constants";
const initialState = {
  isLoading: false,
  data:null,
  error: null,
};

export const allSiteReducer = (state = initialState, action) => {
  switch (action.type) {
      case constants.SITES_DATA_START:
        return { ...state, isLoading: true, error: null , data: null };
      case constants.SITES_DATA_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: null,
          data : action.payload
        };
      case constants.SITES_DATA_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          data:null
        };
      
    default:
      return { ...state };
  }
};