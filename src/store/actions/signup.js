import authService from "../../services/auth.service";
import * as Constants from "../constants/constants";

export const userSignUp = (data) => {
    return (dispatch) => {
        dispatch(signUpStart());
        authService.signup(data)
            .then((response) => {
                if (Object.keys(response.data.result).length !== 0) {
                    localStorage.setItem("isAuthenticated", true);
                    localStorage.setItem("token", response.data.result.token);
                    localStorage.setItem("user_id", response.data.result.user_id);
                    localStorage.setItem("c_d_storage", JSON.stringify(response.data.result));
                    dispatch(signUpSuccess(response.data.result));
                } else {
                    dispatch(signUpFailure(response.data.description));
                }
            })
            .catch((err) => {
                dispatch(signUpFailure(err.message));
            });
    };
};

export const signUpStart = () => {
    return {
        type: Constants.SIGNUP_START,
    };
};

export const signUpSuccess = (data) => {
    return {
        type: Constants.SIGNUP_SUCCESS,
        payload: data,
    };
};

export const signUpFailure = (error) => {
    return {
        type: Constants.SIGNUP_FAILURE,
        payload: error,
    };
};

