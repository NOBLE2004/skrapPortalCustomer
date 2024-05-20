/*global google*/
import React, {useEffect, useState} from "react";
import { Card, CardContent } from "@mui/material";
import MainMap from "../map/MainMap";
import {DirectionsRenderer, Marker} from "react-google-maps";
import {newMarker} from "../../assets/images";
import "../jobsDetail/findPostCode/findpostcode.scss";
const PolylineComp = ({start_lat, start_lng, destination_lat, destination_lng}) => {
    console.log(start_lat, start_lng)
    const [directions, setDricetions] = useState();
    const [options, setOptions] = useState();

    useEffect(()=> {
        setTimeout(() => {
            const routeOptions = new window.google.maps.Polyline({
                strokeOpacity: 1,
                strokeColor: '#dd00fd',
            });
            const marker = new window.google.maps.Marker({
                position:{
                    lat: parseFloat(start_lat),
                    lng: parseFloat(start_lng),
                },
                icon: newMarker
            });
            var directionsService = new window.google.maps.DirectionsService();
            setOptions({ polylineOptions: routeOptions, markerOptions: marker })
            directionsService.route(
                {
                    origin: {
                        lat: parseFloat(start_lat),
                        lng: parseFloat(start_lng),
                    },
                    destination: {lat: parseFloat(destination_lat), lng: parseFloat(destination_lng)},
                    travelMode: window.google.maps.TravelMode.DRIVING
                },
                (result, status) => {
                    if (status === window.google.maps.DirectionsStatus.OK) {
                        //changing the state of directions to the result of direction service
                        console.log(result)
                        setDricetions(result)
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        }, 1000)
    }, [])
    return (
        <div className="postcode-main">
            <Card className="driver-mapCard">
                <CardContent>
                    <MainMap
                        zoom={14}
                        defaultCenter={{
                            lat: parseFloat(start_lat),
                            lng: parseFloat(start_lng),
                        }}
                        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA6AYxz5ok7Wkt3SOsquumACIECcH933ws`}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={
                            <div style={{ height: `100%`, borderRadius: "12px" }} />
                        }
                    >
                        <DirectionsRenderer directions={directions} options={options}/>
                        <Marker
                            position={{
                                lat: parseFloat(destination_lat),
                                lng: parseFloat(destination_lng),
                            }}
                            icon={newMarker}
                        ></Marker>
                    </MainMap>
                </CardContent>
            </Card>
        </div>
    );
};

export default PolylineComp;
