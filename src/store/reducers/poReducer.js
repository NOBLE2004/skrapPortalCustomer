import * as actionTypes from "../constants/constants";

const initialState = {
  poData:null,
};

export const poReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PO_DATA_START:
      return {
        ...state,
        poData: null,
      };
    case actionTypes.PO_DATA_SUCCESS:
      return {
        ...state,
        poData: action.payload,
      };
    default:
      return { ...state };
  }
};
