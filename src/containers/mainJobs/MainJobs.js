import React, { useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import JobsTable from "../../components/reactTable/JobsTable";
import { Card, CardContent } from "@material-ui/core";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import TipingCard from "../../components/tiping/TipingCard";
import { locationOval,enRouteMarker } from "../../assets/images";
import NewMapDirectionsRenderer from "../../components/map/NewMapDirectionsRenderer";
import "./mainjobs.scss";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";
import JobTable from "../../components/dataTable/JobTable";

const MainJobs = () => {
  const [isMapView, setMapView] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

  const handleShowMap = () => {
    setMapView(!isMapView);
  };
  const handleMarkerClick = () => {
    setShowInfo(true);
  };
  const dumyplaces = [
    { latitude: 51.55063, longitude: -0.0461 },
    { latitude: 51.56078, longitude: -0.25256 },
  ];
  return (
    <div>
      <CommonHeader bookSite={"Book Job"} handleShowMap={handleShowMap} isMap={isMapView}>
        <CommonJobStatus
          jobStatus={{
            status: "Sales",
            price: "£7,142.00",
            statusName: "primary",
            width: "184px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Jobs",
            price: "10",
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Pending",
            price: "4",
            statusName: "pending",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Completed",
            price: "4",
            statusName: "completed",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Assigned",
            price: "2",
            statusName: "assigned",
            width: "115px",
            height: "84px",
          }}
        />
      </CommonHeader>
      {isMapView ? (
        <JobTable />
      ) : (
        <>
          <div className="jobs-search-header">
            <CommonSearch />
            <CommonFilter />
          </div>
          {/* <div className="live-job-title">
            <img src={mapMarker} alt="map-marker" />
            <h1>Orders On Map</h1>
          </div> */}
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
                    lat: 51.55063,
                    lng: -0.0461,
                  }}
                  icon={enRouteMarker}
                  onClick={() => {
                    setShowInfo(!showInfo);
                  }}
                />
                  {showInfo && (
                    <InfoWindow 
                    position={{
                      lat: 51.56078,
                      lng:-0.25256
                    }}
                    >
                      <TipingCard />
                    </InfoWindow>
                  )}
                
                {showInfo && (
                  <NewMapDirectionsRenderer
                    places={dumyplaces}
                    onMarkerClick={handleMarkerClick}
                    info={showInfo}
                  />
                )}
              </MainMap>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MainJobs;
