import React, { useState, useEffect } from "react";
import { Marker, Polyline } from "react-google-maps";
import { enRouteMarker, destination } from "../../assets/images/index";

function MapDirectionsRenderer({
  places,
  travelMode,
  onMarkerClick,
}) {
  const [state, setState] = useState({
    directions: null,
    error: null,
    coords: null,
    updatedData: {},
  });
  const { directions, error, coords, updatedData } = state;

  useEffect(() => {
    
    const waypoints = places.map((p) => ({
      location: { lat: p.latitude, lng: p.longitude },
      stopover: true,
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        waypoints: waypoints,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setState({
            ...state,
            directions: result,
            coords: result.routes[0].overview_path,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
    
   
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }
  console.log('coordinates', coords)
  return (
    directions && (
      <>
        {coords && (
          <>
            <Polyline
              path={coords}
              geodesic={true}
              options={{
                strokeColor: "#FFBC39",
                strokeOpacity: 1.0,
                strokeWeight: 4,
              }}
            />
            <Marker
              key={1}
              position={
                new window.google.maps.LatLng(
                  updatedData.lat ? updatedData.lat : places[1].latitude,
                  updatedData.lng ? updatedData.lng : places[1].longitude
                )
              }
              icon={{ url: enRouteMarker }}
              onClick={onMarkerClick}
            />
            <Marker
              key={2}
              position={
                new window.google.maps.LatLng(
                  places[0].latitude,
                  places[0].longitude
                )
              }
              icon={{ url: destination }}
            />
          </>
        )}
      </>
    )
  );
}

export default MapDirectionsRenderer;
