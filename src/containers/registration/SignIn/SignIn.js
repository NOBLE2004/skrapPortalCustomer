/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Box, Button, FormControlLabel, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Container, Grid } from "@mui/material";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Alert from "@mui/lab/Alert";
import FadeLoader from "react-spinners/FadeLoader";
import InputAdornment from "@mui/material/InputAdornment";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/FooterItem";
import { loginHeader } from "../../../environment";
import Header from "../../../components/header/Header";
import { showPasswordIcon } from "../../../assets/images";
import { textFieldStyles } from "../../../assets/styles/muiStyles/MuiStyles";
import { userlogin } from "../../../store/actions/signIn";
import Checkbox from "@mui/material/Checkbox";
import PhoneInput from "react-phone-input-2";
import "./signin.scss";
import { getAllCounteries } from "../../../store/actions/action.counteries";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = textFieldStyles();
  const [state, setState] = useState({
    phone: "",
    password: "",
    notice: null,
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  const { phone, password, showPassword } = state;
  const checkingError = (name, value) => {
    switch (name) {
      case "phone":
        errors[name] = value.length < 10 || value.length > 15 ? "Required" : "";
        break;
      case "password":
        errors[name] = value.length === 0 ? "Required" : "";
        break;

      default:
        break;
    }
    setErrors({ ...errors });
  };
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "phone":
        setState({ ...state, phone: value });
        break;
      case "password":
        setState({ ...state, password: value });
        break;

      default:
        setState({ ...state });
        break;
    }

    checkingError(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((phone.length < 10 || phone.length > 15) | (password === "")) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }

    let data = {
      user_name: "+" + state?.phone,
      password: password,
      user_type: 1,
    };
    await props.userLogin(data);
  };

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      setTimeout(() => {
        history.push("/");
        window.location.reload(false);
      }, 2000);
    }
  }, [props.auth.isAuthenticated]);

  useEffect(() => {
    if (!props?.allCounteries?.data) {
      dispatch(getAllCounteries());
    }
  }, [props?.allCounteries?.data]);

  const handlePhoneChange = (value) => {
    setState((st) => ({
      ...st,
      phone: value,
    }));
    checkingError("phone", value);
  };

  return (
    <div className="main">
      <NavBar />
      <div className="login-main">
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <Header
                title={loginHeader.title}
                description={loginHeader.description}
              />
              <Grid container justifyContent="center">
                <Grid item md={6} xs={8}>
                  <div className="login-section">
                    {props?.allCounteries?.isLoading ? (
                      <Box
                        className=""
                        display="flex"
                        mb={5}
                        justifyContent="center"
                      >
                        <FadeLoader
                          color={"#518ef8"}
                          loading={props?.allCounteries?.isLoading}
                          width={4}
                        />
                      </Box>
                    ) : (
                      <div className="search-input">
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "DM Sans",
                            fontWeight: 800,
                            color: " #0f2851",
                            marginBottom: "5px",
                            width: "100%",
                          }}
                        >
                          Username:
                        </Typography>

                        <PhoneInput
                          country={"gb"}
                          name="phone"
                          countryCodeEditable={false}
                          enableLongNumbers={true}
                          onlyCountries={
                            props?.allCounteries?.data
                              ? props?.allCounteries?.data
                              : []
                          }
                          inputClass={
                            errors["phone"].length > 0
                              ? "error-class"
                              : "root-class"
                          }
                          buttonClass={
                            errors["phone"].length > 0
                              ? "error-class-drop"
                              : "root-class-drop"
                          }
                          inputProps={{
                            name: "phone",
                            required: true,
                            autoFocus: true,
                          }}
                          onChange={(e) => handlePhoneChange(e)}
                        />

                        {/* <TextField
                        placeholder="Enter Username"
                        margin="normal"
                        variant="outlined"
                        size="small"
                        name="phone"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              +44
                            </InputAdornment>
                          ),
                        }}
                        inputProps={{ maxLength: 10 }}
                        className={
                          errors["phone"].length > 0
                            ? classes.error
                            : classes.root
                        }
                        onChange={(e) => handleChange(e)}
                        value={phone}
                        error={errors["phone"].length > 0 ? true : false}
                      /> */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontFamily: "DM Sans",
                            fontWeight: 800,
                            color: " #0f2851",
                            marginBottom: "5px",
                            width: "100%",
                          }}
                        >
                          Password:
                        </Typography>

                        <TextField
                          margin="normal"
                          variant="outlined"
                          size="small"
                          placeholder="password"
                          type={showPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <img
                                  src={showPasswordIcon}
                                  alt="show-password"
                                  onClick={() =>
                                    setState({
                                      ...state,
                                      showPassword: !showPassword,
                                    })
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </InputAdornment>
                            ),
                          }}
                          className={
                            errors["password"].length > 0
                              ? classes.error
                              : classes.root
                          }
                          value={password}
                          onChange={(e) => handleChange(e)}
                          name="password"
                          inputProps={() => {}}
                          error={errors["password"].length > 0 ? true : false}
                        />
                        <div>
                          {props.auth.loading ? (
                            <Box display="flex" justifyContent="center">
                              <FadeLoader
                                color={"#518ef8"}
                                loading={true}
                                width={4}
                              />
                            </Box>
                          ) : props.auth.isAuthenticated ? (
                            <Alert severity={"success"}>
                              {"Customer Login Successfully"}
                            </Alert>
                          ) : props.auth.error ? (
                            <Alert severity={"error"}>
                              {"Username or Password invalid"}
                            </Alert>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="login-next-btn">
                          <Button
                            sx={{ color: "#ffffff" }}
                            onClick={handleSubmit}
                          >
                            Sign In
                          </Button>
                        </div>
                        <Box width="100%" mb={2}>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            sx={{ alignItems: "flex-start" }}
                            label={
                              <Typography
                                variant="caption"
                                sx={{
                                  fontFamily: "DM Sans",
                                  fontWeight: 500,
                                  color: " #0f2851",
                                }}
                              >
                                Stay logged in.This is a trusted computer
                                <br />
                                You will be logged out automatically after a
                                short while unless you indicate that this is
                                trusted computer.
                              </Typography>
                            }
                          />
                        </Box>
                        <div className="another-account-sign-up">
                          Don’t have an account?{" "}
                          <NavLink to={`signup`}>
                            <span>Sign Up</span>
                          </NavLink>{" "}
                        </div>
                        <div className="another-account">
                          <NavLink to={`forget-password`}>
                            <span>Forget your password?</span>
                          </NavLink>{" "}
                        </div>
                      </div>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <div className="login-section"></div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ auth, allCounteries }) => {
  return { auth, allCounteries };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (credential) => dispatch(userlogin(credential)),
    getAllCounteries: (credential) => dispatch(getAllCounteries(credential)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
