import React, { useState } from "react";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid, Card, CardContent } from "@material-ui/core";
import { mapMarker } from "../../assets/images";
import TipingCard from "../../components/tiping/TipingCard";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import { locationOval, craneIcon } from "../../assets/images";
import "./mainTiping.scss";

const MainTiping = () => {
  const [card1, setCard1] = useState(false);
  const [card2, setCard2] = useState(false);
  const [card3, setCard3] = useState(false);
  const [card4, setCard4] = useState(false);

  const handleCard1 = () => {
    setCard1(!card1);
  };

  const handleCard2 = () => {
    setCard2(!card2);
  };

  const handleCard3 = () => {
    setCard3(!card3);
  };
  const handleCard4 = () => {
    setCard4(!card4);
  };
  return (
    <div className="main-tiping">
      <div className="header-main">
        <div className="sites-header-title">Tiping Sites </div>
        <DashboardFilter title={"Tiping "} />
      </div>
      <Grid container>
        <Grid item xs={12} className="jobMpWp">
          <div className="live-job-title">
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
                  visible={true}
                  position={{
                    lat: 51.62,
                    lng: -0.70461,
                  }}
                  icon={craneIcon}
                  onClick={() => handleCard1()}
                />
                <Marker
                  visible={false}
                  position={{
                    lat: 51.5705,
                    lng: -0.60461,
                  }}
                  icon={locationOval}
                />
                {card1 && (
                  <InfoWindow
                    position={{
                      lat: 51.5705,
                      lng: -0.60461,
                    }}
                  >
                    <TipingCard />
                  </InfoWindow>
                )}

                <Marker
                  visible={true}
                  position={{
                    lat: 51.4805,
                    lng: -0.70461,
                  }}
                  icon={craneIcon}
                  onClick={() => handleCard2()}
                />
                <Marker
                  visible={false}
                  position={{
                    lat: 51.4505,
                    lng: -0.60461,
                  }}
                />
                {card2 && (
                  <InfoWindow
                    position={{
                      lat: 51.4505,
                      lng: -0.60461,
                    }}
                  >
                    <TipingCard />
                  </InfoWindow>
                )}

                <Marker
                  visible={true}
                  position={{
                    lat: 51.67963,
                    lng: -0.15461,
                  }}
                  icon={craneIcon}
                  onClick={() => handleCard3()}
                />

                <Marker
                  visible={false}
                  position={{
                    lat: 51.65063,
                    lng: -0.05461,
                  }}
                  icon={locationOval}
                />
                {card3 && (
                  <InfoWindow
                    position={{
                      lat: 51.65063,
                      lng: -0.05461,
                    }}
                  >
                    <TipingCard />
                  </InfoWindow>
                )}

                <Marker
                  visible={true}
                  position={{
                    lat: 51.46063,
                    lng: -0.16161,
                  }}
                  icon={craneIcon}
                  onClick={() => handleCard4()}
                />

                <Marker
                  visible={false}
                  position={{
                    lat: 51.44063,
                    lng: -0.05461,
                  }}
                  icon={locationOval}
                />
                {card4 && (
                  <InfoWindow
                    position={{
                      lat: 51.44063,
                      lng: -0.05461,
                    }}
                  >
                    <TipingCard />
                  </InfoWindow>
                )}
              </MainMap>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainTiping;
