import React from "react";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import { Grid } from "@material-ui/core";
const SiteManagers = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <ManagerDetail />
        </Grid>
        <Grid item md={6}>
          <ManagerDetail />
        </Grid>
      </Grid>
    </div>
  );
};

export default SiteManagers;
