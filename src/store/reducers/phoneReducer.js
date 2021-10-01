import * as actionTypes from "../constants/constants";

const initialState = {
  loading:null ,
  phone:null,
  error:null
};

export const phoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PHONE_START:
      return {
        ...state,
        loading: true,
        phone: null,
        error: null,
      };
    case actionTypes.PHONE_SUCCESS:
      return {
        ...state,
        loading: false,
        phone: action.payload,
        error: null,
      };
    case actionTypes.PHONE_FAILURE:
      return {
        ...state,
        loading: false,
        phone: null,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
