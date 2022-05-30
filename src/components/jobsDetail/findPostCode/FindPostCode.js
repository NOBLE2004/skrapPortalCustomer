import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { postCodeIcon, searchIcon, locationOval, mapMarker } from "../../../assets/images";
import { Card, CardContent } from "@mui/material";
import MainMap from "../../map/MainMap";
import { Marker } from "react-google-maps";
import "./findpostcode.scss";
const FindPostCode = ({lat, lng}) => {
  return (
    <div className="postcode-main">
      {/*<TextField
        variant="outlined"
        size="small"
        placeholder="Find Postcode"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <img src={postCodeIcon} alt="post-code-icon" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <img src={searchIcon} alt="search-icon" />
            </InputAdornment>
          ),
        }}
      />*/}
      <Card className="driver-mapCard">
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
                lat,
                lng,
              }}
              icon={mapMarker}
            ></Marker>
          </MainMap>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindPostCode;
