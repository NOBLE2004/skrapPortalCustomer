import React from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import { phoneCall } from "../../assets/images/index";
import "./tipingcard.scss";

const TipingCard = ({ tipTime  , jobInfo}) => {
  const {site , job_address , jobStatus , site_manager_mobile_number} = jobInfo
  const handlePhone = (phone) => {
    console.log('phone' , phone)
  }
  return (
    <div className="tiping-main">
      <Card>
        <CardContent>
          <div className="tip-info">
            <div className="tip-site">Site</div>
            <div className="tip-site-name">{site ? site : "N/A"}</div>
          </div>
          <div className="tip-info">
            <div className="tip-site">Address</div>
            <div className="tip-site-name">{job_address ? job_address : "N/A"}</div>
          </div>
          <div className="tip-info">
            <div className="tip-site">Status</div>
            <div className="tip-info-status">
              <CommonStatus status={jobStatus} statusTitle={jobStatus ? jobStatus : "Active"} />
              <button className="tip-time-btn">
                {tipTime ? tipTime : "7 Mins"}
              </button>
            </div>
          </div>

          <div className="tiping-action">
            <Button
              size="small"
              startIcon={<img src={phoneCall} alt="phone-icon" />}
              className="tip-call-btn"
              onClick={() => handlePhone(site_manager_mobile_number)}
            >
              Call
            </Button>

            <Button
              size="small"
              className="tip-call-btn"
            >
              ... More
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipingCard;
