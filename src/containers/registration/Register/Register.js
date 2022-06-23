import React, {useEffect, useState} from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Alert from "@mui/lab/Alert";
import "./register.scss";
import Header from "../../../components/header/Header";
import { registerHeaderData } from "../../../environment";
import {NavLink, useHistory} from "react-router-dom";
import { connect } from "react-redux";
//import authService from "../../../../services/auth.service";
import FadeLoader from "react-spinners/FadeLoader";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/FooterItem";
import {userSignUp} from "../../../store/actions/signup";
import InputAdornment from "@mui/material/InputAdornment";
import {textFieldStyles} from "../../../assets/styles/muiStyles/MuiStyles";
const Register = (props) => {
  const classes = textFieldStyles();
  const history = useHistory();
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
    if ((firstname === "") | (lastname === "") | (email === "") | (password === "") | (confirmpassword === "")) {
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
    };
    setState({...state, isLoading: true});
    await props.userSignUp(newData);
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
              Already have an account? <NavLink to={`login`}><span>Sign In</span></NavLink>{" "}
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
