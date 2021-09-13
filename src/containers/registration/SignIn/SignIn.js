import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import FadeLoader from "react-spinners/FadeLoader";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/FooterItem";
import { loginHeader } from "../../../environment";
import Header from "../../../components/header/Header";
import { showPasswordIcon } from "../../../assets/images";
import { Redirect } from "react-router-dom";
import "./signin.scss";

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
const SignIn = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = useState({
    phone: "",
    password: "",
    notice: null,
    showPassword: false,
    isLoading: false,
    isAuth: false,
    isError: false,
  });

  const [errors, setErrors] = useState({
    phone: "",
    password: "",
  });

  const { phone, password, showPassword, isLoading, isAuth, isError } = state;
  const checkingError = (name, value) => {
    switch (name) {
      case "phone":
        errors[name] = value.length === 0 ? "Required" : "";
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
    if ((phone === "") | (password === "")) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }
    setState({ ...state, isLoading: true });
    if (phone === "test" && password === "test") {
      localStorage.setItem("isAuthenticated", true);
      setState({ ...state, isLoading: false, isAuth: true });
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } else {
      setTimeout(() => {
        setState({ ...state, isLoading: false, isError: true });
      }, 1000);
    }
    // await props.userLogin({ phone, password });
  };

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
              type="text"
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">+44</InputAdornment>
              //   ),
              // }}
              // inputProps={{ maxLength: 10 }}
              className={
                errors["phone"].length > 0 ? classes.error : classes.root
              }
              onChange={(e) => handleChange(e)}
              value={phone}
              // error={errors["phone"].length > 0 ? true : false}
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
              // error={errors["password"].length > 0 ? true : false}
            />
          </div>
          {isLoading && (
            <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
          )}
          {isAuth && (
            <Alert severity={"success"}>{"Customer Login Successfully"}</Alert>
          )}
          {isError && (
            <Alert severity={"error"}>{"Username or Password invalid"}</Alert>
          )}
          <div className="login-next-btn">
            <Button onClick={handleSubmit}>Sign In</Button>
          </div>
          <div className="another-account">
            Don’t have an account? <span>Sign up</span>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
