import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { dashboardServiceStyle } from "../../../assets/styles/muiStyles/MuiStyles";
import "./dashboardservices.scss";

const DashboardServices = ({ servicesData }) => {
  const classes = dashboardServiceStyle();
  const [showValue, setShowValue] = useState(false);
  const { Cage, Skip, Grab, NumberOfJobs , Aggregate , PortableToilet } = servicesData;
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
              value={Skip ? ((Skip.count / NumberOfJobs) * 100).toFixed(0) : "50"}
              text={
                showValue
                  ? Skip
                    ? "£" + Skip.total.slice(0, Skip.total.length - 3)
                    : ""
                  : Skip
                  ? Skip.count > 0 ? ((Skip.count / NumberOfJobs) * 100).toFixed(0) :  Skip.count + "%"
                  : "50%"
              }
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {" "}
              {Skip ? Skip.count : 0} / {NumberOfJobs}{" "}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress">
            <p>Grab</p>
            <CircularProgressbar
              value={Grab ? ((Grab.count / NumberOfJobs) * 100).toFixed(0) : "50"}
              text={
                showValue
                  ? Grab
                    ? "£" + Grab.total.slice(0, Grab.total.length - 3)
                    : ""
                  : Grab
                  ? Grab.count > 0 ? ((Grab.count / NumberOfJobs) * 100).toFixed(0) :  Grab.count + "%"
                  : "50%"
              }
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {Grab ? Grab.count : 0} / {NumberOfJobs}{" "}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress">
            <p>Cage</p>
            <CircularProgressbar
              value={Cage ? ((Cage.count / NumberOfJobs) * 100).toFixed(0) : "50"}
              text={
                showValue
                  ? Cage
                    ? "£" + Cage.total.slice(0, Cage.total.length - 3)
                    : ""
                  : Cage
                  ? Cage.count > 0 ? ((Grab.count / NumberOfJobs) * 100).toFixed(0) :  Cage.count + "%"
                  : "50%"
              }
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {Cage ? Cage.count : 0} / {NumberOfJobs}{" "}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress">
            <p>Aggregate</p>
            <CircularProgressbar
              value={Aggregate ? ((Aggregate.count / NumberOfJobs) * 100).toFixed(0) : "50"}
              text={
                showValue
                  ? Aggregate
                    ? "£" + Aggregate.total.slice(0, Aggregate.total.length - 3)
                    : ""
                  : Aggregate
                  ? Aggregate.count > 0 ? ((Aggregate.count / NumberOfJobs) * 100).toFixed(0) :  Aggregate.count + "%"
                  : "50%"
              }
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {Aggregate ? Aggregate.count : 0} / {NumberOfJobs}{" "}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress">
            <p>PortableToilet</p>
            <CircularProgressbar
              value={PortableToilet ? ((PortableToilet.count / NumberOfJobs) * 100).toFixed(0) : "50"}
              text={
                showValue
                  ? PortableToilet
                    ? "£" + PortableToilet.total.slice(0, PortableToilet.total.length - 3)
                    : ""
                  : PortableToilet
                  ? PortableToilet.count > 0 ? ((PortableToilet.count / NumberOfJobs) * 100).toFixed(0) :  PortableToilet.count + "%"
                  : "50%"
              }
              strokeWidth="7"
            />
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {PortableToilet ? PortableToilet.count : 0} / {NumberOfJobs}{" "}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardServices;
