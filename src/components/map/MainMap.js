import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
} from "react-google-maps";
import mapStyles from "./mapStyles";
const MainMap = ({children}) => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{
        lat: 51.55063,
        lng: -0.0461,
      }}
      defaultOptions={{ styles: mapStyles }}
    >
      {children}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(MainMap));
