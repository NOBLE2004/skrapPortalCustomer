import React from "react";
import { Paper, Grid } from "@mui/material";
import "./jobStatus.scss";

const JobStatus = ({ jobStatus }) => {

  return (
    <Grid item container spacing={1}>
        <Grid item lg={2.4} md={4}>
            <Paper className="box">
              <h1>{jobStatus.NumberOfJobs}</h1>
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
              <h1>{jobStatus.Completed}</h1>
              <span>Total<br/>Completed</span>
            </Paper>
        </Grid>
        <Grid item lg={2.4} md={4}>
            <div className="box">
                <h1>{parseFloat(jobStatus.TotalTonnage).toFixed(2).toLocaleString()}<label style={{fontSize: '20px', marginTop: '4%', lineHeight: '20px'}}>tn</label></h1>
                <span>Total<br/>Weight</span>
            </div>
        </Grid>
        <Grid item lg={2.4} md={4}>
            <div className="box">
                <h1>{parseFloat(jobStatus.TotalCo2 > 500 ? jobStatus.TotalCo2 / 1000 : jobStatus.TotalCo2).toFixed(2).toLocaleString()}<label style={{fontSize: '20px', marginTop: '4%', lineHeight: '20px'}}>{jobStatus.TotalCo2 > 500 ? 'tn' : 'kg'}</label></h1>
                <span>Total<br/>Co2</span>
            </div>
        </Grid>
    </Grid>
  );
};

export default JobStatus;
