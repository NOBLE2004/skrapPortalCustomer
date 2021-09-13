import { Card, CardContent } from "@material-ui/core";
import React from "react";
import "./paymentDetail.scss";
const PaymentDetail = () => {
  return (
    <div className="payment-detail-main">
      <div className="payment-header-main">
        <div className="header-title">Payment Details</div>
        <div className="header-sub">
          <span className="bold-dsans-12-primary">Pay</span>
          <span className="bold-dsans-12-primary">Update cost</span>
          <span className="bold-dsans-12-primary">Download invoice</span>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="card-payment">
            <div className="card-header-sub-title">Payment Methods</div>
            <div className="card-header-sub ">
              <span className="card-header-sub-title">Service Cost</span>
              <span className="card-header-sub-title">Haulage Cost</span>
              <span className="card-header-sub-title">Total cost</span>
              <span className="card-header-sub-title">Discount</span>
            </div>
          </div>

          <div className="card-payment">
            <div className="card-header-sub-item">Pending - Manual</div> 
            <div className="card-header-sub ">
              <span className="card-header-sub-item">£440.00</span>
              <span className="card-header-sub-item">£660.00</span>
              <span className="card-header-sub-item">£220.00</span>
              <span className="card-header-sub-item">£0.00</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDetail;
