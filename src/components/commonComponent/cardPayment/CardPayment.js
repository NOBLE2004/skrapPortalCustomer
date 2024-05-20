import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/lab/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import PaymentService from "../../../services/payment.service";
import StripeContainer from "../../stripe/stripeContainer";
import "./cardPayment.scss";

export default function CardPayment({ user_id, handleSaveNewCard, setOpen }) {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardHolderName: "",
  });

  const [errors, setError] = useState({
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardHolderName: "",
  });

  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    disabled: false,
  });

  const { cardNumber, cardExpiry, cardCVC, cardHolderName } = cardData;
  const { notice, isLoading, disabled } = state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "cardNumber":
        setCardData({
          ...cardData,
          [name]: value
            .replace(/[^\dA-Z]/g, "")
            .replace(/(.{4})/g, "$1 ")
            .trim(),
        });
        break;
      case "cardExpiry":
        setCardData({
          ...cardData,
          [name]: value
            .replace(/[^\dA-Z]/g, "")
            .replace(/(.{2})/g, "$1 ")
            .trim(),
        });
        break;
      default:
        setCardData({ ...cardData, [name]: value });
    }

    // checkingError( name, value );
  };

  const checkingError = (name, value) => {
    switch (name) {
      case "cardNumber":
        errors[name] = value.length < 18 ? "Required" : "";
        break;
      case "cardExpiry":
        errors[name] = value.length < 5 ? "Required" : "";
        break;
      case "cardCVC":
        errors[name] = value.length < 3 ? "Required" : "";
        break;
      case "cardHolderName":
        errors[name] = value.length < 3 ? "Required" : "";
        break;
      default:
        break;
    }
    setError({ ...errors });
  };

  const handleSaveCard = () => {
    if (
      cardNumber.length < 18 ||
      cardExpiry.length < 5 ||
      cardCVC.length < 3 ||
      cardHolderName.length < 3
    ) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, cardData[error]);
      });
      return;
    } else {
      setError({
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
        cardHolderName: "",
      });
    }

    setState({ ...state, isLoading: true });
    let expiryDate = cardExpiry.split(" ");
    PaymentService.create({
      card_holder_name: cardHolderName,
      card_number: cardNumber,
      cvv: cardCVC,
      exp_month: expiryDate[0],
      exp_year: expiryDate[1],
      user_id: user_id,
    })
      .then((response) => {
        if (Object.keys(response.data.result).length === 0) {
          setState({
            ...state,
            isLoading: false,
            notice: {
              type: "error",
              text: response.data.description,
            },
          });
          return;
        }
        setState({
          ...state,
          isLoading: false,
          disabled: true,
          notice: {
            type: "success",
            text: response.data.description,
          },
        });
        setTimeout(() => {
          setOpen();
          handleSaveNewCard();
        }, 2000);
      })
      .catch((error) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "error",
            text: error.message,
          },
        });
      });
  };

  return (
    <div className="addCard">
      <div className="cardHeader">
        <p>CREDIT/DEBIT CARD PAYMENT</p>
        <div className="cardImages">
          <img src="https://img.icons8.com/color/36/000000/visa.png" />
          <img src="https://img.icons8.com/color/36/000000/mastercard.png" />
          <img src="https://img.icons8.com/color/36/000000/amex.png" />
        </div>
      </div>
      <StripeContainer
        state={state}
        setState={setState}
        setOpen={setOpen}
        handleSaveNewCard={handleSaveNewCard}
      />

      <div className="cardBody">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <label>CARD NUMBER</label>
            <TextField
              error={errors["cardNumber"].length > 0 ? true : false}
              fullWidth
              name="cardNumber"
              inputProps={{ maxLength: 19 }}
              value={cardNumber}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              placeholder="•••• •••• •••• ••••"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <label>CARD EXPIRY</label>
            <TextField
              error={errors["cardExpiry"].length > 0 ? true : false}
              fullWidth
              name="cardExpiry"
              inputProps={{ maxLength: 5 }}
              value={cardExpiry}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              placeholder="•• / ••"
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <label>CARD CVC</label>
            <TextField
              error={errors["cardCVC"].length > 0 ? true : false}
              fullWidth
              name="cardCVC"
              inputProps={{ maxLength: 4 }}
              value={cardCVC}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              placeholder="••••"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <label>CARD HOLDER NAME</label>
            <TextField
              error={errors["cardHolderName"].length > 0 ? true : false}
              fullWidth
              name="cardHolderName"
              value={cardHolderName}
              onChange={(e) => handleChange(e)}
              variant="outlined"
              size="small"
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
