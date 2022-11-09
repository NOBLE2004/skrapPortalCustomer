import React, { useEffect, useState } from "react";
import TotalSpend from "../../components/dashboard/totalSpend/TotalSpend";
import JobStatus from "../../components/dashboard/jobStatus/JobStatus";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Box, Grid, Typography } from "@mui/material";
import { OutlinedInput, Select, Switch } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@mui/styles";

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
  ImageThree,
  ImageTwo,
  Union,
  Waste,
  Smoke,
} from "../../assets/images";
import "./dashboard.scss";
import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { getSites } from "../../store/actions/sites.action";
import SiteBreakDown from "../../components/dashboard/siteBreakDown";
import { getHireBreakdown } from "../../store/actions/action.hireBd";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
      padding: "0%",
      borderRadius: "16px",
    },
  },
};
const useStyles = makeStyles((theme) => ({
  selected: {},
  rootMenuItem: {
    margin: "1% !important",
    padding: "1% !important",
    "&$selected": {
      background: `linear-gradient(135deg, #76CCF8 27.99%, #518EF8 68.87%, #4981F8 77.07%)`,
      borderRadius: "8px",
      color: "white",
    },
  },
}));

const DashBoard = (props) => {
  const classes = useStyles();
  const [showInfoIndex, setShowInfoIndex] = useState(null);
  const [isNewYear, setNewYear] = useState(false);
  const [latestYear, setLatestYear] = useState(2022);
  const [startDate, setStartDate] = useState();
  const state = useSelector((state) => state);
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
  }, []);

  useEffect(() => {
    dispatch(getLandfillDiversion());
    dispatch(getSites());
    dispatch(getHireBreakdown({}));
  }, []);
  const [selected, setSelected] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelected(value);
  };

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

  console.log("state", info);
  return (
    <>
      {
        /*!info ? (
        <div className="jobs-not-found">Network error !</div>
      ) :*/ info && (
          <>
            <Grid container alignItems="flex-start" spacing={2}>
              <Grid item md={8} xs={12}>
                <Grid container>
                  <div className="select-dashboard">
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple={true}
                      value={selected}
                      displayEmpty
                      size="small"
                      onChange={handleChange}
                      // sx={{
                      //   width: "100%!important",
                      //   border: "none!important",
                      //   borderRadius: "16px!important",
                      //   boxShadow: "0 17px 24px rgb(58 58 58 / 5%)!important",
                      //   background: "#fff!important",
                      // }}
                      input={
                        <OutlinedInput
                          notched={false}
                          notchedOutline={false}
                          label="Name"
                        />
                      }
                      MenuProps={MenuProps}
                      renderValue={(selected) => {
                        if (selected?.length === 0) {
                          return <em>Sites</em>;
                        }
                        return (
                          selected?.length > 0 && (
                            <div className="text-sec">
                              Viewing: Multiple sites{" "}
                              <span>
                                {selected?.length} of{" "}
                                {props?.allsites?.data?.length} sites
                              </span>
                            </div>
                          )
                        );
                      }}
                    >
                      {state?.allsites?.data?.map((site, index) => (
                        <MenuItem
                          classes={{
                            selected: classes.selected,
                            root: classes.rootMenuItem,
                          }}
                          key={index}
                          value={site?.address_id}
                          //style={getStyles(name, personName, theme)}
                        >
                          {site?.job_address}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </Grid>
                <Grid container spacing={2} mt={0.5}>
                  <Grid item md={4}>
                    <TotalSpend
                      totalSpend={
                        info ? parseFloat(info.TotalSpend).toLocaleString() : ""
                      }
                    />
                  </Grid>
                  <Grid item md={2}>
                    <div className="jobcard">
                      <Paper className="box">
                        <Box sx={{ opacity: 0 }} textAlign="right">
                          <img src={Union} alt="" />
                        </Box>
                        <h1>{info?.Delivered}</h1>
                        <span className={`sub-heading-card clr-dark-blue`}>
                          Bookings <br />
                          Total
                        </span>
                      </Paper>
                    </div>
                  </Grid>
                  <Grid item md={2}>
                    <div className="jobcard">
                      <Paper className="box">
                        <Box textAlign="right">
                          <img src={Union} alt="" />
                        </Box>
                        <h1>{info?.Pending}</h1>
                        <span className={`sub-heading-card clr-light-gray`}>
                          Bookings <br /> pending
                        </span>
                      </Paper>
                    </div>
                  </Grid>
                  <Grid item md={2}>
                    <div className="jobcard">
                      <Paper className="box">
                        <Box textAlign="right">
                          <img src={ImageTwo} alt="" />
                        </Box>
                        <h1>{info?.Delivered}</h1>
                        <span className={`sub-heading-card clr-light-gray`}>
                          Bookings <br /> confirmed
                        </span>
                      </Paper>
                    </div>
                  </Grid>
                  <Grid item md={2}>
                    <div className="jobcard">
                      <Paper className="box">
                        <Box textAlign="right">
                          <img src={ImageThree} alt="" />
                        </Box>
                        <h1>{info?.Completed}</h1>
                        <span className="sub-heading-card clr-light-gray">
                          Bookings <br /> Complete
                        </span>
                      </Paper>
                    </div>
                  </Grid>
                  {/* <Grid item md={8} xs={12}>
                    <div className="job-status-outer">
                      <JobStatus jobStatus={info ? info : ""} />
                    </div>
                  </Grid> */}
                  {/* <Grid item md={2} xs={12}>
          <DashboardFilter handelSearch={() => {}} title="Jobs"/>
        </Grid> */}
                </Grid>
                <Grid container mt={2}>
                  <Grid item xs={12}>
                    <SpendChart
                      chartData={info}
                      getDashBoardData={getData}
                      startDate={startDate}
                      setStartDate={setStartDate}
                      latestYear={latestYear ? latestYear : 2022}
                    />
                  </Grid>
                </Grid>
                <Grid container mt={2}>
                  <Grid item xs={12}>
                    <div className="jobcard">
                      <Paper className="box">
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography className="hire-breakdown-title">
                            Hire Breakdown
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <p className="switch-title">Show value/percent</p>
                            <Switch />
                          </Box>
                        </Box>
                        <SiteBreakDown state={state} />
                      </Paper>
                    </div>
                  </Grid>
                </Grid>
                <Grid container mt={2} className="sustainability-section">
                  <Grid item xs={12}>
                    <div className="jobcard">
                      <Paper className="box">
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography className="hire-breakdown-title">
                            Sustainability
                          </Typography>
                          <Box display="flex" alignItems="center">
                            <p className="switch-title">Filter by:</p>
                            <span className="filter-strong">All bookings</span>
                          </Box>
                        </Box>
                        <Grid container spacing={2} mt={1}>
                          <Grid item xs={4}>
                            <Typography className="sustainability-title clr-light-blue ">
                              87%{" "}
                              <span className="  clr-light-blue">
                                Waste diverted
                              </span>
                            </Typography>
                            <p className="caption">7.36 tonnes diverted</p>
                          </Grid>
                          <Grid item xs={4}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Box>
                                <img src={Waste} alt="" />
                              </Box>
                              <Box pl={1}>
                                <Typography className="sustainability-title clr-light-gray  ">
                                  8.75
                                  <span className="  clr-light-gray ">
                                    kg CO2
                                  </span>
                                </Typography>
                                <p className="caption">Waste emissions</p>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-end"
                            >
                              <Box>
                                <img src={Smoke} alt="" />
                              </Box>
                              <Box pl={1}>
                                <Typography className="sustainability-title clr-light-gray  ">
                                  0.25
                                  <span className="clr-light-gray ">
                                    kg CO2
                                  </span>
                                </Typography>
                                <p className="caption">Transport emissions</p>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </div>
                  </Grid>
                </Grid>
                {/* <DashboardServices servicesData={info ? info : ""} /> */}
              </Grid>
              <Grid item md={4} xs={12} className="jobMpWp">
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
            </Grid>
            {/* <Grid container spacing={3}>
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
                                  : state?.data?.result?.land_fill-5
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
            </Grid> */}
            <Grid container></Grid>{" "}
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
