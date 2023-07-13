import React from "react";
import { Paper, Grid } from "@mui/material";
import "./jobStatus.scss";

const JobStatus = ({ jobStatus }) => {

  return (
    <Grid item container spacing={1}>
        <Grid item lg={2.4} md={4}>
            <Paper className="box">
              <h1>{jobStatus.Pending}</h1>
              <span>Total<br/>Bookings</span>
            </Paper>
        </Grid>
        <Grid item lg={2.4} md={4}>
            <Paper className="box">
                <h1>{jobStatus.Delivered}</h1>
                <span>Total<br/>Delivered</span>
            </Paper>
        </Grid>
        <Grid item lg={2.4} md={4}>
            <Paper className="box">
              <h1>{parseFloat(jobStatus.Completed).toLocaleString() ?? ""}</h1>
              <span>Total<br/>Completed</span>
            </Paper>
        </Grid>
        <Grid item lg={2.4} md={4}>
            <div className="box">
                <h1>4,235tn</h1>
                <span>Total<br/>Weight</span>
            </div>
        </Grid>
        <Grid item lg={2.4} md={4}>
            <div className="box">
                <h1>3.23tn</h1>
                <span>Total<br/>Co2</span>
            </div>
        </Grid>
    </Grid>
  );
};

export default JobStatus;
