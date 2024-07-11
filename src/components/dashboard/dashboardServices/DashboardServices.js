import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { CircleProgress } from "react-gradient-progress";

import { Box, Grid, Skeleton, Stack, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { dashboardServiceStyle } from "../../../assets/styles/muiStyles/MuiStyles";
import "./dashboardservices.scss";
import { numberWithCommas } from "../../utlils/dashboard";
import Carousel, { consts } from "react-elastic-carousel";
import IconVehicle from '../../../assets/images/icon-vehicles.svg'
import FadeLoader from "react-spinners/FadeLoader";
import logo from "../../../assets/images/logo_blue.svg"

const breakPoints = [
  { width: 1, itemsToShow: 3, pagination: false },
  { width: 550, itemsToShow: 4, itemsToScroll: 2, pagination: false },
  { width: 850, itemsToShow: 5, pagination: false },
  { width: 1150, itemsToShow: 5, itemsToScroll: 2, pagination: false },
  { width: 1450, itemsToShow: 4, pagination: false },
  { width: 1750, itemsToShow: 5, pagination: false },
];
const DashboardServices = ({ servicesData, loading, total }) => {
  const classes = dashboardServiceStyle();
  const currency = localStorage.getItem("currency");

  const country_code = localStorage.getItem("country_code");

  // console.log(country_code,'country Code')

  const [showValue, setShowValue] = useState(false);
  const [services, setServices] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);

  // useEffect(() => {
    // if(servicesData){
    //   Cage.name = "Cage";
    //   Skip.name = "Skip";
    //   Grab.name = "Grab";
    //   Aggregate.name = "Aggregate";
    //   PortableToilet.name = "PortableToilet";
    //   Trailer.name = "Trailer";
    //   Concrete.name = "Concrete";
    //   Compacter.name = "Compacter";
    //   let list = [Cage, Skip, Grab, Aggregate, PortableToilet, Trailer, Concrete, Compacter].sort(function (
    //       a,
    //       b
    //   ) {
    //     console.log(a);
    //     var x = a["count"];
    //     var y = b["count"];
    //     return x < y ? 1 : x > y ? -1 : 0;
    //   });
    //   setServices(list);
    // }
  //   if (servicesData) {
  //     const ser = []
  //     Object.entries(servicesData).map(([key, value], index) => {
  //       if (key !== 'NumberOfJobs') {
  //         ser.push({ name: key, count: value.count, total: value.total, percentage: value.percentage, icon: value.icon });
  //       } else {
  //         setTotalJobs(value)
  //       }
  //     });
  //     let list = ser.sort(function (
  //       a,
  //       b
  //     ) {
  //       console.log(a);
  //       var x = a["count"];
  //       var y = b["count"];
  //       return x < y ? 1 : x > y ? -1 : 0;
  //     });
  //     setServices(list);
  //   }
  // }, [servicesData]);


  // const getPercentage = (service) => {
  //   if(service?.count){
  //     const per = ((service.count / totalJobs) * 100).toFixed(2);
  //     let percentage = 0;
  //     if(per > 0){
  //       console.log(per);
  //       percentage = parseFloat(per);
  //       const sum += percentage;
  //       console.log(sum);
  //     }
  //     return percentage;
  //   }else{
  //     return 0
  //   }
  //
  // }

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer = type === consts.PREV ? "<" : ">";
    return (
      <span className="span-for-arrows" onClick={onClick} disabled={isEdge}>
        {pointer}
      </span>
    );
  };

  return (
    <>
      {loading ? (
        <Box
          height={"120px"}
          display="flex"
          my={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "96%",
            background: "#fff",
            boxShadow: "0px 17px 24px rgb(58 58 58 / 5%) !important",
            borderRadius: "11.6836px",
            padding: "0px 12px",
            marginRight: "10px",
          }}
        >
          <Stack spacing={1} px={2} width={'100%'}>
            <Skeleton variant='rectangular' width={'100%'} height={100} />
          </Stack>        </Box>
      ) : (
        <div className="dashboard-services-main">
          <>
            <div className="services-main">
              <span className="primary-title">Services</span>
              <div>
                <FormControlLabel
                  value="start"
                  control={
                    <Switch
                      color="primary"
                      checked={showValue}
                      disabled={servicesData.length > 0 ? false : true}
                      onChange={() => setShowValue(!showValue)}
                      className={classes.toggle}
                    />
                  }
                  style={{ color: "#677790" }}
                  label="Show value/percent"
                  labelPlacement="start"
                />
              </div>
            </div>
            <Grid container spacing={1} alignItems="center">
              <Grid
                item
                style={{paddingTop: 0}}
                lg={12}
                md={12}
                sm={12}
                xs={12}
                className="main-for-carusal"
              >
                <>
                  {servicesData.length > 0 ? <Carousel
                      itemsToShow={4}
                      renderArrow={myArrow}
                      breakPoints={breakPoints}
                  >
                    {servicesData?.map((service, index) => {
                      return (
                          <div className="service-box p-2" key={index}>
                            <div style={{minHeight: '60px', display: "flex", justifyContent: "center", alignItems: "center"}}>
                              <img
                                  src={service.full_url || logo}
                                  alt=""
                                  style={{ width: service.full_url ? "80px" : "40px" }}
                              />
                            </div>
                            <div className="service-detail">
                              <div className="name" style={{ padding: 0 }}>{service.parent_name}</div>
                              {showValue ? (
                                  <div className="percentage">{service?.total
                                      ? `${currency ? currency : "£"}` +
                                      parseFloat(service?.total).toLocaleString()
                                      : `${currency ? currency : "£"}` + 0}</div>
                              ) : (
                                  <div className="percentage">{service.cnt > 0 ? ((service.cnt / total)  * 100).toFixed(2) : service.cnt.toFixed(2)}%</div>
                              )}
                            </div>
                          </div>
                      );
                    })}
                  </Carousel> : <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: '80px'}}>
                    <div className="name">No data.</div>
                  </div>}
                </>
              </Grid>
            </Grid>
            {/* <div className="progress-main">
              {services?.map((service, index) => {
                return (
                  <div className="progress-sub" key={index}>
                    <div
                      className="circular-progress"
                      style={{ position: "relative" }}
                    >
                      <p style={{ position: "absolute", bottom: "60px" }}>
                        {service.name}
                      </p>
                      <div>
                        <CircleProgress
                          width={180}
                          strokeWidth={15}
                          fontFamily={"DM Sans"}
                          fontSize={"20px"}
                          fontColor={"#5a9df9"}
                          fontWeight={"700"}
                          secondaryColor={"#F7F7F7"}
                          hidePercentageText={showValue ? true : false}
                          percentage={service?.percentage}
                          primaryColor={["#73C6F9", "#5391F9"]}
                        />
                        {showValue ? (
                          <div className="circle-text" style={{}}>
                            {service?.total
                              ? `${currency ? currency : "£"}` +
                              parseInt(service?.total)?.toLocaleString()
                              : `${currency ? currency : "£"}` + 0}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="order-percentage">
                      <span className="order-title">
                        {" "}
                        {service?.count
                          ? numberWithCommas(service?.count)
                          : 0}{" "}
                        / {numberWithCommas(totalJobs ? totalJobs : 0)}{" "}
                      </span>
                      <span className="orders">orders</span>
                    </div>
                  </div>
                );
              })}

              
            </div> */}
          </>
        </div>
      )}
    </>
  );
};

export default DashboardServices;
