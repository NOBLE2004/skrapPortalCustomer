import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./paymentForm";
import { Box } from "@mui/material";
import { stripeKey } from "../../environment";

const StripeContainer = (props) => {
  const { state, setState, setOpen, handleSaveNewCard } = props;
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
