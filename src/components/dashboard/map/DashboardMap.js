import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";
import mapStyles from "./mapStyles";

function DashboardMap(props) {
  return (
    <GoogleMap
      defaultZoom={9}
      defaultCenter={{
        lat: 51.5707139,
        lng: -0.000043,
      }}
      defaultOptions={{ styles: mapStyles }}
    ></GoogleMap>
  );
}

export default withScriptjs(withGoogleMap(DashboardMap));
