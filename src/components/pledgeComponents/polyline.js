import React from "react";
import { Card, CardContent } from "@mui/material";
import MainMap from "../map/MainMap";
import { Polyline } from "react-google-maps";
import "../jobsDetail/findPostCode/findpostcode.scss";
const PolylineComp = ({start_lat, start_lng, destination_lat, destination_lng}) => {
    return (
        <div className="postcode-main">
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
                        <Polyline
                            path={[
                                {lat: start_lat, lng: start_lng},
                                {lat: destination_lat, lng: destination_lng}
                            ]}
                            strokeColor="#0000FF"
                            strokeOpacity={0.8}
                            strokeWeight={2} />
                    </MainMap>
                </CardContent>
            </Card>
        </div>
    );
};

export default PolylineComp;
