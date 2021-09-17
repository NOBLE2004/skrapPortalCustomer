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
import { useHistory } from "react-router-dom";
import {
  assignMarker,
  pendingMarker,
  completeMarker,
  deliveredMarker,
  mapMarker,
} from "../../assets/images";
import "./dashboard.scss";

const DashBoard = () => {
  const [showInfoIndex, setShowInfoIndex] = useState(null);
  const [dashBoardData, setDashBoardData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory()
  const getDashBoardData = (year) => {
    setIsLoading(true);
    DashboardService.getDashboardData(year)
      .then((res) => {
        console.log('res' , res.data)
        setDashBoardData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDashBoardData();
  }, []);

  const gotoJobDetail = () => {
    history.push("/job-detail")
  }
  return (
    <>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <TotalSpend totalSpend={dashBoardData.TotalSpend} />
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
            <SpendChart
              chartData={dashBoardData}
              getDashBoardData={getDashBoardData}
            />
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
                    {dashBoardData
                      ? dashBoardData?.Map?.data.length > 0 &&
                        dashBoardData?.Map?.data.map((data, index) => (
                          <Marker
                            key={index}
                            position={{
                              lat: data.job_location_lat
                                ? data.job_location_lat
                                : "51.5506351",
                              lng: data.job_location_lng
                                ? data.job_location_lng
                                : "-0.0460716",
                            }}
                            icon={{
                              url:
                                data.jobStatus === "Pending"
                                  ? pendingMarker
                                  : data.jobStatus === "Delivered"
                                  ? deliveredMarker
                                  : data.jobStatus === "Completed"
                                  ? completeMarker
                                  : assignMarker,
                            }}
                            onClick={() => {
                              setShowInfoIndex(index);
                            }}
                          >
                            {showInfoIndex === index && (
                              <InfoWindow>
                                <TipingCard jobInfo={data} gotoJobDetail={gotoJobDetail}/>
                              </InfoWindow>
                            )}
                          </Marker>
                        ))
                      : ""}
                  </MainMap>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        {/* </>
      )} */}
    </>
  );
};

export default DashBoard;
