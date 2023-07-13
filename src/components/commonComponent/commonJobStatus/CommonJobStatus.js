import React from "react";
import {Grid, Paper} from "@mui/material";
import CommonStatus from "../commonStatus/CommonStatus";
import "./commonJobStatus.scss";

const CommonJobStatus = ({ jobStatus }) => {
  return (
    // <div
    //   className="common-jobcard"
    //   style={{ minWidth: `${jobStatus.width}`, marginLeft: "10px" }}
    // >
    //   <Paper className="common-box" style={{ height: `${jobStatus.height}`, marginBottom: jobStatus.marginBottom ? jobStatus.marginBottom : ""  }}>
    //     <h1 className={jobStatus.fontSize ? "common-price1" : "common-price"}>
    //       {jobStatus.price}
    //     </h1>
    //     {(jobStatus.statusName === "pending") |
    //       (jobStatus.statusName === "completed") |
    //       (jobStatus.statusName === "delivered") ? (
    //       <CommonStatus status={jobStatus.statusName} />
    //     ) : (
    //       <span className={`${jobStatus.statusName}-title`}>
    //         {jobStatus.status}
    //       </span>
    //     )}
    //   </Paper>
    // </div>

      <Grid item lg={2} md={4}>
        <Paper className="box">
          <h1>{jobStatus.price}</h1>
          <span>{jobStatus.status}</span>
        </Paper>
      </Grid>
  );
};

export default CommonJobStatus;
