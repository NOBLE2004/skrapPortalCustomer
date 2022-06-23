import { Card, CardContent } from "@material-ui/core";
import React from "react";
import { brickIcon, bracketIcon, appleIcon } from "../../../assets/images";
import "./smallCard.scss";
const SmallCard = () => {
  return (
    <div className="job-card-main">
      <Card className="job-card" style={{ background: "#80B74B" }}>
        <div className="sm-title">EWC Code: 16 03 06*</div>
        <div className="icon-setting">
          <img src={appleIcon} alt="snall-icon" />
          <span className="sm-title">Organic Waste</span>
        </div>
      </Card>

      <Card className="job-card" style={{ background: "#000" }}>
        <div className="sm-title">EWC Code: 16 03 06*</div>
        <div className="icon-setting">
          <img src={bracketIcon} alt="small-icon" />
          <span className="sm-title">Metal</span>
        </div>
      </Card>

      <Card className="job-card" style={{ background: "red" }}>
        <div className="sm-title">EWC Code: 16 03 06*</div>
        <div className="icon-setting">
          <img src={brickIcon} alt="snall-icon" />
          <span className="sm-title">Rubbel</span>
        </div>
      </Card>
    </div>
  );
};

export default SmallCard;
