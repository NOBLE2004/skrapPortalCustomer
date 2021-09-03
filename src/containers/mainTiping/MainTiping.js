import React from "react";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid , Card , CardContent } from "@material-ui/core";
import { mapMarker } from "../../assets/images";
import DashboardMap from "../../components/dashboard/map/DashboardMap";
import TipingCard from "../../components/tiping/TipingCard";
const MainTiping = () => {
  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Tiping Sites </div>
        <DashboardFilter title={"Filter By Tiping Site"}/>
      </div>
      <Grid container>
        <Grid item xs={12} className="jobMpWp">
          <div className="live-job-title">
            {" "}
            <img src={mapMarker} alt="map-marker" />
            <h1>Sites On Map</h1>
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

export default MainTiping;
