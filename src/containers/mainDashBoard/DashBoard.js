import React, { useEffect, useState } from "react";
import TotalSpend from "../../components/dashboard/totalSpend/TotalSpend";
import JobStatus from "../../components/dashboard/jobStatus/JobStatus";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SpendChart from "../../components/dashboard/spendChart/SpendChart";
import DashboardServices from "../../components/dashboard/dashboardServices/DashboardServices";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import TipingCard from "../../components/tiping/TipingCard";
import DashboardService from "../../services/dashboard.service";
import {
  assignMarker,
  pendingMarker,
  cancelMarker,
  enRouteMarker,
  completeMarker,
  deliveredMarker,
  mapMarker,
} from "../../assets/images";
import "./dashboard.scss";

const markersList = [
  {
    lat: 51.5905,
    lng: -0.70461,
    icon: assignMarker,
  },
  {
    lat: 51.5705,
    lng: -0.60461,
    icon: pendingMarker,
  },
  {
    lat: 51.4805,
    lng: -0.70461,
    icon: cancelMarker,
  },
  {
    lat: 51.4505,
    lng: -0.60461,
    icon: enRouteMarker,
  },
  {
    lat: 51.65063,
    lng: -0.05461,
    icon: completeMarker,
  },
  {
    lat: 51.67963,
    lng: -0.15461,
    icon: deliveredMarker,
  },
  {
    lat: 51.46063,
    lng: -0.16161,
    icon: deliveredMarker,
  },
  {
    lat: 51.44063,
    lng: -0.05461,
    icon: deliveredMarker,
  },
  {
    lat: 51.55063,
    lng: -0.30461,
    icon: deliveredMarker,
  },
];

const DashBoard = () => {
  const [showInfoIndex, setShowInfoIndex] = useState(null);
  const [dashBoardData, setDashBoardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    DashboardService.getDashboardData()
      .then((res) => {
        setDashBoardData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <TotalSpend
            totalSpend={dashBoardData.TotalSpend}
          />
        </Grid>
        <Grid item md={6}>
          <div className="job-status-outer">
            <JobStatus jobStatus={dashBoardData} />
          </div>
        </Grid>
        <Grid item md={2}>
          <DashboardFilter />
        </Grid>
      </Grid>

      <Grid container spacing={3} className="spend-service-main">
        <SpendChart />
        <DashboardServices servicesData={dashBoardData} />
      </Grid>

      <Grid container spacing={3}>
        <Grid item md={12}>
          <div className="landfill">Landfill Diversion Rate</div>
          <hr />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className="jobMpWp">
          <div className="live-job-title">
            <img src={mapMarker} alt="map-marker" />
            <h1>Orders On Map</h1>
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
                {markersList.map((data, index) => {
                  return (
                    <Marker
                      key={index}
                      position={{
                        lat: data.lat,
                        lng: data.lng,
                      }}
                      icon={data.icon}
                      onClick={() => {
                        setShowInfoIndex(index);
                      }}
                    >
                      {showInfoIndex == index && (
                        <InfoWindow>
                          <TipingCard />
                        </InfoWindow>
                      )}
                    </Marker>
                  );
                })}
              </MainMap>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashBoard;
