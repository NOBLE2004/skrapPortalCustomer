import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import FadeLoader from "react-spinners/FadeLoader";
import InputAdornment from "@material-ui/core/InputAdornment";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/FooterItem";
import { loginHeader } from "../../../environment";
import Header from "../../../components/header/Header";
import { showPasswordIcon } from "../../../assets/images";
import { textFieldStyles } from "../../../assets/styles/muiStyles/MuiStyles";
import AuthService from "../../../services/auth.service";
import "./signin.scss";

const SignIn = (props) => {
  const history = useHistory();
  const classes = textFieldStyles();
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
    if ((phone === "") | (password === "")) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }

    let data = { user_name: "+44" + phone, password: password, user_type: 1 };
    setState({ ...state, isLoading: true });
    AuthService.login(data)
      .then((res) => {
       
        if (Object.keys(res.data.result).length !== 0) {
          localStorage.setItem("token", res.data.result.token);
          localStorage.setItem("isAuthenticated", true);
          localStorage.setItem("userId", res.data.result.user_id);
          setState({
            ...state,
            isLoading: false,
            isAuth: true,
            isError: false,
          });
          setTimeout(() => {
            history.push("/");
            window.location.reload(false);
          }, 1000);
          
        } else {
          setState({
            ...state,
            isLoading: false,
            isError: true,
            isAuth: false,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        setState({ ...state, isLoading: false, isError: true, isAuth: false });
      });

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
