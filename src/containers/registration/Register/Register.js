import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/lab/Alert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import "./register.scss";
import Header from "../../../components/header/Header";
import { registerHeaderData } from "../../../environment";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
//import authService from "../../../../services/auth.service";
import FadeLoader from "react-spinners/FadeLoader";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/FooterItem";
import { userSignUp } from "../../../store/actions/signup";
import InputAdornment from "@mui/material/InputAdornment";
import { textFieldStyles } from "../../../assets/styles/muiStyles/MuiStyles";
import axios from "axios";
const Register = (props) => {
  const classes = textFieldStyles();
  const history = useHistory();
  const [radioButton, setRadioButton] = useState();
  const [value, setValue] = React.useState({});
  const [companyFormData, setCompanyFormData] = React.useState({
    email: "",
    jobTitle: "",
  });
  const [details, setDetails] = useState([]);
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    isLoading: false,
    notice: null,
    isRegistered: false,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const checkingError = (name, value) => {
    switch (name) {
      case "email":
      case "firstname":
      case "lastname":
      case "mobile_number":
      case "password":
      case "confirmpassword":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      default:
        break;
    }
    setErrors({ ...errors });
  };

  const {
    firstname,
    lastname,
    mobile_number,
    email,
    password,
    confirmpassword,
    isLoading,
    notice,
    isRegistered,
  } = state;
  useEffect(() => {
    if (props.auth.isAuthenticated || props.signup.isAuthenticated) {
      setTimeout(() => {
        history.push("/");
        window.location.reload(false);
      }, 2000);
    }
  }, [props.auth.isAuthenticated, props.signup.isAuthenticated]);
  const handleChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    switch (name) {
      case "email":
        setState({ ...state, email: value });
        break;
      case "firstname":
        setState({ ...state, firstname: value });
        break;
      case "lastname":
        setState({ ...state, lastname: value });
        break;
      case "password":
        setState({ ...state, password: value });
        break;
      case "confirmpassword":
        setState({ ...state, confirmpassword: value });
        break;
      default:
        setState({ ...state });
        break;
    }

    checkingError(name, value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      (firstname === "") |
      (lastname === "") |
      (email === "") |
      (password === "") |
      (confirmpassword === "")
    ) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
      alert("email is not correct");
    }
    if (password !== confirmpassword) {
      alert("password does not match");
      return;
    }
    if (!props.phone.phone) {
      alert("phone no is required");
      history.push("/phone");
      return;
    }
    let newData = {
      device_type: 1,
      email: email,
      first_name: firstname,
      invitation_code: "",
      last_name: lastname,
      marketing: false,
      mobile_number: props.phone ? `+44` + props.phone.phone.phone : "",
      password: password,
      referal: "",
      user_name: firstname + lastname,
      user_type: 1,
      vat_number: "",
      title: value?.title,
      company_registration_number: value?.company_registration_number,
      company_address: value?.address_snippet,
      company_email: companyFormData?.email,
      company_registration_date: value?.date_of_creation,
    };
    setState({ ...state, isLoading: true });
    await props.userSignUp(newData);
  };

  const getCompanyDetail = (e) => {
    axios
      .get("https://skrapapis.skrap.app/live/public/scrapapi/findCompany/" + e)
      .then((response) => {
        setDetails(response?.data?.result?.items);
      });
  };

  return (
    <div className="main">
      <NavBar />
      <div className="register-main">
        <Header
          title={registerHeaderData.title}
          description={registerHeaderData.description}
        />
        <div className="register-section">
          <div className="search-input">
            <form noValidate className="search-input">
              <div className="radio-button-in-signup">
                <FormControl sx={{ width: "100%" }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FormControlLabel
                      value="business"
                      control={<Radio />}
                      label="Business"
                      onChange={(e) => {
                        setRadioButton(e.target.value);
                      }}
                    />
                    <FormControlLabel
                      value="one-off"
                      control={<Radio />}
                      label="One-off"
                      onChange={(e) => {
                        setRadioButton(e.target.value);
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {radioButton === "business" && (
                <Grid container justifyContent="space-between">
                  <Grid item xs={12} className="company-fields-sign-up">
                    <Autocomplete
                      value={value}
                      disablePortal
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                      id="controllable-states-demo"
                      freeSolo
                      disableClearable
                      options={details}
                      getOptionLabel={(option) =>
                        option.title ? option.title : ""
                      }
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField
                          value={value ? value : ""}
                          {...params}
                          label="Company name"
                          className={classes.root}
                          onChange={(e) => {
                            getCompanyDetail(e.target.value);
                          }}
                        />
                      )}
                    />
                  </Grid>
                  {value?.address && (
                    <>
                      <Grid item xs={5.8}>
                        <TextField
                          label="Company registration number"
                          margin="normal"
                          variant="outlined"
                          size="small"
                          value={
                            value?.company_number ? value?.company_number : ""
                          }
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                          }}
                          className={classes.root}
                        />
                      </Grid>
                      <Grid item xs={5.8}>
                        <TextField
                          label="Company Address"
                          margin="normal"
                          variant="outlined"
                          size="small"
                          name="Company Address"
                          value={value?.address_snippet}
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                          }}
                          className={classes.root}
                        />
                      </Grid>
                      <Grid item xs={5.8}>
                        <TextField
                          label="Company Email"
                          margin="normal"
                          variant="outlined"
                          type="email"
                          size="small"
                          name="Company Email"
                          value={companyFormData?.email}
                          onChange={(e) => {
                            setCompanyFormData((st) => ({
                              ...st,
                              email: e.target.value,
                            }));
                          }}
                          className={classes.root}
                        />
                      </Grid>
                      <Grid item xs={5.8}>
                        <TextField
                          label="Your job title in the company"
                          margin="normal"
                          variant="outlined"
                          size="small"
                          name="Your job title in the company"
                          value={companyFormData?.jobTitle}
                          onChange={(e) => {
                            setCompanyFormData((st) => ({
                              ...st,
                              jobTitle: e.target.value,
                            }));
                          }}
                          className={classes.root}
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
              )}
              <TextField
                label="First name"
                margin="normal"
                variant="outlined"
                size="small"
                name="firstname"
                value={firstname}
                onChange={handleChange}
                error={errors["firstname"].length > 0 ? true : false}
                className={
                  errors["firstname"].length > 0 ? classes.error : classes.root
                }
              />

              <TextField
                label="Last name"
                margin="normal"
                variant="outlined"
                size="small"
                value={lastname}
                onChange={handleChange}
                name="lastname"
                className={
                  errors["lastname"].length > 0 ? classes.error : classes.root
                }
                error={errors["lastname"].length > 0 ? true : false}
              />
              <TextField
                label="email"
                margin="normal"
                variant="outlined"
                size="small"
                value={email}
                onChange={handleChange}
                name="email"
                className={
                  errors["email"].length > 0 ? classes.error : classes.root
                }
                error={errors["email"].length > 0 ? true : false}
              />
              <TextField
                label="Password"
                margin="normal"
                variant="outlined"
                size="small"
                type="password"
                value={password}
                onChange={handleChange}
                name="password"
                className={
                  errors["password"].length > 0 ? classes.error : classes.root
                }
                error={errors["password"].length > 0 ? true : false}
              />
              <TextField
                label="Confirm Password"
                margin="normal"
                variant="outlined"
                type="password"
                size="small"
                value={confirmpassword}
                onChange={handleChange}
                name="confirmpassword"
                className={
                  errors["password"].length > 0 ? classes.error : classes.root
                }
                error={errors["confirmpassword"].length > 0 ? true : false}
              />
            </form>
          </div>
          <div className="register-loader">
            {props.signup.loading ? (
              <FadeLoader
                color={"#518ef8"}
                loading={props.signup.loading}
                width={4}
              />
            ) : props.signup.isAuthenticated ? (
              <Alert severity={"success"}>{"Sing up Successfull"}</Alert>
            ) : props.signup.error ? (
              <Alert severity={"error"}>{props.signup.error}</Alert>
            ) : (
              ""
            )}
          </div>

          <div className="register-next-btn">
            {isRegistered ? (
              <Button onClick={() => history.push("/booking/signin")}>
                Click for login
              </Button>
            ) : (
              <Button onClick={handleSubmit}>Register</Button>
            )}
          </div>
          <div className="another-account">
            Already have an account?{" "}
            <NavLink to={`login`}>
              <span>Sign In</span>
            </NavLink>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ signup, phone, auth }) => {
  return { signup, phone, auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userSignUp: (credential) => dispatch(userSignUp(credential)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
