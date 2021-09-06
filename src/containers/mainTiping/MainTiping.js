import React, { useEffect, useState } from "react";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid, Card, CardContent } from "@material-ui/core";
import { mapMarker } from "../../assets/images";
import TipingCard from "../../components/tiping/TipingCard";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import NewMapDirectionsRenderer from "../../components/map/NewMapDirectionsRenderer";
const MainTiping = () => {
  const [showInfo, setShowInfo] = useState(false);
  const dumyplaces = [
    { latitude: 51.55063, longitude: -0.0461 },
    { latitude: 51.56078, longitude: -0.25256 },
  ];
  const handleMarkerClick = () => {
    setShowInfo(true);
  };
  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Tiping Sites </div>
        <DashboardFilter title={"Tiping "} />
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
              <MainMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA6AYxz5ok7Wkt3SOsquumACIECcH933ws`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "12px" }} />
                }
              >
                <Marker
                  position={{
                    lat: 51.56078,
                    lng: -0.25256,
                  }}
                  onClick={() => {
                    setShowInfo(!showInfo);
                  }}
                >
                  {showInfo && (
                    <InfoWindow>
                      <TipingCard />
                    </InfoWindow>
                  )}
                </Marker>
                <NewMapDirectionsRenderer
                  places={dumyplaces}
                  // travelMode={window.google.maps.TravelMode.DRIVING}
                  onMarkerClick={handleMarkerClick}
                  info={showInfo}
                />
              </MainMap>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainTiping;
