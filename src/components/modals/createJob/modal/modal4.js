/* eslint-disable import/no-anonymous-default-export */
import { Box, DialogContent, Divider, Grid } from "@mui/material";
import Switch from "@mui/material/Switch";

import React from "react";
import { useSelector } from "react-redux";

export default (props) => {
  const { handleValue } = props;
  const orderState = useSelector((state) => state?.order);
  const [radioButton, setRadioButton] = React.useState(true);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <p className="booking fnt-w-700">Site details</p>
          <p className="booking fnt-w-400">
            Century House
            <br /> Luke Street,,
            <br /> London, SE15 7ER
          </p>
        </Grid>
        {/* <Grid item xs={6}>
          <p className="booking fnt-w-700">Site contact</p>
          <p className="booking fnt-w-400">Danielle Willetts</p>
          <p className="booking fnt-w-400">07894 764987</p>
        </Grid> */}
      </Grid>

      <Grid
        container
        marginTop={1}
        sx={{
          background: "#ffffff",
          borderRadius: "16px",
          padding: "12px",
        }}
      >
        <Grid xs={8}>
          <Box>
            <div>
              <h2 className="skip-yard-title">
                <span
                  style={{
                    color: "#60A0F8",
                  }}
                >
                  Skip Hire 8-yard
                </span>{" "}
                {orderState?.subService?.service_name}
              </h2>
              <p className="booking fnt-w-400">General Waste</p>
              <p className="booking fnt-w-400">Off-road</p>
            </div>
          </Box>
        </Grid>
        <Grid xs={4} display="flex" justifyContent="flex-end">
          <div>
            <h2
              style={{
                background: "#f7f7f7",
                borderRadius: "8px",
                padding: "8px",
                color: "#677790",
              }}
              className="skip-yard-title"
            >
              4x
              {/* {orderState?.counter}x */}
            </h2>
          </div>
        </Grid>
        <Grid container marginTop={3} justifyContent="space-between">
          <Grid item xs={6}>
            <p
              className="booking fnt-w-700"
              style={{
                color: "#60A0F8",
              }}
            >
              TOTAL inc. VAT
              <Switch
                checked={radioButton}
                onChange={() => {
                  setRadioButton(!radioButton);
                }}
              />
            </p>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <h2
              style={{
                color: "#60A0F8",
              }}
              className="skip-yard-title"
            >
              £3,920
              {/* {radioButton === true ? (
                <>
                  {`£${(
                    (orderState?.subService?.price * orderState?.counter) /
                    1.2
                  ).toFixed(2)}`}
                </>
              ) : (
                <>{`£${(
                  orderState?.subService?.price * orderState?.counter
                ).toFixed(2)}`}</>
              )} */}
            </h2>
          </Grid>
        </Grid>
        <Divider sx={{ width: "100%", height: "1px", background: "#F5F5F5" }} />
        <Grid
          container
          marginTop={2}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={6}>
            <p className="booking fnt-w-700">Estimated delivery</p>
            <p className="booking fnt-w-400">
              Thurs 2nd Dec <br />
              08:00-12:00
              {/* {new Date(orderState?.date).toDateString()} <br />
              {orderState?.timeSlot} */}
            </p>
          </Grid>
          <Grid item xs={3} textAlign="right">
            <img
              className="full-width"
              src={orderState?.subService?.parent_service_img}
              alt=""
            />
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
              handleValue(5);
            }}
          >
            Proceed to payment
          </button>
        </Grid>
      </Grid>
    </>
  );
};
