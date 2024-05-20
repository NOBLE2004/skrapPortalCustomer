import React, { useState } from "react";
import StripeContainer from "../../stripe/stripeContainer";
import "./cardPayment.scss";

export default function CardPayment({ user_id, handleSaveNewCard, setOpen }) {
  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    disabled: false,
  });

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
    </div>
  );
}
