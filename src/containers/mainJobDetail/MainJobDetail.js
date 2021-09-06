import React from "react";
import JobDetail from "../../components/jobsDetail/JobDetail";
import JobDetailHeader from "../../components/jobsDetail/jobHeader/JobDetailHeader";
import { Grid } from "@material-ui/core";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import DriverDetail from "../../components/driver/DriverDetail";
const MainJobDetail = () => {
  return (
    <>
      <JobDetailHeader />
      <Grid container spacing={3}>
        <Grid item md={7}>
          <JobDetail />
        </Grid>
        <Grid item md={5}>
          <DriverDetail />
        </Grid>
      </Grid>
    </>
  );
};

export default MainJobDetail;
