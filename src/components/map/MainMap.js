import React from "react";
import { withGoogleMap, withScriptjs, GoogleMap } from "react-google-maps";
import mapStyles from "./mapStyles";
const MainMap = ({ children }) => {
  const currency = localStorage.getItem("currency");
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{
        lat: currency == "$" ? 37.17567 : 51.55063,
        lng: currency == "$" ? -95.8467 : -0.0461,
      }}
      defaultOptions={{ styles: mapStyles }}
    >
      {children}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(MainMap));
