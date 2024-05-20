import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./paymentForm";
import { Box } from "@mui/material";

const StripeContainer = (props) => {
  const { state, setState, setOpen, handleSaveNewCard } = props;
  const stripeKey = "pk_test_51PGlRWKE3ud1y1q8zI5sWJLWBzMivN2KFP0yJXV5wHXjyKrm0FlDW5NBMay4E0shEwL0xOEbD9ME5Otn9kaNTxGr00Hx5qNr1n";
  const stripeTestPromise = loadStripe(stripeKey);

  return (
    <Box className="stripe-custom-element" paddingX={3} mt={2}>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm
          state={state}
          setState={setState}
          setOpen={setOpen}
          handleSaveNewCard={handleSaveNewCard}
        />
      </Elements>
    </Box>
  );
};

export default StripeContainer;
