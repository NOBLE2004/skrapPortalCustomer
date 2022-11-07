import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Grid, RadioGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import { getPortfolio } from "../../../store/actions/action.portfolio";
import TextField from "@mui/material/TextField";
import "./style.scss";
import FadeLoader from "react-spinners/FadeLoader";
import reportsService from "../../../services/reports.service";
import paymentService from "../../../services/payment.service";

function PayEmissionModal(props) {
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state?.portfolio);
  useEffect(() => {
    async function fetchData() {
      if (!portfolio?.data?.data) {
        await dispatch(getPortfolio());
      }
    }
    fetchData();
  }, []);

  const { showModal, setShowModal } = props;
  const [selectedValue, setSelectedValue] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [card, setCard] = useState({
    id: "",
    orderId: "",
  });
  const [state, setState] = useState({
    price: 0,
    totalPrice: 0,
    value: 1,
  });

  useEffect(() => {
    setState((st) => ({
      ...st,
      price: 0,
      totalPrice: 0,
      value: 1,
    }));
    setPaymentMethodList([]);
    setSelectedValue();
  }, [showModal]);

  const handleChange = (event, price) => {
    setShow(true);
    setState((st) => ({
      ...st,
      price: price,
      totalPrice: price * state.value,
    }));
    setSelectedValue(event);
  };

  const handleInputChange = (e) => {
    if (e.target.value != 0) {
      let price = 0;
      price = price * e.target.value;
      setState((st) => ({
        ...st,
        totalPrice: state.price * e.target.value,
        value: e.target.value,
      }));
    } else {
      setState((st) => ({
        ...st,
        totalPrice: state.price,
        value: e.target.value,
      }));
    }
  };

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle className={classes.root} {...other}>
        <div>
          <Typography variant="h6">{children}</Typography>
        </div>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => setShowModal(!showModal)}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  const handleSubmit = () => {
    let data = {
      amount: state?.totalPrice?.toString(),
      card_id: card.id,
      order_id: card.orderId,
    };
    if (paymentMethodList?.length > 0) {
      reportsService.offSetCharge(data).then((res) => {
        setShowModal(!showModal);
      });
    } else {
      setLoading(true);
      const params = new URLSearchParams({
        id: selectedValue,
        amount: state.totalPrice,
      }).toString();
      reportsService
        .payOffSet(params)
        .then((res) => {
          setCard((st) => ({
            ...st,
            orderId: res?.data?.order_ID,
          }));
          paymentService
            .list({ user_id: localStorage.getItem("user_id") })
            .then((response) => {
              setLoading(false);
              setPaymentMethodList(response.data.result);
            });
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(!showModal)}
      className="booksitemodal"
    >
      <DialogTitle onClose={() => setShowModal(!showModal)}>
        {" "}
        Pay Co2e
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <Grid container justifyContent="center">
            {portfolio?.data?.data?.map((single) => (
              <Grid item md={8} xs={12} key={single?.id}>
                <div className="main-modal-content-emision" key={single.id}>
                  <div>
                    <p>
                      {single.name}
                      <span>&nbsp;(£{single?.price_per_kg?.toFixed(2)})</span>
                    </p>
                  </div>
                  <div>
                    <Radio
                      checked={single.id === selectedValue}
                      onChange={(e) =>
                        handleChange(
                          single.id,
                          single?.price_per_kg?.toFixed(2)
                        )
                      }
                      value={single.selected}
                      name="radio-buttons"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </div>
                </div>
              </Grid>
            ))}
            {show && (
              <Grid item md={8} xs={12} marginTop={1}>
                <label
                  className="label-for-checkbox-emission-modal"
                  style={{ marginBottom: "4px" }}
                >
                  How many KG's you need to offset.?
                </label>
                <TextField
                  label="Amount"
                  variant="outlined"
                  type="number"
                  margin="normal"
                  size="small"
                  value={state?.value}
                  inputProps={{ min: 1 }}
                  name="amount"
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  sx={{ width: "100%" }}
                />
              </Grid>
            )}
            {loading ? (
              <Grid
                item
                md={8}
                xs={12}
                marginTop={1}
                className="d-flex justify-center align-center"
              >
                <FadeLoader color={"#518ef8"} loading={loading} width={4} />
              </Grid>
            ) : (
              <RadioGroup
                name="selectedPaymentMethod"
                // value={selectedPaymentMethod}
                onChange={(e) => {
                  setCard((st) => ({
                    ...st,
                    id: e.target.value,
                  }));
                }}
              >
                {paymentMethodList &&
                  paymentMethodList.map((data, index) => {
                    return (
                      <FormControlLabel
                        key={index}
                        value={data.id}
                        control={<Radio color="primary" />}
                        label={`•••• •••• •••• ${data.card.last4} - ${data.card.brand}`}
                      />
                    );
                  })}
              </RadioGroup>
            )}
          </Grid>
          <Grid container justifyContent="flex-end" marginTop={2}>
            <Button
              className=""
              variant="contained"
              color="primary"
              sx={{
                margin: "unset",
                borderRadius: "50px",
                textTransform: "unset",
                fontFamily: "DM Sans",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "20px",
                padding: "10px 20px",
                background: "linear-gradient(180deg, #73c6f9 0%, #5391f9 100%)",
              }}
              onClick={() => {
                handleSubmit();
              }}
            >
              Pay Now : £{state.totalPrice}
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PayEmissionModal;
