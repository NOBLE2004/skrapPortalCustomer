import React, { useEffect, useState } from "react";
import TotalSpend from "../../components/dashboard/totalSpend/TotalSpend";
import JobStatus from "../../components/dashboard/jobStatus/JobStatus";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SpendChart from "../../components/dashboard/spendChart/SpendChart";
import DashboardServices from "../../components/dashboard/dashboardServices/DashboardServices";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import TipingCard from "../../components/tiping/TipingCard";
import { connect } from "react-redux";
import { getDashboardsData } from "../../store/actions/dashboard.action";
import { getLandfillDiversion } from "../../store/actions/action.landfillDiversion";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import {
  assignMarker,
  pendingMarker,
  completeMarker,
  deliveredMarker,
  mapMarker,
} from "../../assets/images";
import "./dashboard.scss";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { getUserDataFromLocalStorage } from "../../services/utils";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: "100%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    backgroundColor: "#A4ADBC",
    height: "15px",
    borderRadius: 40,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 40,
    height: "15px",
    backgroundImage: "linear-gradient(to right,#fa8c14 80%,#00b25d )",
  },
}));

const DashBoard = (props) => {
  const [showInfoIndex, setShowInfoIndex] = useState(null);
  const [isNewYear, setNewYear] = useState(false);
  const [latestYear, setLatestYear] = useState(2022);
  const [startDate, setStartDate] = useState();
  const state = useSelector((state) => state?.landfillDiversion);
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const { info, loading } = props.dashboard;

  const getData = async (year) => {
    setLatestYear(year);
    if (isNewYear) {
      await props.getDashboardsData(year);
    }
    setNewYear(true);
  };

  useEffect(() => {
    if (!startDate) {
      setStartDate(new Date());
      getData();
    }
    setUserData(getUserDataFromLocalStorage());
  }, []);

  useEffect(() => {
    dispatch(getLandfillDiversion());
  }, []);

  useEffect(() => {
    if (!info | isNewYear) {
      getData();
    }
  }, [isNewYear]);

  const gotoJobDetail = (id) => {
    history.push({ pathname: `job-detail/${id}` });
  };

  if (loading) {
    return (
      <div className="dashboard-menu">
        <FadeLoader color={"#518ef8"} loading={loading} width={4} />
      </div>
    );
  }

  return (
    <>
      {
        /*!info ? (
        <div className="jobs-not-found">Network error !</div>
      ) :*/ info && (
          <>
            <Grid container spacing={3}>
              {userData?.hide_price === 0 && (
                <Grid item md={4}>
                  <TotalSpend
                    totalSpend={
                      info ? parseFloat(info.TotalSpend).toLocaleString() : ""
                    }
                  />
                </Grid>
              )}
              <Grid item md={8} xs={12}>
                <div className="job-status-outer">
                  <JobStatus jobStatus={info ? info : ""} />
                </div>
              </Grid>
              {/* <Grid item md={2} xs={12}>
          <DashboardFilter handelSearch={() => {}} title="Jobs"/>
        </Grid> */}
            </Grid>
            <Grid container className="spend-service-main">
              <SpendChart
                chartData={info}
                getDashBoardData={getData}
                startDate={startDate}
                setStartDate={setStartDate}
                latestYear={latestYear ? latestYear : 2022}
              />
              <DashboardServices servicesData={info ? info : ""} />
            </Grid>
            <Grid container spacing={3}>
              <Grid item md={12} className="landfill-main">
                <div className="landfill">Landfill Diversion Rate</div>
                <div className="progress-bar">
                  <label
                    style={
                      state?.data?.result?.land_fill < 6
                        ? {
                            left: `${1}%`,
                          }
                        : {
                            left: `${
                              state?.data?.result?.land_fill > 95
                                ? 95
                                : state?.data?.result?.land_fill - 5
                            }%`,
                          }
                    }
                  >
                    {state?.data?.result?.land_fill}%
                  </label>
                  <BorderLinearProgress
                    value={state?.data?.result?.land_fill}
                    variant="determinate"
                  />
                </div>
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
                      {info
                        ? info?.Map?.data.length > 0 &&
                          info?.Map?.data.map((data, index) => (
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
                                  <TipingCard
                                    jobInfo={data}
                                    gotoJobDetail={() =>
                                      gotoJobDetail(data.job_id)
                                    }
                                  />
                                </InfoWindow>
                              )}
                            </Marker>
                          ))
                        : ""}
                    </MainMap>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>{" "}
          </>
        )
      }
    </>
  );
};

const mapStateToProps = ({ dashboard }) => {
  return { dashboard };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardsData: (year) => dispatch(getDashboardsData(year)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
