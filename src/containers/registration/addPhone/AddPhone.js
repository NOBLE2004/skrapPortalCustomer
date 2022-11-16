import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { RECAPTCHA_KEY, registerHeaderData } from "../../../environment";
import "./addphone.scss";
import Header from "../../../components/header/Header";
import Alert from "@mui/lab/Alert";
import { connect } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import { phoneSuccess } from "../../../store/actions/actionPhone";
import FadeLoader from "react-spinners/FadeLoader";
import { userlogin } from "../../../store/actions/signIn";
import authService from "../../../services/auth.service";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/FooterItem";
import ReCAPTCHA from "react-google-recaptcha";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { set } from "date-fns";
import { useCallback } from "react";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29a7df",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29a7df",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#29a7df",
    },
  },

  error: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
  },
});

const AddPhone = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = useState(null);
  const DELAY = 1500;
  const [state, setState] = useState({
    phone: "",
    otp: "",
    isPhone: false,
    code: "",
    isLoading: false,
    verifyCode: "",
    notice: null,
    isMobileVerfied: false,
    password: "",
    isLoginLoading: false,
  });
  const [errors, setErrors] = useState({
    phone: "",
    password: "",
    otp: "",
  });
  const {
    phone,
    otp,
    isPhone,
    code,
    notice,
    verifyCode,
    isMobileVerfied,
    isLoading,
    password,
    isLoginLoading,
  } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "phone":
        setState({ ...state, [name]: value });
        break;
      case "otp":
        setState({ ...state, [name]: value });
        break;
      case "password":
        setState({ ...state, [name]: value });
        break;
      default:
        break;
    }
    checkingError(name, value);
  };

  const checkingError = (name, value) => {
    switch (name) {
      case "phone":
        errors[name] = value.length < 10 ? "Required" : "";
        break;
      case "otp":
        errors[name] = value.length < 6 ? "Required" : "";
        break;
      case "password":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      default:
        break;
    }

    setErrors({ ...errors });
  };

  const getVerficationCode = () => {
    authService
      .getVerificationCode({
        mobile_number: "+44" + phone,
        recaptcha: value,
      })
      .then((res) => {
        setState({
          ...state,
          verifyCode: res.data,
          isPhone: true,
          isLoading: false,
          // @ts-ignore
          notice: {
            type: "success",
            text: res.data.description,
          },
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
          // @ts-ignore
          notice: {
            type: "error",
            text: err.message,
          },
        });
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      Object.keys(errors).forEach((errorName) => {
        // @ts-ignore
        checkingError(errorName, state[errorName]);
      });
      return;
    }
    let data = { mobile: "+44" + phone, user_type: 1 };
    if (isPhone) {
      if (otp.length < 6) {
        Object.keys(errors).forEach((error, index) => {
          // @ts-ignore
          checkingError(error, state[error]);
        });
        return;
      }
      // @ts-ignore
      setState({ ...state, notice: null });
      verifyPinCode();
    } else {
      setState({ ...state, isLoading: true });
      authService
        .checkUserMobile(data)
        .then((res) => {
          if (res.data.code === 0) {
            setTimeout(() => {
              getVerficationCode();
            }, 2000);
          } else {
            setState({ ...state, isLoading: false, isMobileVerfied: true });
          }
        })
        .catch((err) => {
          setState({
            ...state,
            isLoading: false,
            // @ts-ignore
            notice: { type: "error", text: err.message },
          });
        });
    }
  };

  const verifyPinCode = () => {
    setState({ ...state, isLoading: true });
    authService
      .verifyPinCode({
        mobile_number: "+44" + phone,
        pin_code: otp,
      })
      .then((res) => {
        if (res.data.code === 0) {
          props.updatePhone({ phone: phone });
          setState({
            ...state,
            isLoading: false,
            // @ts-ignore
            notice: {
              type: "success",
              text: res.data.description,
            },
          });

          setTimeout(() => {
            history.push("/signup-info");
          }, 2000);
        } else {
          setState({
            ...state,
            isLoading: false,
            // @ts-ignore
            notice: {
              type: "error",
              text: res.data.description,
            },
          });
        }
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
          // @ts-ignore
          notice: {
            type: "error",
            text: err.message,
          },
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if ((phone.length < 10) | (password === "")) {
      Object.keys(errors).forEach((error) => {
        checkingError(error, state[error]);
      });
      return;
    }
    props.userLogin({ phone, password });
  };
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, [props.auth.isAuthenticated]);

  const onVerify = useCallback((token) => {
    setValue(token);
  }, []);

  return (
    <div className="main">
      <NavBar />
      <div className="add-phone-main">
        <Header
          title={registerHeaderData.title}
          description={registerHeaderData.description}
        />
        <div className="add-phone-section">
          <div className="search-section">
            <div className="title">Phone number</div>
            <div className="search-input">
              <TextField
                placeholder="Enter Phone"
                margin="normal"
                variant="outlined"
                size="small"
                name="phone"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+44</InputAdornment>
                  ),
                }}
                inputProps={{ maxLength: 10 }}
                className={
                  errors["phone"].length > 0 ? classes.error : classes.root
                }
                onChange={(e) => handleChange(e)}
                error={errors["phone"].length > 0 ? true : false}
              />
            </div>
            {isPhone && (
              <>
                <div className="otp-title">
                  Kindly enter the 6-digit OTP (one-time password) sent to your
                  phone number via SMS.
                </div>
                <div className="search-input">
                  <TextField
                    placeholder="Enter Otp"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    name="otp"
                    className={
                      errors["otp"].length > 0 ? classes.error : classes.root
                    }
                    onChange={handleChange}
                    error={errors["otp"].length > 0 ? true : false}
                  />
                </div>
              </>
            )}

            {isMobileVerfied && (
              <>
                <div className="password-title">Enter Password</div>
                <TextField
                  margin="normal"
                  variant="outlined"
                  size="small"
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={handleChange}
                  name="password"
                  className={classes.root}
                  error={errors["password"].length > 0 ? true : false}
                />
              </>
            )}
          </div>
          {isLoading ? (
            <div className="notice-alert">
              <FadeLoader color={"#518ef8"} loading={isLoading} width={4} />
            </div>
          ) : (
            <div className="new-notice-alert">
              {notice && (
                // @ts-ignore
                <Alert // @ts-ignore
                  severity={notice.type}
                >
                  {notice.text}
                </Alert>
              )}
            </div>
          )}
          <div>
            {props.auth.loading ? (
              <div className="notice-alert">
                <FadeLoader
                  color={"#518ef8"}
                  loading={props.auth.loading}
                  width={4}
                />
              </div>
            ) : props.auth.isAuthenticated ? (
              // @ts-ignore
              <Alert severity={"success"}>
                {"Customer Login Successfully"}
              </Alert>
            ) : props.auth.error ? (
              // @ts-ignore
              <Alert severity={"error"}>{"Username or Password invalid"}</Alert>
            ) : (
              ""
            )}
          </div>
          <Box mt={3}>
            <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
              <GoogleReCaptcha
                onVerify={(token) => {
                  if (value === null) {
                    onVerify(token);
                  }
                }}
              />
            </GoogleReCaptchaProvider>
          </Box>
          <div className="addphone-next-btn">
            {isMobileVerfied ? (
              <Button
                onClick={handleLogin}
                disabled={password.length < 1 ? true : false}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={phone.length < 10 ? true : false}
              >
                Verify
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
// @ts-ignore
const mapStateToProps = ({ auth, phone }) => {
  return { auth, phone };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePhone: (credential) => dispatch(phoneSuccess(credential)),
    userLogin: (credential) => dispatch(userlogin(credential)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddPhone);
