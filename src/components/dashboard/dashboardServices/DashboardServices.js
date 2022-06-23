import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { CircleProgress } from "react-gradient-progress";

import { Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { dashboardServiceStyle } from "../../../assets/styles/muiStyles/MuiStyles";
import "./dashboardservices.scss";

const DashboardServices = ({ servicesData }) => {
  const classes = dashboardServiceStyle();
  const [showValue, setShowValue] = useState(false);
  const { Cage, Skip, Grab, NumberOfJobs, Aggregate, PortableToilet } = servicesData;
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
          <div className="circular-progress" style={{ position: 'relative' }}>
            <p style={{ position: 'absolute', top: '50px' }}>Skips</p>
            <div>
              <CircleProgress
                width={180}
                strokeWidth={12}
                fontFamily={"DM Sans"}
                fontSize={"26px"}
                fontColor={"#5a9df9"}
                fontWeight={"700"}
                secondaryColor={"#F7F7F7"}
                hidePercentageText={showValue ? true : false}
                percentage={Skip ? ((Skip.count / NumberOfJobs) * 100).toFixed(0) : "50"}
                primaryColor={["#73C6F9", "#5391F9"]}
              />
              {showValue ? <div className="circle-text" style={{


              }}>{"£" + (parseInt(Skip.total).toLocaleString())}</div>
                : ''}
            </div>
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
          <div className="circular-progress" style={{ position: 'relative' }}>
            <p style={{ position: 'absolute', top: '50px' }}>Grab</p>
            <div>
              <CircleProgress
                width={180}
                strokeWidth={12}
                fontFamily={"DM Sans"}
                fontSize={"26px"}
                fontColor={"#5a9df9"}
                fontWeight={"700"}
                secondaryColor={"#F7F7F7"}
                hidePercentageText={showValue ? true : false}
                percentage={Grab ? ((Grab.count / NumberOfJobs) * 100).toFixed(0) : "50"}
                primaryColor={["#73C6F9", "#5391F9"]}
              />
              {showValue ? <div className="circle-text" style={{


              }}>{"£" + (parseInt(Grab.total).toLocaleString())}</div>
                : ''}
            </div>
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {Grab ? Grab.count : 0} / {NumberOfJobs}
            </span>
            <span className="orders">orders</span>
          </div>

        </div>

        <div className="progress-sub">
          <div className="circular-progress" style={{ position: 'relative' }}>
            <p style={{ position: 'absolute', top: '50px' }}>Cage</p>
            <div>
              <CircleProgress
                width={180}
                strokeWidth={12}
                fontFamily={"DM Sans"}
                fontSize={"26px"}
                fontColor={"#5a9df9"}
                fontWeight={"700"}
                secondaryColor={"#F7F7F7"}
                hidePercentageText={showValue ? true : false}
                percentage={Cage ? ((Cage.count / NumberOfJobs) * 100).toFixed(0) : "50"}
                primaryColor={["#73C6F9", "#5391F9"]}
              />
              {showValue ? <div className="circle-text" style={{


              }}>{"£" + (parseInt(Cage.total).toLocaleString())}</div>
                : ''}
            </div>
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {Cage ? Cage.count : 0} / {NumberOfJobs}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress" style={{ position: 'relative' }}>
            <p style={{ position: 'absolute', top: '50px' }}>Aggregate</p>
            <div>
              <CircleProgress
                width={180}
                strokeWidth={12}
                fontFamily={"DM Sans"}
                fontSize={"26px"}
                fontColor={"#5a9df9"}
                fontWeight={"700"}
                secondaryColor={"#F7F7F7"}
                hidePercentageText={showValue ? true : false}
                percentage={Aggregate ? ((Aggregate.count / NumberOfJobs) * 100).toFixed(0) : "50"}
                primaryColor={["#73C6F9", "#5391F9"]}
              />
              {showValue ? <div className="circle-text" style={{


              }}>{"£" + (parseInt(Aggregate.total).toLocaleString())}</div>
                : ''}
            </div>
          </div>
          <div className="order-percentage">
            <span className="order-title">
              {Aggregate ? Aggregate.count : 0} / {NumberOfJobs}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>

        <div className="progress-sub">
          <div className="circular-progress" style={{ position: 'relative' }}>
            <p style={{ position: 'absolute', top: '50px' }}>PortableToilet</p>
            <div>
              <CircleProgress
                width={180}
                strokeWidth={12}
                fontFamily={"DM Sans"}
                fontSize={"26px"}
                fontColor={"#5a9df9"}
                fontWeight={"700"}
                secondaryColor={"#F7F7F7"}
                hidePercentageText={showValue ? true : false}
                percentage={PortableToilet ? ((PortableToilet.count / NumberOfJobs) * 100).toFixed(0) : "50"}
                primaryColor={["#73C6F9", "#5391F9"]}
              />
              {showValue ? <div className="circle-text" style={{


              }}>{"£" + (parseInt(PortableToilet.total).toLocaleString())}</div>
                : ''}
            </div>
          </div>
          <div className="order-percentage">
            <span className="order-title">
            {PortableToilet ? PortableToilet.count : 0} / {NumberOfJobs}
            </span>
            <span className="orders">orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardServices;
