import * as Constants from "../../constants/constants";

const initialState = {
  isAuthed: false,
  isLoading: true,
  error: "",
  name: "",
  access_token: "",
  expires: 0,
  expires_in: 3600,
  permissions: [],
  roles: [],
  uuid: "",
};

const initialStorage = JSON.parse(localStorage.getItem("currentUser"));

function userLogin(state = initialStorage || initialState, action) {
  switch (action.type) {
    case Constants.SET_CURRENT_USER: {
      const date = new Date();
      const now = date.getTime();
      action.currentUser.expires = now + action.currentUser.expires_in * 1000;

      window.axios.defaults.headers.common["Authorization"] =
        "Bearer " + action.currentUser.access_token;

      const newState = {
        ...state,
        isLoading: false,
        ...action.currentUser,
      };

      localStorage.setItem("currentUser", JSON.stringify(newState));

      return newState;
    }
    case Constants.LOGOUT_CURRENT_USER:
      localStorage.removeItem("currentUser");
      return initialState;

    default:
      return state;
  }
}

export default userLogin;
