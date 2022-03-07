import React from "react";
import "./toolTipCard.scss";

const ToolTipCard = ({ data }) => {
  return (
    <div className="tool-cardMain">
      {data}{" "}
      <a href="https://marketfinance.com/skrap-marketpay">MarketFinance</a>
    </div>
  );
};

export default ToolTipCard;
