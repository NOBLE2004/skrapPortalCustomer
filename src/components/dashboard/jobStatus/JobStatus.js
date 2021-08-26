import React from "react";
import { Paper, Grid } from "@material-ui/core";
import "./jobStatus.scss";

const JobStatus = ({ jobStatus }) => {
  return (
    <>
      <div className="jobcard">
        <Paper className="box">
          <h1>{jobStatus.price}</h1>
          <span className={`${jobStatus.statusName}-title`}> {jobStatus.status} </span>
        </Paper>
      </div>
    </>
  );
};

export default JobStatus;
