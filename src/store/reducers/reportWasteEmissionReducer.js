import * as constants from "../constants/constants";
const initialState = {
  isLoading: false,
  data: null,
  error: null,
};

export const wasteEmissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.REPORTS_WASTE_EMISSION_START:
      return { ...state, isLoading: true, error: null, data: null };
    case constants.REPORTS_WASTE_EMISSION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case constants.REPORTS_WASTE_EMISSION_FAILURE:
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
