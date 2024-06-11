import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { CircleProgress } from "react-gradient-progress";

import { Box, Skeleton, Stack, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { dashboardServiceStyle } from "../../../assets/styles/muiStyles/MuiStyles";
import "./dashboardservices.scss";
import { numberWithCommas } from "../../utlils/dashboard";
import FadeLoader from "react-spinners/FadeLoader";

const DashboardServices = ({ servicesData, loading }) => {
  const classes = dashboardServiceStyle();
  const currency = localStorage.getItem("currency");

  const country_code = localStorage.getItem("country_code");

  // console.log(country_code,'country Code')

  const [showValue, setShowValue] = useState(false);
  const [services, setServices] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
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
    if (servicesData) {
      const ser = []
      Object.entries(servicesData).map(([key, value], index) => {
        if (key !== 'NumberOfJobs') {
          ser.push({ name: key, count: value.count, total: value.total, percentage: value.percentage });
        } else {
          setTotalJobs(value)
        }
      });
      let list = ser.sort(function (
        a,
        b
      ) {
        console.log(a);
        var x = a["count"];
        var y = b["count"];
        return x < y ? 1 : x > y ? -1 : 0;
      });
      setServices(list);
    }
  }, [servicesData]);


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

  return (
    <>
      {loading ? (
        <Box
          height={"400px"}
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
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            <Skeleton variant='rounded' height={20} />
            <Skeleton variant='rectangular' width={'100%'} height={200} />
            <Skeleton variant='rounded' height={20} />
            <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
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
                      onChange={() => setShowValue(!showValue)}
                      className={classes.toggle}
                    />
                  }
                  label="Show Amount"
                  labelPlacement="start"
                />
              </div>
            </div>
            <div className="progress-main">
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

              {/*<div className="progress-sub">*/}
              {/*  <div className="circular-progress" style={{ position: "relative" }}>*/}
              {/*    <p style={{ position: "absolute", bottom: "60px" }}>Grab</p>*/}
              {/*    <div>*/}
              {/*      <CircleProgress*/}
              {/*        width={180}*/}
              {/*        strokeWidth={15}*/}
              {/*        fontFamily={"DM Sans"}*/}
              {/*        bottom={20}*/}
              {/*        fontSize={"20px"}*/}
              {/*        fontColor={"#5a9df9"}*/}
              {/*        fontWeight={"700"}*/}
              {/*        secondaryColor={"#F7F7F7"}*/}
              {/*        hidePercentageText={showValue ? true : false}*/}
              {/*        percentage={*/}
              {/*          Grab*/}
              {/*            ? Grab?.count*/}
              {/*              ? ((Grab.count / NumberOfJobs) * 100).toFixed(0)*/}
              {/*              : 0*/}
              {/*            : 0*/}
              {/*        }*/}
              {/*        primaryColor={["#73C6F9", "#5391F9"]}*/}
              {/*      />*/}
              {/*      {showValue ? (*/}
              {/*        <div className="circle-text" style={{}}>*/}
              {/*          {Grab?.total*/}
              {/*            ? "£" + parseInt(Grab.total).toLocaleString()*/}
              {/*            : "£" + 0}*/}
              {/*        </div>*/}
              {/*      ) : (*/}
              {/*        ""*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="order-percentage">*/}
              {/*    <span className="order-title">*/}
              {/*      {Grab?.count ? Grab.count : 0} / {NumberOfJobs}*/}
              {/*    </span>*/}
              {/*    <span className="orders">orders</span>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="progress-sub">*/}
              {/*  <div className="circular-progress" style={{ position: "relative" }}>*/}
              {/*    <p style={{ position: "absolute", bottom: "60px" }}>Cage</p>*/}
              {/*    <div>*/}
              {/*      <CircleProgress*/}
              {/*        width={180}*/}
              {/*        strokeWidth={15}*/}
              {/*        fontFamily={"DM Sans"}*/}
              {/*        fontSize={"20px"}*/}
              {/*        fontColor={"#5a9df9"}*/}
              {/*        fontWeight={"700"}*/}
              {/*        secondaryColor={"#F7F7F7"}*/}
              {/*        hidePercentageText={showValue ? true : false}*/}
              {/*        percentage={*/}
              {/*          Cage*/}
              {/*            ? Cage?.count*/}
              {/*              ? ((Cage.count / NumberOfJobs) * 100).toFixed(0)*/}
              {/*              : 0*/}
              {/*            : 0*/}
              {/*        }*/}
              {/*        primaryColor={["#73C6F9", "#5391F9"]}*/}
              {/*      />*/}
              {/*      {showValue ? (*/}
              {/*        <div className="circle-text" style={{}}>*/}
              {/*          {Cage?.total*/}
              {/*            ? "£" + parseInt(Cage.total).toLocaleString()*/}
              {/*            : "£" + 0}*/}
              {/*        </div>*/}
              {/*      ) : (*/}
              {/*        ""*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="order-percentage">*/}
              {/*    <span className="order-title">*/}
              {/*      {Cage?.count ? Cage.count : 0} / {NumberOfJobs}*/}
              {/*    </span>*/}
              {/*    <span className="orders">orders</span>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="progress-sub">*/}
              {/*  <div className="circular-progress" style={{ position: "relative" }}>*/}
              {/*    <p style={{ position: "absolute", bottom: "60px" }}>Aggregate</p>*/}
              {/*    <div>*/}
              {/*      <CircleProgress*/}
              {/*        width={180}*/}
              {/*        strokeWidth={15}*/}
              {/*        fontFamily={"DM Sans"}*/}
              {/*        fontSize={"20px"}*/}
              {/*        fontColor={"#5a9df9"}*/}
              {/*        fontWeight={"700"}*/}
              {/*        secondaryColor={"#F7F7F7"}*/}
              {/*        hidePercentageText={showValue ? true : false}*/}
              {/*        percentage={*/}
              {/*          Aggregate*/}
              {/*            ? Aggregate?.count*/}
              {/*              ? ((Aggregate.count / NumberOfJobs) * 100).toFixed(0)*/}
              {/*              : 0*/}
              {/*            : 0*/}
              {/*        }*/}
              {/*        primaryColor={["#73C6F9", "#5391F9"]}*/}
              {/*      />*/}
              {/*      {showValue ? (*/}
              {/*        <div className="circle-text" style={{}}>*/}
              {/*          {Aggregate?.count*/}
              {/*            ? "£" + parseInt(Aggregate.total).toLocaleString()*/}
              {/*            : "£" + 0}*/}
              {/*        </div>*/}
              {/*      ) : (*/}
              {/*        ""*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="order-percentage">*/}
              {/*    <span className="order-title">*/}
              {/*      {Aggregate?.count ? Aggregate.count : 0} / {NumberOfJobs}*/}
              {/*    </span>*/}
              {/*    <span className="orders">orders</span>*/}
              {/*  </div>*/}
              {/*</div>*/}

              {/*<div className="progress-sub">*/}
              {/*  <div className="circular-progress" style={{ position: "relative" }}>*/}
              {/*    <p style={{ position: "absolute", bottom: "60px" }}>*/}
              {/*      PortableToilet*/}
              {/*    </p>*/}
              {/*    <div>*/}
              {/*      <CircleProgress*/}
              {/*        width={180}*/}
              {/*        strokeWidth={15}*/}
              {/*        fontFamily={"DM Sans"}*/}
              {/*        fontSize={"20px"}*/}
              {/*        fontColor={"#5a9df9"}*/}
              {/*        fontWeight={"700"}*/}
              {/*        secondaryColor={"#F7F7F7"}*/}
              {/*        hidePercentageText={showValue ? true : false}*/}
              {/*        percentage={*/}
              {/*          PortableToilet*/}
              {/*            ? PortableToilet?.count*/}
              {/*              ? ((PortableToilet.count / NumberOfJobs) * 100).toFixed(0)*/}
              {/*              : 0*/}
              {/*            : 0*/}
              {/*        }*/}
              {/*        primaryColor={["#73C6F9", "#5391F9"]}*/}
              {/*      />*/}
              {/*      {showValue ? (*/}
              {/*        <div className="circle-text" style={{}}>*/}
              {/*          {PortableToilet?.total*/}
              {/*            ? "£" + parseInt(PortableToilet.total).toLocaleString()*/}
              {/*            : "£" + 0}*/}
              {/*        </div>*/}
              {/*      ) : (*/}
              {/*        ""*/}
              {/*      )}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*  <div className="order-percentage">*/}
              {/*    <span className="order-title">*/}
              {/*      {PortableToilet?.count ? PortableToilet.count : 0} /{" "}*/}
              {/*      {NumberOfJobs}*/}
              {/*    </span>*/}
              {/*    <span className="orders">orders</span>*/}
              {/*  </div>*/}
              {/*</div>*/}
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default DashboardServices;
