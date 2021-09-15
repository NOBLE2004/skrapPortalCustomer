import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import "./jobDetail.scss";
const JobDetail = () => {
  return (
    <Card className="job-detail-main">
      <CardContent className="personal-info">
        <div className="info">
          <div className="designation">Manager</div>
          <CommonStatus status="assigned" />
        </div>
        <div className="info">
          <div className="designation">Order #</div>
          <div className="personal-title">SN14662</div>
        </div>
        <div className="info">
          <div className="designation">Purchase Order</div>
          <div className="personal-title">SN14662</div>
        </div>
        <div className="info">
          <div className="designation">Booked By</div>
          <div className="personal-title">Skarp</div>
        </div>
        <div className="info">
          <div className="designation">Site Address</div>
          <div className="personal-title">
            113 Ibsley GardensLondon Sw15 4NQ
          </div>
        </div>
      </CardContent>

      <div className="personal-info">
        <div className="info">
          <div className="designation">Booked</div>
          <div className="personal-title">2021-03-25 09:28:01</div>
        </div>
        <div className="info">
          <div className="designation">Deliver Date</div>
          <div className="personal-title">2021-03-26 12:00 to 17:00</div>
        </div>
        <div className="info">
          <div className="designation">Service</div>
          <div className="personal-title">Mixed Waste (Grab Hire)</div>
        </div>
        <div className="info">
          <div className="designation">Waste Type</div>
          <div className="personal-title">
            Organic waste 20%
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobDetail;
