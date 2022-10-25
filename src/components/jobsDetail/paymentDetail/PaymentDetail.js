import { Card, CardContent } from "@mui/material";
import React, { useState } from "react";
import "./paymentDetail.scss";
import { payment } from "../../../services/utils";
import JobService from "../../../services/job.service";
import PayNow from "../../modals/payNow";
const PaymentDetail = ({ job, updateJobs }) => {
  const [payNowModal, setPayNowModal] = useState(false);
  const downloadInvoice = () => {
    JobService.invoice({ job_id: job.job_id })
      .then((response) => {
        if (response.data.code === 0) {
          window.open(response.data.result.Url, "_blank");
        } else {
          alert(response.data.description);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const openPayNowModal = () => {
    setPayNowModal(!payNowModal);
  };
  return (
    <div className="payment-detail-main">
      {payNowModal && (
        <PayNow
          cost={job?.transaction_cost}
          user_id={job?.customer_user_id}
          jobId={job?.job_id}
          handleClose={() => setPayNowModal(false)}
          updateJobs={updateJobs}
        />
      )}
      <div className="payment-header-main">
        <div className="header-title">Payment Details</div>
        <div className="header-sub">
          {job?.is_paid ? (
            ""
          ) : (
            <span
              className="bold-dsans-12-primary pay-now"
              onClick={() => {
                openPayNowModal();
              }}
            >
              Pay Now
            </span>
          )}
          <span onClick={downloadInvoice} className="bold-dsans-12-primary">
            Download Invoice
          </span>
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
            <div className="card-header-sub-item">
              {payment(job?.payment_type)} - {job?.is_paid ? "Paid" : "Pending"}
            </div>
            <div className="card-header-sub ">
              <span className="card-header-sub-item">
                €{job?.service_rate?.toFixed(2)}
              </span>
              <span className="card-header-sub-item">
                €{job?.haulage ? job?.haulage?.toFixed(2) : "0.00"}
              </span>
              <span className="card-header-sub-item">
                €{job?.transaction_cost?.toFixed(2)}
              </span>
              <span className="card-header-sub-item">
                €{job?.discount ? parseInt(job?.discount)?.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentDetail;
