import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Container, Grid } from "@mui/material";
import { NavLink } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/FooterItem";
import { forgetPasswordHeader } from "../../../environment";
import Header from "../../../components/header/Header";
import { textFieldStyles } from "../../../assets/styles/muiStyles/MuiStyles";
import "../SignIn/signin.scss";
import authService from "../../../services/auth.service";
import toast from "react-hot-toast";

const ForgetPassword = (props) => {
  const classes = textFieldStyles();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    phone: "",
    notice: null,
  });

  const [errors, setErrors] = useState({
    phone: "",
  });

  const checkingError = (name, value) => {
    switch (name) {
      case "email":
        errors[name] = value.length < 10 ? "Required" : "";
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
      case "email":
        setState({ ...state, phone: value });
        break;

      default:
        setState({ ...state });
        break;
    }

    checkingError(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = { email: state?.phone, user_type: 1 };
    authService
      .forgetPassword(data)
      .then((response) => {
        if (response?.data?.code === 0) {
          toast.success("A request have been recieved check your email");
          setState({ phone: "" });
        } else {
          toast.error(response?.data?.description);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong try again");
      });
  };

  return (
    <div className="main">
      <NavBar />
      <div className="login-main">
        <Container>
          <form onSubmit={handleSubmit}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={8}>
                <Grid container justifyContent="center">
                  <Grid item xs={12} md={10}>
                    <Header
                      title={forgetPasswordHeader.title}
                      description={forgetPasswordHeader.description}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <Grid item md={6} xs={10}>
                    <div className="login-section">
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
                          Email:
                        </Typography>

                        <TextField
                          placeholder="Enter your email"
                          margin="normal"
                          variant="outlined"
                          size="small"
                          type="email"
                          required
                          InputLabelProps={{ required: true }}
                          name="email"
                          className={classes.root}
                          onChange={(e) => handleChange(e)}
                          value={state?.phone}
                        />
                        <div>
                          {loading && (
                            <Box display="flex" justifyContent="center">
                              <FadeLoader
                                color={"#518ef8"}
                                loading={true}
                                width={4}
                              />
                            </Box>
                          )}
                        </div>

                        <div className="login-next-btn">
                          <Button type="submit" sx={{ color: "#ffffff" }}>
                            Send
                          </Button>
                        </div>

                        <div className="another-account">
                          Don’t have an account?{" "}
                          <NavLink to={`signup`}>
                            <span>Sign Up</span>
                          </NavLink>{" "}
                        </div>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
