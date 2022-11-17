import * as constants from "../constants/constants";
const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const allCounteriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ALL_COUNTERIES_LIST:
      return { ...state, isLoading: true, error: null, data: null };
    case constants.ALL_COUNTERIES_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case constants.ALL_COUNTERIES_LIST_FAILURE:
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
