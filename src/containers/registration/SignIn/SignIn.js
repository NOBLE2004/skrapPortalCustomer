import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
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
import "./signin.scss";

const SignIn = (props) => {
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
        errors[name] = value.length < 10 ? "Required" : "";
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
    if ((phone.length < 10) | (password === "")) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }

    let data = { user_name: "+44" + phone, password: password, user_type: 1 };
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


  return (
    <div className="main">
      <NavBar />
      <div className="login-main">
        <Header
          title={loginHeader.title}
          description={loginHeader.description}
        />
        <div className="login-section">
          <div className="search-input">
            <TextField
              placeholder="Enter Username"
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
              value={phone}
              error={errors["phone"].length > 0 ? true : false}
            />
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
                        setState({ ...state, showPassword: !showPassword })
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </InputAdornment>
                ),
              }}
              className={
                errors["password"].length > 0 ? classes.error : classes.root
              }
              value={password}
              onChange={(e) => handleChange(e)}
              name="password"
              inputProps={() => {}}
              error={errors["password"].length > 0 ? true : false}
            />
          </div>
          {props.auth.loading ? (
            <FadeLoader
              color={"#29a7df"}
              loading={props.auth.loading}
              width={4}
            />
          ) : props.auth.isAuthenticated ? (
            <Alert severity={"success"}>{"Customer Login Successfully"}</Alert>
          ) : props.auth.error ? (
            <Alert severity={"error"}>{"Username or Password invalid"}</Alert>
          ) : (
            ""
          )}
          <div className="login-next-btn">
            <Button onClick={handleSubmit}>Sign In</Button>
          </div>
          <div className="another-account">
            Don’t have an account? <NavLink to={`phone`}><span>Sign Up</span></NavLink>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (credential) => dispatch(userlogin(credential)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
