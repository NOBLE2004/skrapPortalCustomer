import * as Constants from "../constants/constants";

export const loginUser = (creds) => async (dispatch) => {};

export const logoutUser = () => {
  return {
    type: Constants.LOGOUT_REQUEST,
  };
};

export const unsetCurrentUser = () => ({
  type: Constants.UNSET_CURRENT_USER,
});

export const refreshTokenPending = () => ({
  type: Constants.REFRESH_TOKEN_PENDING,
});

export const refreshTokenSuccess = (response) => ({
  type: Constants.REFRESH_TOKEN_SUCCESS,
  currentUser: response.data.data,
});

export const refreshTokenError = (error) => ({
  type: Constants.REFRESH_TOKEN_ERROR,
  error: error,
});

// export function refreshToken() {
//   return (dispatch) => {
//     dispatch(refreshTokenPending());
//     window.API.Misc.RefreshUserAuthToken({})
//       .then((response) => {
//         dispatch(refreshTokenSuccess(response));
//       })
//       .catch((error) => {
//         const errorMessage = handleError(error);
//         dispatch(refreshTokenError(errorMessage));
//       });
//   };
// }
