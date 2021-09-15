import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { dashboardServiceStyle } from "../../../assets/styles/muiStyles/MuiStyles";
import "./dashboardservices.scss";

const DashboardServices = ({ servicesData }) => {
  const classes = dashboardServiceStyle();
  const [showValue, setShowValue] = useState(false);
  const { Cage, Skip, Grab } = servicesData;
  return (
    <div className="dashboard-services-main">
      <div className="services-main">
        <span className="primary-title">Services</span>
        <div>
          <FormControlLabel
            value="start"
            control={
              <Switch
                color="primary"
                checked={showValue}
                onChange={() => setShowValue(!showValue)}
                className={classes.toggle}
              />
            }
            label="Show Amount"
            labelPlacement="start"
          />
        </div>
      </div>
      <div className="progress-main">
        <div className="progress-sub">
          <div className="circular-progress">
            <p>Skips</p>
            <CircularProgressbar
              value={Skip ? Skip.count  : "50"}
              text={showValue ? (Skip ? '£'+ Skip.total.slice(0 , Skip.total.length - 3) : "") : Skip ? Skip.count + "%" : "50%"}
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">25 / 50 </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress">
            <p>Grab</p>
            <CircularProgressbar
              value={Grab ? Grab.count  : "50"}
              text={showValue ? (Grab ? '£'+ Grab.total.slice(0 , Grab.total.length - 3) : "") : Grab ? Grab.count + "%" : "50%"}
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">35 / 50 </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress">
            <p>Cage</p>
            <CircularProgressbar
              value={Cage ? Cage.count  : "50"}
              text={showValue ? (Cage ? '£'+ Cage.total.slice(0 , Cage.total.length - 3) : "") : Cage ? Cage.count + "%" : "50%"}
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">17 / 50 </span>
            <span className="orders">orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardServices;
