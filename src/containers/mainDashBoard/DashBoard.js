import React from "react";
import TotalSpend from "../../components/dashboard/totalSpend/TotalSpend";
import JobStatus from "../../components/dashboard/jobStatus/JobStatus";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./dashboard.scss";
import SpendChart from "../../components/dashboard/spendChart/SpendChart";
import DashboardServices from "../../components/dashboard/dashboardServices/DashboardServices";
import DashboardMap from "../../components/dashboard/map/DashboardMap";
import { mapMarker } from "../../assets/images";
const dummyStatus = [
  { id: 0, price: 1000, status: "Total Delivered" , statusName:"primary" },
  { id: 1, price: 500, status: "Pending" , statusName:"pending" },
  { id: 2, price: 200, status: "Completed" , statusName:"completed" },
];

const DashBoard = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <TotalSpend />
        </Grid>
        <Grid item md={6}>
          <div className="job-status-outer">
            {dummyStatus.length > 0 &&
              dummyStatus.map((status, index) => (
                <JobStatus jobStatus={status} key={index} />
              ))}
          </div>
        </Grid>
        <Grid item md={2}>
          <DashboardFilter />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={4}>
          <SpendChart />
        </Grid>
        <Grid item md={8}>
          <DashboardServices />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={12}>
          <div className="landfill">Landfill Diversion Rate</div>
          <hr />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className="jobMpWp">
          <div className="live-job-title">
            {" "}
            <img src={mapMarker} alt="map-marker" />
            <h1>Orders On Map</h1>
          </div>

          <Card className="mapCard">
            <CardContent>
              <DashboardMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCBlokJrUARpKy_uFh-JYAl_MEyYdzw5FI`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "12px" }} />
                }
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashBoard;
