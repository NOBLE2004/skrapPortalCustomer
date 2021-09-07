import React from "react";
import TotalSpend from "../../components/dashboard/totalSpend/TotalSpend";
import JobStatus from "../../components/dashboard/jobStatus/JobStatus";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SpendChart from "../../components/dashboard/spendChart/SpendChart";
import DashboardServices from "../../components/dashboard/dashboardServices/DashboardServices";
import { mapMarker } from "../../assets/images";
import { dummyStatus } from "../../environment";
import "./dashboard.scss";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import TipingCard from "../../components/tiping/TipingCard";
const DashBoard = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <TotalSpend />
        </Grid>
        <Grid item md={6}>
          <div className="job-status-outer">
            {dummyStatus.map((status, index) => (
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
            <img src={mapMarker} alt="map-marker" />
            <h1>Orders On Map</h1>
          </div>
          <Card className="mapCard">
            <CardContent>
              <MainMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA6AYxz5ok7Wkt3SOsquumACIECcH933ws`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "12px" }} />
                }
              >
               
              </MainMap>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashBoard;
