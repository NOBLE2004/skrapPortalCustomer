import * as constants from "../constants/constants"
const initialState = {
    isAuthenticated:false,  
    loading: false,
    user: null,
    error: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case constants.LOGIN_START:
        return { ...state, loading: true, error: null, user: null , isAuthenticated:false };
      case constants.LOGIN_SUCCESS:
        return { ...state, loading: false, error: null, user: action.payload , isAuthenticated:true};
      case constants.LOGIN_FAILURE:
        return { ...state, loading: false, error: action.payload, user: null , isAuthenticated:false };
      default:
        return { ...state };
    }
  };
  