// ** React Imports
import { Ref, forwardRef, ReactElement, useState } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import { TextField, FormHelperText } from "@mui/material";

import Fade, { FadeProps } from "@mui/material/Fade";
import { DialogContent, Grid } from "@mui/material";
import paymentService from "../../../services/payment.service";

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

const DialogAddCard = (props: any) => {
  const { open, setOpen } = props;

  const [state, setState] = useState({
    previousCard: "",
    cardno: "",
    cardHolderName: "",
    cvc: "",
    cardExpiry: "",
    isLoading: false,
    notice: { text: "", type: "" },
    paymentMethod: "",
    isCardError: false,
    isNewCard: false,
    isCardAdded: false,
    isPaymentLoading: false,
    marketPayType: "",
  });
  const [errors, setErrors] = useState({
    previousCard: "",
    cardno: "",
    cardHolderName: "",
    cvc: "",
    cardExpiry: "",
    paymentMethod: "",
    paymentMethodList: [],
  });
  const handleClose = () => {
    setOpen(false);
  };

  const checkingError = (name: string, value: string | any[]) => {
    switch (name) {
      case "cardno":
        errors[name] = value.length < 19 ? "Required" : "";
        break;
      case "cvc":
        errors[name] = value.length < 3 ? "Required" : "";
        break;
      case "cardHolderName":
        errors[name] = value.length < 3 ? "Required" : "";
        break;
      case "cardExpiry":
        errors[name] = value.length < 5 ? "Required" : "";
        break;
      case "previousCard":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      default:
        break;
    }

    setErrors({ ...errors });
  };

  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    switch (name) {
      case "cardno":
        setState({
          ...state,
          [name]: value
            .replace(/[^\dA-Z]/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim(),
        });
        break;
      case "cardExpiry":
        setState({
          ...state,
          [name]: value
            .replace(/[^\dA-Z]/g, "")
            .replace(/(.{2})/g, "$1 ")
            .trim(),
        });
        break;
      case "previousCard":
        setState({ ...state, [name]: value, isNewCard: false });
        break;
      case "marketPayType":
        setState({ ...state, [name]: value, paymentMethod: "market_pay" });
        break;
      case "paymentMethod":
        setState({ ...state, [name]: value, marketPayType: "" });
        break;
      case "cardHolderName":
      case "cvc":
        setState({ ...state, [name]: value });
        break;

      default:
        break;
    }

    checkingError(name, value);
    setState((st) => ({
      ...st,
      isCardError: false,
    }));
  };

  const { cardno, cvc, cardHolderName, cardExpiry } = state;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const user_id = localStorage.getItem("user_id");
    // @ts-ignore
    if (
      cardno.length < 19 ||
      cvc.length < 3 ||
      cardExpiry.length < 5 ||
      cardHolderName.length < 3
    ) {
      Object.keys(errors).forEach((error, index) => {
        // @ts-ignore
        checkingError(error, state[error]);
      });

      return;
    }
    let expiryDate = cardExpiry.split(" ");
    const newData = {
      card_holder_name: cardHolderName,
      card_number: cardno,
      cvv: cvc,
      exp_month: expiryDate[0],
      exp_year: expiryDate[1],
      user_id: user_id ? user_id : "",
    };
    setState({ ...state, isLoading: true });
    paymentService
      .addCard(newData)
      .then((res: any) => {
        if (Object.keys(res.data.result).length === 0) {
          setState({
            ...state,
            isLoading: false,
            isCardError: true,
            // @ts-ignore
            notice: {
              type: "error",
              text: res.data.description,
            },
          });
        } else {
          setOpen(false);
          setState({
            ...state,
            isLoading: false,
            isCardAdded: true,
            isNewCard: false,
            // @ts-ignore
            notice: {
              type: "success",
              text: res.data.description,
            },
          });
        }
      })
      .catch((err: any) => {
        setState({
          ...state,
          isLoading: false,
          // @ts-ignore
          notice: {
            type: "error",
            text: err.message,
          },
        });
      });
  };

  return (
    <Card>
      <Dialog
        fullWidth
        open={open}
        maxWidth="xs"
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            borderRadius: "16px",
            background: "#F7F7F7",
          },
        }}
        className="add-new-card-main"
      >
        <DialogContent>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={8}>
              <h1>CREDIT/DEBIT CARD PAYMENT</h1>
            </Grid>
            <Grid item xs={4} textAlign="end">
              <img src="/images/modal/visa.png" alt="" />
              <img src="/images/modal/mastercard.png" alt="" />
              <img src="/images/modal/amex.png" alt="" />
            </Grid>
          </Grid>
          <Grid container marginTop={2}>
            <Grid item xs={12}>
              <p>Card Number</p>
              <TextField
                name="cardno"
                variant="outlined"
                size="small"
                value={cardno}
                placeholder="•••• •••• •••• ••••"
                onChange={(e) => handleOnChange(e)}
                inputProps={{ maxLength: 19 }}
                sx={{
                  margin: 0,
                  width: "100%",
                }}
                // InputProps={{
                //   endAdornment: (
                //     <div className="inner-payment-icons">
                //       <img src="/images/modal/visa.png" alt="" />
                //       <img src="/images/modal/mastercard.png" alt="" />
                //       <img src="/images/modal/amex.png" alt="" />
                //     </div>
                //   ),
                // }}
                error={errors["cardno"].length > 0 ? true : false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} marginTop={1}>
            <Grid item xs={6}>
              <p>Expiry</p>
              <TextField
                error={errors["cardExpiry"].length > 0 ? true : false}
                fullWidth
                name="cardExpiry"
                inputProps={{ maxLength: 5 }}
                value={cardExpiry}
                onChange={(e) => handleOnChange(e)}
                variant="outlined"
                placeholder="•• / ••"
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <p>CVC</p>
              <TextField
                name="cvc"
                variant="outlined"
                size="small"
                inputProps={{ maxLength: 3 }}
                value={cvc}
                placeholder="••••"
                onChange={(e) => handleOnChange(e)}
                error={errors["cvc"].length > 0 ? true : false}
              />
            </Grid>
          </Grid>
          <Grid container marginTop={2}>
            <Grid item xs={12}>
              <p>Card Holder Name</p>
              <TextField
                name="cardHolderName"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                value={cardHolderName}
                placeholder="card holder name"
                onChange={(e) => handleOnChange(e)}
                error={errors["cardHolderName"].length > 0 ? true : false}
              />
            </Grid>
          </Grid>
          <Grid container mt={1}>
            <Grid item xs={12}>
              {state?.isCardError && (
                <FormHelperText sx={{ color: "red!important" }}>
                  {state?.notice?.text}
                </FormHelperText>
              )}
            </Grid>
          </Grid>
          <Grid container justifyContent="center" marginTop={2}>
            <Grid item xs={11} md={6} className="btn-modal-add-card ">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Save Card
              </button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DialogAddCard;
