import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import mapStyles from "./mapStyles";
import TipingCard from "../../tiping/TipingCard";

function DashboardMap(props) {
  return (
    <GoogleMap
      defaultZoom={9}
      defaultCenter={{
        lat: -34.397,
        lng: 150.644,
      }}
      defaultOptions={{ styles: mapStyles }}
    >
      <Marker
        position={{
          lat: -34.397,
          lng: 150.644,
        }}
      >
        <InfoWindow>
          <TipingCard />
        </InfoWindow>
      </Marker>
      <Marker
        position={{
          lat: -33.397,
          lng: 150.50,
        }}
      >
        <InfoWindow>
          <TipingCard />
        </InfoWindow>
      </Marker>
    </GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(DashboardMap));
