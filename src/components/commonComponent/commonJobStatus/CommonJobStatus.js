import React from "react";
import { Paper } from "@material-ui/core";
import "./commonJobStatus.scss";
const CommonJobStatus = ({ jobStatus }) => {
  return (
    <div
      className="common-jobcard" 
      style={{ width: `${jobStatus.width}` , marginLeft:"10px"}}
    >
      <Paper className="common-box" style={{  height: `${jobStatus.height}` }}>
        <h1 className={jobStatus.fontSize ? "common-price1" : "common-price"}>{jobStatus.price}</h1>
        <span className={`common-status`}>
          {" "}
          {jobStatus.status}{" "}
        </span>
      </Paper>
    </div>
  );
};

export default CommonJobStatus;
