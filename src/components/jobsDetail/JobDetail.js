import React from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import "./jobDetail.scss";
import { payment, status } from "../../services/utils";
const JobDetail = ({job}) => {
  return (
    <Card className="job-detail-main">
      <CardContent className="personal-info">
        <div className="info">
          <div className="designation">Manager</div>
          <CommonStatus status={status(job?.appointment_status)} />
        </div>
        <div className="info">
          <div className="designation">Order #</div>
          <div className="personal-title">SK{job?.job_id}</div>
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
            {job?.job_address}
          </div>
        </div>
      </CardContent>

      <div className="personal-info">
        <div className="info">
          <div className="designation">Booked</div>
          <div className="personal-title">{new Date(job?.save_date).toLocaleDateString()}</div>
        </div>
        <div className="info">
          <div className="designation">Deliver Date</div>
          <div className="personal-title">{new Date(job?.job_start_time).toLocaleString().substring(0, 17)}</div>
        </div>
        <div className="info">
          <div className="designation">Service</div>
          <div className="personal-title">{job?.service_name} (Grab Hire)</div>
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
