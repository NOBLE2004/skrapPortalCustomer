import React, { useEffect } from "react";
import axios from "axios";
import {
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import paymentService from "../../services/payment.service";

const PaymentForm = (props) => {
  const { setOpen, handleSaveNewCard, state, notice, setState } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleSaveCard = (data) => {
    const payload = {
      card_holder_name: name,
      card_number: data?.card?.last4,
      token: data?.id,
      exp_month: data?.card?.exp_month,
      exp_year: data?.card?.exp_year,
      user_id: localStorage.getItem("user_id"),
    };
    setState({ ...state, isLoading: true });
    paymentService
      .create(payload)
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    stripe
      .createToken(cardElement)
      .then((res) => {
        console.log({ res });

        if (res?.token) {
          handleSaveCard(res?.token);
        }
        if (res?.error) {
          toast.error(res?.error?.code);
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box>
        <TextField
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          required
          value={name || ""}
          autoComplete="off"
          label="Card Holder Name"
          onChange={(e) => {
            setName(e?.target?.value);
          }}
          placeholder="Enter card holder name"
        />
      </Box>
      <CardElement
        options={{
          iconStyle: "solid",
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
          hidePostalCode: true,
        }}
      />

      <Box mt={4} display="flex" justifyContent="center">
        <img
          src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
          style={{
            height: "50px",
          }}
          alt=""
        />
      </Box>

      <Button
        fullWidth
        className={`${!state?.disabled && "createCard"} createCardBtn`}
        disabled={state?.disabled}
        sx={{ my: 3 }}
        variant="contained"
        type="submit"
      >
        Save Card
        {state?.isLoading && <CircularProgress />}
      </Button>
      {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
    </form>
  );
};

export default PaymentForm;