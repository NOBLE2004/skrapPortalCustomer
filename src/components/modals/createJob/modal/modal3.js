/* eslint-disable import/no-anonymous-default-export */
import {
  Box,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
// const SignUp = dynamic(() => import("./signUpForm"));

import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Minus from "../../../../assets/images/minus.svg";
import Plus from "../../../../assets/images/plus-count.svg";

import CircularProgress from "@mui/material/CircularProgress";

export default (props) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        color: "#0f2851",
      },
    },
  };
  const [counter, setCounter] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wasteTypeList, setWasteTypeList] = useState([]);
  const [checkMobile, setCheckMobile] = useState({
    otp: false,
    password: false,
    otpValue: "",
    passwordValue: "",
    otpError: false,
    passwordError: false,
    signIn: false,
  });
  const state = useSelector((state) => state?.subService);
  const orderState = useSelector((state) => state?.order);
  const { handleValue } = props;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      paritialVisibilityGutter: 20,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      paritialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      paritialVisibilityGutter: 20,
    },
  };

  const handleCounter = (value) => {};

  const handleSubmit = () => {
    // if (checkMobile.password === true) {
    // } else if (checkMobile.otp === true) {
    //   authService
    //     .verifyPinCode({
    //       mobile_number: `+44${orderState?.phone}`,
    //       pin_code: checkMobile?.otpValue,
    //     })
    //     .then((response) => {
    //       if (response?.data?.code === 14) {
    //         setCheckMobile((st) => ({
    //           ...st,
    //           otpError: true,
    //         }));
    //       } else {
    //         setCheckMobile((st) => ({
    //           ...st,
    //           otpError: false,
    //           signIn: true,
    //         }));
    //       }
    //     });
    // } else {
    //   addphoneService
    //     .checkMobile({
    //       mobile: `+44${orderState?.phone}`,
    //       user_type: 1,
    //     })
    //     .then((response) => {
    //       if (response?.data?.code === 1) {
    //         setCheckMobile((st) => ({
    //           ...st,
    //           password: true,
    //           otp: false,
    //         }));
    //       }
    //       if (response?.data?.code === 0) {
    //         addphoneService
    //           .checkOpt({
    //             mobile_number: `+44${orderState?.phone}`,
    //           })
    //           .then((response) => {
    //             setCheckMobile((st) => ({
    //               ...st,
    //               otp: true,
    //               password: false,
    //             }));
    //           });
    //       }
    //     });
    // }
  };

  useEffect(() => {
    // setLoading(true);
    // Service.getWasteType({})
    //   .then((response) => {
    //     setWasteTypeList(response?.data?.result);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //     setLoading(false);
    //   });
  }, []);

  const handleChange = (event) => {
    // eslint-disable-next-line prefer-const
    console.log("change");
    let { name, value } = event.target;
    if (name == "waste_type") {
      value = typeof value === "string" ? value.split(",") : value;
    }
  };

  const service = [
    {
      id: "1",
      name: "skip",
      price: 123,
    },
    {
      id: "2",
      name: "grab",
      price: 456,
    },
  ];

  return (
    <>
      {typeof window !== "undefined" && checkMobile.signIn ? (
        ""
      ) : (
        // <SignUp handleValue={handleValue} />
        <>
          <Grid container marginTop={2}>
            <Grid item xs={12}>
              <label className="img-caption">Phone number</label>
              <FormControl
                fullWidth
                size="small"
                sx={
                  orderState?.phone?.length < 10
                    ? {
                        border: "1px solid red",
                        borderRadius: "16px",
                        marginTop: "10px",
                        background: "#fff",
                      }
                    : {
                        background: "#fff",
                        borderRadius: "16px",
                        marginTop: "10px",
                        border: "1px solid #fff",
                      }
                }
              >
                <TextField
                  placeholder="Enter Phone"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  name="phone"
                  value={orderState?.phone ? orderState?.phone : ""}
                  onChange={(e) => {
                    setCheckMobile((st) => ({
                      ...st,
                      otp: false,
                      otpError: false,
                      password: false,
                    }));
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+44</InputAdornment>
                    ),
                  }}
                  inputProps={{ maxLength: 10, minLength: 10 }}
                  sx={{
                    margin: 0,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
          {checkMobile.password && (
            <Grid container marginTop={2}>
              <Grid item xs={12}>
                <label className="img-caption">Enter Password</label>
                <FormControl
                  fullWidth
                  size="small"
                  sx={
                    checkMobile?.passwordValue === "" ||
                    checkMobile?.passwordError
                      ? {
                          border: "1px solid red",
                          borderRadius: "16px",
                          marginTop: "10px",
                          background: "#fff",
                        }
                      : {
                          background: "#fff",
                          borderRadius: "16px",
                          marginTop: "10px",
                          border: "1px solid #fff",
                        }
                  }
                >
                  <TextField
                    placeholder="Enter Password"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    name="phone"
                    value={
                      checkMobile?.passwordValue
                        ? orderState?.passwordValue
                        : ""
                    }
                    onChange={(e) => {
                      setCheckMobile((st) => ({
                        ...st,
                        passwordValue: e.target.value,
                        passwordError: false,
                      }));
                    }}
                    sx={{
                      margin: 0,
                    }}
                  />
                </FormControl>
                {checkMobile?.passwordError && (
                  <FormHelperText sx={{ color: "red", mt: 1 }}>
                    Username or password is invalid
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          )}
          {checkMobile.otp && (
            <Grid container marginTop={2}>
              <Grid item xs={12}>
                <label className="img-caption">
                  Kindly enter the 6-digit OTP (one-time password) sent to your
                  phone number via SMS.
                </label>
                <FormControl
                  fullWidth
                  size="small"
                  sx={
                    checkMobile?.otpValue?.length < 6 || checkMobile.otpError
                      ? {
                          border: "1px solid red",
                          borderRadius: "16px",
                          marginTop: "10px",
                          background: "#fff",
                        }
                      : {
                          background: "#fff",
                          borderRadius: "16px",
                          marginTop: "10px",
                          border: "1px solid #fff",
                        }
                  }
                >
                  <TextField
                    placeholder="Enter Otp"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    name="phone"
                    value={checkMobile?.otpValue ? checkMobile?.otpValue : ""}
                    onChange={(e) => {
                      setCheckMobile((st) => ({
                        ...st,
                        otpValue: e.target.value,
                        otpError: false,
                      }));
                    }}
                    inputProps={{ maxLength: 6, minLength: 6 }}
                    sx={{
                      margin: 0,
                    }}
                  />
                </FormControl>
                {checkMobile?.otpError && (
                  <FormHelperText sx={{ color: "red", mt: 1 }}>
                    Pin does not match
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          )}
          <Grid container spacing={1} marginTop={1}>
            <Grid item xs={12}>
              <label className="img-caption">Select size </label>
              <Box marginTop={1}>
                <Carousel
                  responsive={responsive}
                  partialVisbile
                  showDots={false}
                  arrows={false}
                >
                  {service?.map((single) => (
                    <div
                      className="image-modal-main "
                      key={single?.id}
                      style={
                        single?.sub_service_id ===
                        orderState?.subService?.sub_service_id
                          ? {
                              background:
                                "linear-gradient(180deg, #73C6F9 0%, #5391F9 100%)",
                            }
                          : {}
                      }
                    >
                      <h2
                        className="skip-yard-title"
                        style={
                          single?.sub_service_id ===
                          orderState?.subService?.sub_service_id
                            ? {
                                color: "#fff",
                              }
                            : {}
                        }
                      >
                        {single?.name}
                      </h2>

                      <p
                        className="img-caption mt-5"
                        style={
                          single?.sub_service_id ===
                          orderState?.subService?.sub_service_id
                            ? {
                                color: "#fff",
                                textAlign: "left",
                              }
                            : {
                                textAlign: "left",
                              }
                        }
                      >
                        {`£${single?.price}`}
                      </p>

                      {single?.sub_service_id ===
                      orderState?.subService?.sub_service_id ? (
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          bgcolor="#fff"
                          paddingX={2}
                          paddingY={0.5}
                          sx={{
                            borderRadius: "8px",
                          }}
                          mt={2}
                        >
                          <Box
                            className="pointer"
                            onClick={() => {
                              handleCounter("minus");
                            }}
                          >
                            <img
                              style={{
                                height: "12px",
                                width: "12px",
                              }}
                              src={Minus}
                              alt=""
                            />
                          </Box>
                          <Box>
                            <p
                              className="img-caption"
                              style={{
                                color: "#60A0F8",
                              }}
                            >
                              {counter}
                            </p>
                          </Box>
                          <Box
                            className="pointer"
                            onClick={() => {
                              handleCounter("plus");
                            }}
                          >
                            <img
                              style={{
                                height: "12px",
                                width: "12px",
                              }}
                              src={Plus}
                              alt=""
                            />
                          </Box>
                        </Box>
                      ) : (
                        <p
                          className="add-new-skip mt-20 pointer"
                          onClick={() => {}}
                        >
                          Add
                        </p>
                      )}
                    </div>
                  ))}
                </Carousel>
              </Box>
            </Grid>
          </Grid>
          <Grid container marginTop={2}>
            <Grid item xs={12}>
              <label className="img-caption">Waste type</label>
              <FormControl
                fullWidth
                size="small"
                sx={{
                  background: "#fff",
                  borderRadius: "16px",
                  marginTop: "10px",
                }}
              >
                {loading ? (
                  <Box display="flex" justifyContent="center" paddingY={1}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Select
                    displayEmpty
                    multiple
                    name="waste_types"
                    value={orderState?.wastes}
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    renderValue={(selected) => {
                      if (selected?.length === 0) {
                        return <em>Waste Types</em>;
                      }

                      return `${selected?.length} type(s) selected`;
                    }}
                    sx={{ width: "100%" }}
                    inputProps={{
                      placeholder: "Waste Type",
                      labelShrink: true,
                    }}
                    size={"small"}
                  >
                    {wasteTypeList.map((waste) => {
                      return (
                        <MenuItem
                          sx={{
                            fontFamily: "DM Sans",
                            fontSize: "14px",
                            fontWeight:
                              orderState?.wastes?.indexOf(waste.id) > -1
                                ? 600
                                : 400,
                          }}
                          key={waste.id}
                          value={waste.id}
                        >
                          {waste.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} marginTop={1}>
            <Grid item xs={12}>
              <label className="img-caption">Skip type </label>
              <Grid
                container
                sx={{
                  background: "#fff",
                  padding: "2px",
                  borderRadius: "16px",
                }}
                justifyContent="space-between"
                marginTop={1}
              >
                <Grid
                  item
                  xs={3.5}
                  padding={1}
                  className="pointer"
                  sx={
                    orderState?.skipType === "Off-road"
                      ? {
                          background:
                            "linear-gradient(180deg, #73C6F9 0%, #5391F9 100%)",
                          borderRadius: "16px",
                        }
                      : {}
                  }
                  onClick={() => {}}
                >
                  <p
                    className="img-caption"
                    style={
                      orderState?.skipType === "Off-road"
                        ? { color: "#fff" }
                        : {}
                    }
                  >
                    Off-road
                  </p>
                </Grid>
                <Grid
                  item
                  xs={3.5}
                  padding={1}
                  className="pointer"
                  sx={
                    orderState?.skipType === "Wait & Load"
                      ? {
                          background:
                            "linear-gradient(180deg, #73C6F9 0%, #5391F9 100%)",
                          borderRadius: "16px",
                        }
                      : {}
                  }
                  onClick={() => {}}
                >
                  <p
                    className="img-caption"
                    style={
                      orderState?.skipType === "Wait & Load"
                        ? { color: "#fff" }
                        : {}
                    }
                  >
                    Wait & Load
                  </p>
                </Grid>
                <Grid
                  item
                  xs={3.5}
                  padding={1}
                  className="pointer"
                  sx={
                    orderState?.skipType === "On-Road"
                      ? {
                          background:
                            "linear-gradient(180deg, #73C6F9 0%, #5391F9 100%)",
                          borderRadius: "16px",
                        }
                      : {}
                  }
                  onClick={() => {}}
                >
                  <p
                    className="img-caption"
                    style={
                      orderState?.skipType === "On-Road"
                        ? { color: "#fff" }
                        : {}
                    }
                  >
                    On-Road
                  </p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            marginTop={1}
            justifyContent="center"
            className="btn-modal"
          >
            <Grid item xs={8}>
              <button
                onClick={() => {
                  handleValue(4)
                }}
                // disabled={
                //   orderState?.phone?.length < 10 ||
                //   (checkMobile.password === true &&
                //     checkMobile?.passwordValue === "") ||
                //   (checkMobile.otp === true &&
                //     checkMobile?.otpValue?.length < 6) ||
                //   orderState?.subService === null ||
                //   checkMobile?.otpError === true
                // }
              >
                Next
              </button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};
