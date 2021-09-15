import React from "react";
import { Paper } from "@material-ui/core";
import CommonStatus from "../commonStatus/CommonStatus";
import "./commonJobStatus.scss";

const CommonJobStatus = ({ jobStatus }) => {
  return (
    <div
      className="common-jobcard"
      style={{ minWidth: `${jobStatus.width}`, marginLeft: "10px" }}
    >
      <Paper className="common-box" style={{ height: `${jobStatus.height}`, marginBottom: jobStatus.marginBottom ? jobStatus.marginBottom : ""  }}>
        <h1 className={jobStatus.fontSize ? "common-price1" : "common-price"}>
          {jobStatus.price}
        </h1>
        {(jobStatus.statusName === "pending") |
          (jobStatus.statusName === "completed") |
          (jobStatus.statusName === "assigned") ? (
          <CommonStatus status={jobStatus.statusName} />
        ) : (
          <span className={`${jobStatus.statusName}-title`}>
            {jobStatus.status}
          </span>
        )}
      </Paper>
    </div>
  );
};

export default CommonJobStatus;
