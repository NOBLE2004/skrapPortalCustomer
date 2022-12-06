import React from "react";
import { Card } from "@mui/material";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import "./jobDetail.scss";
import { status } from "../../services/utils";
const JobDetail = ({ job }) => {
  console.log("job", job);
  return (
    <Card className="job-detail-main">
      <div className="personal-info">
        <div className="info">
          <div className="designation">Status</div>
          <CommonStatus status={status(job?.appointment_status)} />
        </div>
        <div className="info">
          <div className="designation">Booked</div>
          <div className="personal-title">
            {new Date(job?.save_date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="personal-info">
        <div className="info">
          <div className="designation">Order #</div>
          <div className="personal-title">SK{job?.job_id}</div>
        </div>
        <div className="info">
          <div className="designation">Delivery Date</div>
          <div className="personal-title">
            {new Date(job?.job_start_time).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="personal-info">
        <div className="info">
          <div className="designation">Purchase Order</div>
          <div className="personal-title">
            {job?.purchase_order ? job?.purchase_order : "-----"}
          </div>
        </div>
        <div className="info">
          <div className="designation">Service</div>
          <div className="personal-title">{job?.service_name}</div>
        </div>
      </div>

      <div className="personal-info">
        <div className="info">
          <div className="designation">Waste Tonnes</div>
          <div className="personal-title">
            {job?.weight ? `${job?.weight}` : "----"}
          </div>
        </div>
        <div className="info">
          <div className="designation">Co2</div>
          <div className="personal-title">
            {job?.co2 ? `${job?.co2}` : "----"}
          </div>
        </div>
      </div>
      <div className="personal-info">
        <div className="info">
          <div className="designation">Site Address</div>
          <div className="personal-title">{job?.job_address}</div>
        </div>
      </div>
    </Card>
  );
};

export default JobDetail;
