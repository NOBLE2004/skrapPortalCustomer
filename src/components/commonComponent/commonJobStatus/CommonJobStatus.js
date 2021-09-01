import React from "react";
import { Paper } from "@material-ui/core";
import "./commonJobStatus.scss";
import CommonStatus from "../commonStatus/CommonStatus";

const CommonJobStatus = ({ jobStatus }) => {
  return (
    <div
      className="common-jobcard"
      style={{ width: `${jobStatus.width}`, marginLeft: "10px" }}
    >
      <Paper className="common-box" style={{ height: `${jobStatus.height}` }}>
        <h1 className={jobStatus.fontSize ? "common-price1" : "common-price"}>
          {jobStatus.price}
        </h1>
        {(jobStatus.statusName === "pending") |
        (jobStatus.statusName === "completed") |
        (jobStatus.statusName === "assigned") ? (
          <CommonStatus status={jobStatus.statusName} />
        ) : (
          <span className={`${jobStatus.statusName}-title`}>
            {" "}
            {jobStatus.status}{" "}
          </span>
        )}
      </Paper>
    </div>
  );
};

export default CommonJobStatus;
