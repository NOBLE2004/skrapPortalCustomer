import React from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import { phoneCall } from "../../assets/images/index";
import "./tipingcard.scss";

const TipingCard = ({ tipTime }) => {
  return (
    <div className="tiping-main">
      <Card>
        <CardContent>
          <div className="tip-info">
            <div className="tip-site">Site</div>
            <div className="tip-site-name">Hackney Tiping Center</div>
          </div>
          <div className="tip-info">
            <div className="tip-site">Address</div>
            <div className="tip-site-name">10 Anton Street, E8 2AD</div>
          </div>
          <div className="tip-info">
            <div className="tip-site">Status</div>
            <div className="tip-info-status">
              <CommonStatus status="completed" statusTitle="Active" />
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
