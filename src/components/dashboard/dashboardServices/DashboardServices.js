import React from "react";
import "./dashboardservices.scss";
import { CircularProgressbar } from "react-circular-progressbar";
import { Switch, makeStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  toggle: {
    "& .Mui-checked": {
      color: "#52a9dd",
      transform: "translateX(25px) !important",
    },
    "& .MuiSwitch-track": {
      backgroundColor: "#52a9dd",
    },
  },
}));
const DashboardServices = () => {
  const classes = useStyles();
  return (
    <div className="dashboard-services-main">
      <div className="services-main">
        <span className="primary-title">Services</span>
        <div>
          <FormControlLabel
            value="start"
            control={<Switch color="primary" className={classes.toggle} />}
            label="Show Amount"
            labelPlacement="start"
          />
        </div>
      </div>
      <div className="progress-main">
        <div className="progress-sub">
          <div className="circular-progress">
            <p>Skips</p>
            <CircularProgressbar value={50} text={`${50}%`} strokeWidth="15" />
          </div>
          <div className="order-percentage">
            <span className="order-title">25 / 50 </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="circular-progress">
          <p>Grab</p>
          <CircularProgressbar value={50} text={`${50}%`} strokeWidth="15" />
        </div>
        <div className="circular-progress">
          <p>Cage</p>
          <CircularProgressbar value={50} text={`${50}%`} strokeWidth="15" />
        </div>
      </div>
    </div>
  );
};

export default DashboardServices;
