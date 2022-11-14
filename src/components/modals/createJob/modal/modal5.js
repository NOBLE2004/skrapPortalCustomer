/* eslint-disable import/no-anonymous-default-export */
import {
  Box,
  FormHelperText,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import NewcardModal from "./newCardModal";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import paymentService from "../../../services/payment.service";
import CircularProgress from "@mui/material/CircularProgress";
// import { updateOrderId } from "../../../store/action/newOrder";

export default (props) => {
  const orderState = useSelector((state) => state?.order);
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [marketPayDates, setMarketPayDates] = useState([]);
  const [checkbox, setCheckBox] = useState("");
  const [cardList, setCardList] = useState([]);
  const [cardLoader, setCardLoader] = useState(false);
  const [loader, setLoader] = useState({
    error: "",
    loading: false,
  });
  const [cardData, setCardData] = useState("");
  const [open, setOpen] = useState(false);
  const { handleValue } = props;
  useEffect(() => {
    // setCardLoader(true);
    // paymentService
    //   .list({
    //     user_id: localStorage.getItem("user_id"),
    //   })
    //   .then((response) => {
    //     setCardLoader(false);
    //     setCardList(response?.data?.result);
    //     setCardData(response?.data?.result?.[0]?.id);
    //   })
    //   .catch(() => {
    //     setCardLoader(false);
    //   });
  }, [open]);
  useEffect(() => {
    //@ts-ignore
  }, [cardList]);

  const handleDate = (type) => {
    const currentDate = new Date();
    const dates = [];
    if (type === "PAY30") {
      dates.push(
        new Date(
          currentDate.setMonth(currentDate.getMonth() + 1)
        ).toDateString()
      );
    }
    if (type === "PAY60") {
      dates.push(
        new Date(
          currentDate.setMonth(currentDate.getMonth() + 2)
        ).toDateString()
      );
    }
    if (type === "PAY30EOFM") {
      let date = new Date(currentDate.setMonth(currentDate.getMonth() + 2));
      const new_date = new Date(date.setDate(0)).toDateString();
      dates.push(new_date);
    }
    // @ts-ignore
    setMarketPayDates(dates);
    setCheckBox(type);
  };

  const calculateVat = () => {
    const price = orderState?.subService?.price * orderState?.counter;
    const vatPrice = price / 1.2;
    const vat = price - vatPrice;

    return {
      totalPrice: vatPrice.toFixed(2),
      vat: vat.toFixed(2),
    };
  };

  const handleMakePayemnt = () => {
    // setLoader((st) => ({
    //   ...st,
    //   loading: true,
    //   error: "",
    // }));
    // const time = orderState.timeSlot && orderState.timeSlot.split(" - ");
    // let selected_date = orderState.date;
    // if (typeof orderState.date !== "object") {
    //   selected_date = new Date(selected_date);
    // }
    // const string_date = selected_date.toISOString().split("T")[0];
    // const startTime = time[0];
    // const endTime = time[1];
    // const start_time = string_date + "T" + startTime.split(" ")[0] + ":00.000Z";
    // const end_time = string_date + "T" + endTime.split(" ")[0] + ":00.000Z";
    // const wasteArray = orderState?.wastes?.map((elem: any) => {
    //   return {
    //     waste_type_id: elem,
    //     percentage: 0,
    //   };
    // });
    // const job_start_time = Date.parse(start_time);
    // const job_end_time = Date.parse(end_time);
    // let obj = {
    //   is_permit: 0,
    //   is_schedule: 0,
    //   job_address: orderState?.address?.addressData
    //     ? orderState?.address + ", " + orderState?.address?.postcode
    //     : "",
    //   job_area: orderState?.address?.addressData
    //     ? orderState?.address?.addressData?.postcode
    //     : "",
    //   job_dates: [job_start_time],
    //   job_end_time: job_end_time,
    //   job_id: "",
    //   job_start_time: job_start_time,
    //   permit_cost: 0,
    //   service_cost: orderState?.subService?.price,
    //   service_id: orderState?.subService?.sub_service_id,
    //   service_name: orderState?.subService?.service_name,
    //   service_type: 2,
    //   skip_loc_type: "1",
    //   skip_req_days: 0,
    //   skrapRev: "0",
    //   status: 0,
    //   supplier: "0",
    //   supplier_cost: "0",
    // };
    // let data = {
    //   acm_id: "",
    //   address_data: orderState?.address?.addressData
    //     ? orderState?.address?.addressData
    //     : "",
    //   card_id: checkbox === "card" ? cardData : "",
    //   comments: "",
    //   coupon_detail: {
    //     coupon_id: 0,
    //     discount: 0,
    //     discount_rate: 0,
    //     is_coupon: 0,
    //     service_rate: 330.0,
    //   },
    //   customer_user_id: localStorage.getItem("user_id"),
    //   jobs: orderState?.counter,
    //   payment_type:
    //     checkbox === "card" ? 2 : checkbox === "market-finance" ? 10 : 0,
    //   market_pay_type: checkbox === "market-finance" ? "PAY30EOFM" : "",
    //   purchase_order: "",
    //   is_permit: "0",
    //   permitted_weeks: "",
    //   permitted_cost: "",
    //   permitted_reference: "",
    //   skip_loc_type:
    //     orderState?.skipType === "On-road"
    //       ? "3"
    //       : orderState?.skipType === "Wait & Load"
    //       ? "2"
    //       : "1",
    //   services: [obj],
    //   wastes: wasteArray,
    //   what3word: "",
    //   show_on_main_portal: 1,
    // };
    // paymentService
    //   .postJob(data)
    //   .then((response) => {
    //     if (response.data.code === 0) {
    //       setLoader((st) => ({
    //         ...st,
    //         loading: false,
    //         error: "",
    //       }));
    //       // dispatch(
    //       //   updateOrderId({
    //       //     type: "UPDATE_ORDER_ID",
    //       //     payload: response?.data?.result,
    //       //   }) as any
    //       // );
    //       handleValue(6);
    //     } else if (response.data.code === 4) {
    //       setLoader((st) => ({
    //         ...st,
    //         loading: false,
    //         error: response.data.description,
    //       }));
    //     } else if (response.data.code === 11) {
    //       setLoader((st) => ({
    //         ...st,
    //         loading: false,
    //         error: response.data.description,
    //       }));
    //     } else {
    //       setLoader((st) => ({
    //         ...st,
    //         loading: false,
    //         error: response.data.description,
    //       }));
    //     }
    //   })
    //   .catch((err) => {
    //     setLoader((st) => ({
    //       ...st,
    //       loading: false,
    //       error: "Something went wrong try again",
    //     }));
    //   });
  };

  return (
    <>
      {/* <NewcardModal open={open} setOpen={setOpen} /> */}

      <Grid container marginTop={1}>
        <Grid
          item
          xs={12}
          marginTop={1}
          sx={{
            background: "#FFFFFF",
            boxShadow: " 0px 17px 24px rgba(58, 58, 58, 0.05)",
            borderRadius: "16px",
            padding: 1.5,
          }}
        >
          <Box display="flex" alignItems="center">
            <img
              style={{
                height: "16px",
              }}
              src="/images/modal/plus.svg"
              alt=""
            />
            <label className="img-caption ml-10">Add promo code</label>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={12}>
          <label className="img-caption">Select size </label>
        </Grid>
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
        <Grid xs={6}>
          <h2 className="skip-yard-title">
            {/* {orderState?.counter}x{" "} */} 1 x
            <span
              style={{
                color: "#60A0F8",
              }}
            >
              &nbsp;Skip Hire
              {/* {orderState?.service?.service?.service_name} */}
            </span>
          </h2>
        </Grid>
        <Grid xs={6} display="flex" justifyContent="flex-end">
          <p className="booking fnt-w-700">
            {/* £{calculateVat()?.totalPrice} */}
            £204.17
          </p>
        </Grid>

        <Grid xs={6} marginTop={2}>
          <p className="booking fnt-w-700">VAT</p>
        </Grid>
        <Grid xs={6} marginTop={2} display="flex" justifyContent="flex-end">
          <p className="booking fnt-w-700">
            £40.83
            {/* £{calculateVat()?.vat} */}
          </p>
        </Grid>
        <Grid xs={6} marginTop={2}>
          <p
            className="booking fnt-w-700"
            style={{
              color: "#60A0F8",
            }}
          >
            TOTAL
          </p>
        </Grid>
        <Grid xs={6} marginTop={2} display="flex" justifyContent="flex-end">
          <h2 className="skip-yard-title">
            <span
              style={{
                color: "#60A0F8",
              }}
            >
              £245.00
              {/* £{orderState?.subService?.price * orderState?.counter} */}
            </span>
          </h2>
        </Grid>
      </Grid>

      <Grid container spacing={1} marginTop={1}>
        <Grid item xs={12}>
          <label className="img-caption">Payment method </label>
        </Grid>
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
        <Grid xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkbox === "market-finance"}
                  value="PAY30EOFM"
                  onChange={(e) => {
                    handleDate(e.target.value);
                    setCheckBox("market-finance");
                  }}
                />
              }
              label={
                <Box display="flex">
                  <p className="img-caption">Pay with </p>
                  <img
                    className="ml-10"
                    src="/images/modal/LogoMarketFinance.svg"
                    alt=""
                  />
                </Box>
              }
            />
            <Divider
              sx={{ width: "100%", height: "1px", background: "#F5F5F5" }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkbox === "card"}
                  onChange={() => {
                    setCheckBox("card");
                  }}
                />
              }
              label={
                <div>
                  <p className="img-caption">Debit/credit card</p>
                </div>
              }
            />
          </FormGroup>
        </Grid>
      </Grid>

      {checkbox === "card" && (
        <Grid
          container
          marginTop={1}
          justifyContent="space-between"
          alignItems="flex-end"
          spacing={1}
        >
          {cardLoader === false ? (
            <>
              <Grid item xs={9}>
                <label className="img-caption">Select Card</label>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    background: "#fff",
                    borderRadius: "16px",
                    marginTop: "10px",
                  }}
                >
                  <Select
                    displayEmpty
                    input={<OutlinedInput />}
                    inputProps={{ "aria-label": "Without label" }}
                    placeholder="card"
                    value={cardData}
                    onChange={(e) => {
                      setCardData(e.target.value);
                    }}
                    sx={{
                      fontFamily: "DM Sans",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "22px",
                      color: " #677790",
                    }}
                  >
                    {cardList?.map((data) => (
                      <MenuItem
                        value={data.id}
                        key={data.id}
                        className="menu-item"
                      >
                        <div className="add-icon-into-menu">
                          <span>{`•••• •••• •••• ${data.card.last4} - ${data.card.brand} `}</span>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3} className="btn-modal-add-card">
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Add card
                </button>
              </Grid>
            </>
          ) : (
            <Box mt={2} width="100%" display="flex" justifyContent="center">
              <CircularProgress disableShrink />
            </Box>
          )}
        </Grid>
      )}
      {checkbox === "market-finance" && (
        <Grid
          container
          marginTop={1}
          justifyContent="space-between"
          alignItems="flex-end"
          padding={2}
          borderRadius="16px"
          bgcolor="#fff"
        >
          <Grid item xs={12}>
            {marketPayDates.map((x) => {
              return (
                <div className="desc-title">
                  {/*<CalendarTodayIcon />*/}
                  <p
                    className="img-caption"
                    style={{ fontWeight: "700", textAlign: "left" }}
                  >
                    Pay £
                    {calculateVat().totalPrice
                      ? calculateVat().totalPrice.toLocaleString()
                      : "0"}{" "}
                    on {x}
                  </p>
                </div>
              );
            })}

            <p
              className="img-caption mt-20"
              style={{ fontWeight: "400", textAlign: "left" }}
            >
              Pay by bank transfer on the date. We will send you the payment
              details in the order confirmation email.
            </p>
            <p
              className="img-caption mt-20"
              style={{ fontWeight: "700", textAlign: "left" }}
            >
              Your credit
            </p>
            <Box display="flex" justifyContent="space-between" marginTop={1}>
              <p
                className="img-caption "
                style={{ fontWeight: "400", textAlign: "left" }}
              >
                Available Credit
              </p>
              <p
                className="img-caption "
                style={{ fontWeight: "400", textAlign: "left" }}
              >
                £{user?.user?.market_finance_balance}
              </p>
            </Box>
            <Box display="flex" justifyContent="space-between" marginTop={1}>
              <p
                className="img-caption "
                style={{ fontWeight: "400", textAlign: "left" }}
              >
                This Order
              </p>
              <p
                className="img-caption "
                style={{ fontWeight: "400", textAlign: "left" }}
              >
                -£{orderState?.subService?.price * orderState?.counter}
              </p>
            </Box>
            <Divider
              sx={{ width: "100%", height: "1px", background: "#F5F5F5" }}
            />
            <Box display="flex" justifyContent="space-between">
              <p
                className="img-caption "
                style={{ fontWeight: "400", textAlign: "left" }}
              >
                Remaining credit after transaction
              </p>
              <p
                className="img-caption "
                style={{ fontWeight: "400", textAlign: "left" }}
              >
                £
                {user?.user?.market_finance_balance -
                  orderState?.subService?.price * orderState?.counter}
              </p>
            </Box>
          </Grid>
        </Grid>
      )}

      <FormHelperText sx={{ color: "red", mt: 1 }}>
        {loader?.error}
      </FormHelperText>

      <Grid
        container
        spacing={1}
        marginTop={1}
        justifyContent="center"
        className="btn-modal"
      >
        {loader?.loading ? (
          <CircularProgress disableShrink />
        ) : (
          <Grid item xs={8}>
            <button
              onClick={() => {
                handleValue(6)
                // handleMakePayemnt();
              }}
              // disabled={
              //   (checkbox === "card" && cardData === "") || checkbox === ""
              // }
            >
              Make payment
            </button>
          </Grid>
        )}
      </Grid>
    </>
  );
};
