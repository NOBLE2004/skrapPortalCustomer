import React, { useEffect, useState } from "react";
import TotalSpend from "../../components/dashboard/totalSpend/TotalSpend";
import JobStatus from "../../components/dashboard/jobStatus/JobStatus";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Box, Grid, OutlinedInput, Select } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SpendChart from "../../components/dashboard/spendChart/SpendChart";
import DashboardServices from "../../components/dashboard/dashboardServices/DashboardServices";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import TipingCard from "../../components/tiping/TipingCard";
import { connect } from "react-redux";
import {
  getDashboardSaleData,
  getDashboardsData,
  getDashboardServiceData,
  getDashboardsMapData,
} from "../../store/actions/dashboard.action";
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
import { dummyDashboardData } from "../../components/utlils/dashboard";
import MenuItem from "@mui/material/MenuItem";
import ReportHeader from "../../components/report/header";
import DashboardHeader from "../../components/dashboard/Header";

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
  const dashboardData = useSelector((state) => state?.dashboard);
  const dashboardSale = useSelector((state) => state?.dashboardSale);
  const dashboardMap = useSelector((state) => state?.dashboardMap);
  const dashboardService = useSelector((state) => state?.dashboardService);
  const [isNewYear, setNewYear] = useState(false);
  const [latestYear, setLatestYear] = useState();
  const [startDate, setStartDate] = useState();
  const [date, setDate] = useState();
  const state = useSelector((state) => state?.landfillDiversion);
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [currency, setCurrency] = useState(localStorage.getItem("currency"));
  // const { info, loading } = props.dashboard;
  const info = dummyDashboardData;

  const getData = async (year) => {
    // setLatestYear(year);
    if (isNewYear) {
      await getDashboardsData({ year: year, currency });
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
    dispatch(getLandfillDiversion({ sites: selected, date, currency }));
    if (!dashboardMap?.info) {
      dispatch(getDashboardsMapData({ sites: selected, date, currency }));
    }
    if (!dashboardService?.info) {
      dispatch(getDashboardServiceData({ sites: selected, date, currency }));
    }
    // if (!dashboardSale?.info) {
    // dispatch(getDashboardSaleData());
    // }
    if (!dashboardData?.info) {
      dispatch(getDashboardsData({ sites: selected, date, currency }));
    }
  }, []);

  useEffect(() => {
    dispatch(getLandfillDiversion({ sites: selected, date, currency }));
    dispatch(getDashboardsMapData({ sites: selected, date, currency }));
    dispatch(getDashboardServiceData({ sites: selected, date, currency }));
    dispatch(getDashboardsData({ sites: selected, date, currency }));
    dispatch(
      getDashboardSaleData({
        year: latestYear,
        sites: selected,
        date,
        currency,
      })
    );
  }, [selected, latestYear, date, currency]);

  const gotoJobDetail = (id) => {
    history.push({ pathname: `job-detail/${id}` });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelected(value);
  };

  // if (loading) {
  //   return (
  //     <div className="dashboard-menu">
  //       <FadeLoader color={"#518ef8"} loading={loading} width={4} />
  //     </div>
  //   );
  // }

  console.log("çcccc", currency);

  return (
    <>
      {/* // info && ( */}
      <>
        {dashboardData?.loading ? (
          <Box
            height={"42px"}
            display="flex"
            my={2}
            justifyContent="center"
            alignItems="center"
          >
            <FadeLoader
              color={"#518ef8"}
              loading={dashboardData?.loading}
              width={4}
            />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <>
              <DashboardHeader
                sites={selected}
                handleChange={handleChange}
                selected={selected}
                setSelected={setSelected}
                setSiteCurrency={setCurrency}
                setDate={setDate}
                totalSpend={
                  dashboardData?.info?.TotalSpend
                    ? parseFloat(
                        dashboardData?.info?.TotalSpend
                      ).toLocaleString()
                    : ""
                }
              />
              {/*{userData?.hide_price === 0 && (*/}
              {/*  <Grid item md={4}>*/}
              {/*    <TotalSpend*/}
              {/*      totalSpend={*/}
              {/*        dashboardData?.info?.TotalSpend*/}
              {/*          ? parseFloat(*/}
              {/*              dashboardData?.info?.TotalSpend*/}
              {/*            ).toLocaleString()*/}
              {/*          : ""*/}
              {/*      }*/}
              {/*    />*/}
              {/*  </Grid>*/}
              {/*)}*/}
              <Grid item lg={7} md={12}>
                <div className="job-status-outer">
                  <JobStatus
                    jobStatus={dashboardData?.info ? dashboardData?.info : ""}
                  />
                </div>
              </Grid>
            </>

            {/* <Grid item md={2} xs={12}>
          <DashboardFilter handelSearch={() => {}} title="Jobs"/>
        </Grid> */}
          </Grid>
        )}
        <Grid container className="spend-service-main" mt={1}>
          <Grid item lg={5} md={12}>
            <SpendChart
              chartData={dashboardSale?.info}
              loading={dashboardSale?.loading}
              getDashBoardData={getData}
              startDate={startDate}
              setStartDate={setStartDate}
              setLatestYear={setLatestYear}
            />
          </Grid>
          <Grid item lg={7} md={12}>
            <DashboardServices
              servicesData={dashboardService?.info ? dashboardService.info : ""}
              loading={dashboardService?.loading}
            />
          </Grid>
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
          {dashboardMap?.loading ? (
            <Box
              height={"100px"}
              display="flex"
              width={"100%"}
              // my={2}
              justifyContent="center"
              alignItems="center"
            >
              <FadeLoader
                color={"#518ef8"}
                loading={dashboardMap?.loading}
                width={4}
              />
            </Box>
          ) : (
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
                    {dashboardMap?.info
                      ? dashboardMap?.info?.Map?.data.length > 0 &&
                        dashboardMap?.info?.Map?.data.map((data, index) => (
                          <Marker
                            key={index}
                            position={{
                              lat: data.job_location_lat
                                ? data.job_location_lat
                                : currency == "$"
                                ? "37.17567"
                                : "51.5506351",
                              lng: data.job_location_lng
                                ? data.job_location_lng
                                : currency == "$"
                                ? "-95.84670"
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
          )}
        </Grid>
      </>
    </>
  );
};

export default DashBoard;
