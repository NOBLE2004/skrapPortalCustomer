/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, Grid } from "@mui/material";
import DatePicker from "../../../yearPicker/yearPicker";
import Vector from "../../../../assets/images/vector.svg";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { chartOptions, data2 } from "./constant";
import FadeLoader from "react-spinners/FadeLoader";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { getReportEmissions } from "../../../../store/actions/action.reportEmission";
import { getReportSiteBreakDownEmissions } from "../../../../store/actions/action.reportEmissionSiteBreakdown";
import { getReportEmissionVehicles } from "../../../../store/actions/action.reportEmisionVehicle";
import "./index.scss";
import PayEmissionModal from "../../../modals/payEmissionModal/payEmissionModal";
import { numberWithCommas } from "../../../utlils/dashboard";
import { newChart } from "./constant";
import { getUserDataFromLocalStorage } from "../../../../services/utils";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: "100%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    backgroundColor: "#A4ADBC",
    height: "25px",
    borderRadius: 40,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 40,
    height: "25px",
    backgroundImage:
      "linear-gradient(135deg, #76CCF8 27.99%, #518EF8 68.87%, #4981F8 77.07%)",
  },
}));
const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  width: "100%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    backgroundColor: "#A4ADBC",
    height: "5px",
    borderRadius: 20,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    height: "5px",
    backgroundColor: theme.palette.mode === "light" ? "#f7f7f7" : "#f7f7f7",
  },
}));

const EmissionReport = (props) => {
  const state = useSelector((state) => state?.reportEmission);
  const userDetail = getUserDataFromLocalStorage();
  const stateSiteBreakDown = useSelector(
    (state) => state?.reportEmissionSiteBreakDown
  );
  const { sites, startDate, setStartDate, showMore, siteCurrency, dateM } = props;

  // const stateEmissionVehicle = useSelector(state => state?.reportEmissionVehicle)
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState(chartOptions(siteCurrency));
  const [isNewYear, setNewYear] = useState(false);
  //dummy states for secend graph date picker
  const [date, setDate] = useState(new Date());
  const handleDate = () => {
    console.log("date");
  };
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [max, setMax] = useState(100);
  const [emission, setEmission] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const getData = (year) => {
    if (startDate) {
      dispatch(
        getReportEmissions({
          year: year ? year : startDate.getFullYear(),
          address_id: sites.toString(),
          date: dateM
        })
      );
    }
  };

  useEffect(() => {
    if (isNewYear) {
      getData();
    }
  }, [startDate, isNewYear, dateM]);

  // useEffect(() => {
  //    if (sites !== "") {
  //     getData();
  //     dispatch(getReportSiteBreakDownEmissions({ address_id: sites?.toString() }));
  //     dispatch(getReportEmissionVehicles());
  //    }
  // }, [sites]);

  useEffect(() => {
    getData();
    dispatch(
      getReportSiteBreakDownEmissions({ address_id: sites?.toString(), date: dateM })
    );
    dispatch(getReportEmissionVehicles());
    setEmission([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }, [sites, dateM]);

  const getMonthData = (month, value) => {
    switch (month) {
      case "january":
        emission[0] = value;
        break;
      case "february":
        emission[1] = value;
        break;
      case "march":
        emission[2] = value;
        break;
      case "april":
        emission[3] = value;
        break;
      case "may":
        emission[4] = value;
        break;
      case "june":
        emission[5] = value;
        break;
      case "july":
        emission[6] = value;
        break;
      case "august":
        emission[7] = value;
        break;
      case "september":
        emission[8] = value;
        break;
      case "october":
        emission[9] = value;
        break;
      case "november":
        emission[10] = value;
        break;
      case "december":
        emission[11] = value;
        break;
      default:
        return emission;
    }
    setEmission(emission);
    return emission;
  };

  let value = [
    {
      name: "null",
      data: max
        ? [max, max, max, max, max, max, max, max, max, max, max, max]
        : [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      borderWidth: 0,
      stack: 1,
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
      color: "#F7F7F7",
      visible: true,
      tooltip: {
        pointFormat: "",
      },
    },
    {
      type: "column",
      name: "Emissions produced",
      data: emission,
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, "#73C6F9"],
          [1, "#5391F9"],
        ],
      },
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
    },
  ];

  const filterSeries = () => {
    const dummy = emission?.map((single, index) => {
      return (emission[index] = 0);
    });
    setEmission(dummy);
    emission[0] = 0;
    emission[1] = 0;
    setEmission(emission);
    state?.data?.data?.map((single) => {
      getMonthData(
        single.month?.toLowerCase(),
        parseFloat(single.Sum_Co2e.toFixed(2))
      );
    });
  };

  useEffect(() => {
    setChartData((st) => ({
      ...st,
      series: value,
    }));
  }, [emission, state?.data?.data, startDate, max]);

  useEffect(() => {
    if (state?.data?.data?.length > 0) {
      filterSeries();
      setMax(Math?.max(...emission));
    } else {
      setEmission([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setMax(0);
    }
  }, [state?.data?.data, startDate]);

  console.log("userDetail", userDetail);

  return (
    <>
      <PayEmissionModal showModal={showModal} setShowModal={setShowModal} />
      <Card className="report-chart-card" id={"emissions"}>
        <CardContent>
          <div className="salesWp column-charts-highcharts-">
            <h1>
              {state?.data?.year?.length > 0
                ? numberWithCommas(state?.data?.year[0]?.Sum_Co2e?.toFixed(2))
                : `0.00`}{" "}
              <span>kg of CO2e Cumulative Emissions</span>
            </h1>
            <div className="sub-heading">Transport Emission</div>
            {state?.isLoading ? (
              <div className="d-flex justify-center align-center">
                <FadeLoader
                  color={"#518ef8"}
                  loading={state?.isLoading}
                  width={4}
                />
              </div>
            ) : (
              <>
                <div className="filters">
                  <div className="year ">
                    <DatePicker
                      startDate={startDate}
                      setStartDate={setStartDate}
                      getData={getData}
                    />
                  </div>
                  <div className="total">
                    Total CO2:{" "}
                    <span>
                      {state?.data?.year?.length > 0
                        ? numberWithCommas(
                            state?.data?.year[0]?.Sum_Co2e?.toFixed(2)
                          )
                        : `0.00`}{" "}
                      Kg
                    </span>
                  </div>
                </div>
                {chartData && chartData?.series !== undefined && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartData}
                    ref={props.ref2}
                  />
                )}
              </>
            )}
          </div>
        </CardContent>
        {userDetail?.country_currency?.country_name == "Germany" && (
          <CardContent>
            <div className="salesWp  ">
              <div
                className="sub-heading"
                style={{
                  margin: "0px 0px 10px 0px",
                }}
              >
                Waste Emission
              </div>
              {chartData && chartData?.series !== undefined && (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={newChart()}
                  ref={props.ref2}
                />
              )}
            </div>
          </CardContent>
        )}
          {/*<CardContent>*/}
          {/*  <div className="salesWp column-charts-highcharts-">*/}
          {/*    <div className="sub-heading">Offset payments</div>*/}
          {/*    <div className="filters">*/}
          {/*      <div className="year">*/}
          {/*        <DatePicker*/}
          {/*          startDate={date}*/}
          {/*          setStartDate={setDate}*/}
          {/*          getData={handleDate}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*      <div className="total">*/}
          {/*        Total payment: <span>£0.00</span>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    {state?.isLoading ? (*/}
          {/*      <div className="d-flex justify-center align-center">*/}
          {/*        <FadeLoader*/}
          {/*          color={"#518ef8"}*/}
          {/*          loading={state?.isLoading}*/}
          {/*          width={4}*/}
          {/*        />*/}
          {/*      </div>*/}
          {/*    ) : (*/}
          {/*      <HighchartsReact*/}
          {/*        highcharts={Highcharts}*/}
          {/*        options={data2(siteCurrency)}*/}
          {/*      />*/}
          {/*    )}*/}
          {/*    <div*/}
          {/*      className="w-100 button-with-icon-bar-chart"*/}
          {/*      style={showMore ? { opacity: 0 } : { opacity: 1 }}*/}
          {/*    >*/}
          {/*      <div className="w-100">*/}
          {/*        <button*/}
          {/*          onClick={() => {*/}
          {/*            setShowModal(true);*/}
          {/*          }}*/}
          {/*        >*/}
          {/*          <img src={Vector} alt="" />*/}
          {/*          <span>Pay CO2e offset</span>*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*      <div*/}
          {/*        className="see-more"*/}
          {/*        onClick={() => {*/}
          {/*          setShow(!show);*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        See more*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    {show && (*/}
          {/*      <div className="see-more-wrap">*/}
          {/*        <div className="border-drop"></div>*/}
          {/*        <div className="more-drop">*/}
          {/*          <div className="sub-heading">Site breakdown</div>*/}

          {/*          {stateSiteBreakDown?.isLoading ? (*/}
          {/*            <div className="d-flex justify-center align-center">*/}
          {/*              <FadeLoader*/}
          {/*                color={"#518ef8"}*/}
          {/*                loading={stateSiteBreakDown?.isLoading}*/}
          {/*                width={4}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          ) : (*/}
          {/*            <div className="main-emission-break-down">*/}
          {/*              {stateSiteBreakDown?.data?.graph_data?.map(*/}
          {/*                (service, index) => {*/}
          {/*                  return (*/}
          {/*                    <div className="inner-break-down" key={index}>*/}
          {/*                      <div className="circle-main">*/}
          {/*                        <div*/}
          {/*                          className="circle"*/}
          {/*                          style={{*/}
          {/*                            width: `${*/}
          {/*                              service?.Sum_Co2e?.toFixed(1) > 100*/}
          {/*                                ? 100*/}
          {/*                                : service?.Sum_Co2e?.toFixed(1)*/}
          {/*                            }px`,*/}
          {/*                            height: `${*/}
          {/*                              service?.Sum_Co2e?.toFixed(1) > 100*/}
          {/*                                ? 100*/}
          {/*                                : service?.Sum_Co2e?.toFixed(1)*/}
          {/*                            }px`,*/}
          {/*                            background:*/}
          {/*                              index % 3 === 0*/}
          {/*                                ? "#0F2851"*/}
          {/*                                : index % 3 === 1*/}
          {/*                                ? "#4981F8"*/}
          {/*                                : "#60A0F8",*/}
          {/*                            borderRadius: "50%",*/}
          {/*                          }}*/}
          {/*                        />*/}
          {/*                      </div>*/}
          {/*                      <div className="site-name">*/}
          {/*                        <div className="site">{service.SiteName}</div>*/}
          {/*                        <div className="percentage">*/}
          {/*                          {service?.Sum_Co2e?.toFixed(1)} CO2e*/}
          {/*                        </div>*/}
          {/*                      </div>*/}
          {/*                    </div>*/}
          {/*                  );*/}
          {/*                }*/}
          {/*              )}*/}
          {/*            </div>*/}
          {/*          )}*/}
          {/*          /!*<div className="sub-heading">CO2e breakdown</div>*!/*/}
          {/*          /!*<div className="sub-heading progress-label">*!/*/}
          {/*          /!*  <p>Van</p>*!/*/}
          {/*          /!*  <p>Truck</p>*!/*/}
          {/*          /!*</div>*!/*/}
          {/*          /!*<div className="services">*!/*/}
          {/*          /!*  <div className="progress-div">*!/*/}
          {/*          /!*    <div className="progress-bar" style={{ width: "40%" }}>*!/*/}
          {/*          /!*      <label>25%</label>*!/*/}
          {/*          /!*      <BorderLinearProgress*!/*/}
          {/*          /!*        value={100}*!/*/}
          {/*          /!*        variant="determinate"*!/*/}
          {/*          /!*      />*!/*/}
          {/*          /!*    </div>*!/*/}
          {/*          /!*    <div*!/*/}
          {/*          /!*      className="progress-bar"*!/*/}
          {/*          /!*      style={{ width: "60%", position: "relative" }}*!/*/}
          {/*          /!*    >*!/*/}
          {/*          /!*      <BorderLinearProgress value={0} variant="determinate" />*!/*/}
          {/*          /!*      <label*!/*/}
          {/*          /!*        style={{*!/*/}
          {/*          /!*          right: 0,*!/*/}
          {/*          /!*          paddingRight: "2.5%",*!/*/}
          {/*          /!*        }}*!/*/}
          {/*          /!*      >*!/*/}
          {/*          /!*        60%*!/*/}
          {/*          /!*      </label>*!/*/}
          {/*          /!*    </div>*!/*/}
          {/*          /!*  </div>*!/*/}
          {/*          /!*</div>*!/*/}
          {/*          <Grid container marginTop={5}>*/}
          {/*            <BorderLinearProgress2 value={60} variant="determinate" />*/}
          {/*          </Grid>*/}
          {/*          <Grid container justifyContent="space-between">*/}
          {/*            {state?.data?.year?.map((value, index) => (*/}
          {/*              <div className="sub-heading progress-label" key={index}>*/}
          {/*                <p className="text left">*/}
          {/*                  Tank-to-well <br />*/}
          {/*                  <span> {value?.TTWCo2e?.toFixed(2)} Co2e</span>*/}
          {/*                </p>*/}
          {/*                <p className="text right">*/}
          {/*                  Well-to-tank <br />*/}
          {/*                  <span> {value?.WTTCo2e.toFixed(2)} Co2e</span>*/}
          {/*                </p>*/}
          {/*              </div>*/}
          {/*            ))}*/}
          {/*          </Grid>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</CardContent>*/}
      </Card>
    </>
  );
};
export default EmissionReport;
