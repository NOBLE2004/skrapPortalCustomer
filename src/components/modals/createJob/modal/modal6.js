/* eslint-disable import/no-anonymous-default-export */
import { Grid } from "@mui/material";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
// import { resetOrder } from "../../../store/action/newOrder";
// import {CUSTOMER_PORTAL} from "../../../env";
import BookingIcon from "../../../../assets/images/booking.svg";

export default (props) => {
  // const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.order);
  const handleBooking = () => {
    // dispatch(
    //   resetOrder({
    //     type: "RESET_ORDER",
    //     payload: {},
    //   }) as any
    // );
    // router.push(CUSTOMER_PORTAL);
  };

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={6}>
          <img className=" full-width" src={BookingIcon} alt="" />
        </Grid>
      </Grid>
      <Grid container marginTop={2} justifyContent="center">
        <Grid item xs={10} marginTop={1} textAlign="center">
          <h1
            className="title"
            style={{
              color: "#fff",
            }}
          >
            Booking confirmed
            <br /> #{state?.orderId?.order_id}
          </h1>
          <p
            className="img-caption mt-20"
            style={{
              color: "#fff",
            }}
          >
            25 Mar 9:30pm
          </p>
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="center"
        marginTop={4}
        className="btn-confirm-booking"
      >
        <Grid item xs={11}>
          <button
            className="pointer"
            onClick={() => {
              handleBooking();
            }}
          >
            Back to dashboard
          </button>
          <p
            className="img-caption pointer"
            style={{
              color: "#fff",
              marginTop: "20px",
            }}
            onClick={() => {
              handleBooking();
            }}
          >
            View booking
          </p>
        </Grid>
      </Grid>
      <Grid container marginTop={4}>
        <Grid item xs={4}>
          <img
            className="full-width"
            src={state?.subService?.parent_service_img}
            alt=""
            style={{
              filter: " drop-shadow(2px 4px 6px white)",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};
