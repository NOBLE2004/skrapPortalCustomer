import React from "react";
import { Paper } from "@mui/material";
import "./jobStatus.scss";

const JobStatus = ({ jobStatus }) => {

  return (
    <>
      <div className="jobcard">
        <Paper className="box">
          <h1>{jobStatus.Delivered}</h1>
          <span className={`${"primary"}-title`}>{"Total Delivered"}</span>
        </Paper>
      </div>

      <div className="jobcard">
        <Paper className="box">
          <h1>{jobStatus.Pending}</h1>
          <span className={`${"pending"}-title`}>{"Pending"}</span>
        </Paper>
      </div>

      <div className="jobcard">
        <Paper className="box">
          <h1>{parseFloat(jobStatus.Completed).toLocaleString() ?? ""}</h1>
          <span className={`${"completed"}-title`}>{"Completed"}</span>
        </Paper>
      </div>
    </>
  );
};

export default JobStatus;
