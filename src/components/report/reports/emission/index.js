import { Card, CardContent, Grid } from "@mui/material";
import DatePicker from "../../../yearPicker/yearPicker";
import Vector from "../../../../assets/images/vector.svg";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { chartOptions, data2 } from "./constant";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import { getReportEmissions } from "../../../../store/actions/action.reportEmission";
import { getReportSiteBreakDownEmissions } from "../../../../store/actions/action.reportEmissionSiteBreakdown";
import "./index.scss";
import PayEmissionModal from "../../../modals/payEmissionModal/payEmissionModal";

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
  const state = useSelector(state => state?.reportEmission)
  const stateSiteBreakDown = useSelector(state => state?.reportEmissionSiteBreakDown)
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState(chartOptions)
  const { sites } = props;
  const [showModal, setShowModal] = useState(false)
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // if (!state?.data) {
      await dispatch(getReportEmissions({ address_id: 3509 }));
      // }
    }
    fetchData();
    dispatch(getReportSiteBreakDownEmissions())
  }, [])

  let data = [null, null, null, null, null, null, null, null, null, null, null, null]
  const getMonthData = (month, value) => {
    switch (month) {
      case 'january':
        data[0] = value;
        break;
      case 'february':
        data[1] = value;
        break;
      case 'march':
        data[2] = value;
        break;
      case 'april':
        data[3] = value;
        break;
      case 'may':
        data[4] = value;
        break;
      case 'june':
        data[5] = value;
        break;
      case 'july':
        data[6] = value;
        break;
      case 'august':
        data[7] = value;
        break;
      case 'september':
        data[8] = value;
        break;
      case 'october':
        data[9] = value;
        break;
      case 'november':
        data[10] = value;
        break;
      case 'december':
        data[11] = value;
        break;
      default:
        return data
    }
    return data
  }

  let value = [
    {
      name: 'null',
      data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      borderWidth: 0,
      stack: 1,
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
      color: "#F7F7F7"
    },
  ]
  const filterSeries = () => {
    state?.data?.data?.map(single => {
      return (
        value.push(
          {
            type: "column",
            name: "Emissions produced",
            data: getMonthData(single?.month?.toLowerCase(), single?.Sum_Co2e),
            color: { linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 }, stops: [[0, '#73C6F9'], [1, '#5391F9']] },
            borderSkipped: false,
            borderRadius: 6,
            pointStyle: "rectRounded",
            pointWidth: 15,
            boxWidth: "100%",
          },
        )
      )
    })
    return value
  }

  useEffect(() => {
    setChartData(st => ({
      ...st,
      series: filterSeries()
    }))

  }, [state?.data?.data])
  console.log('filterSeries', chartData)

  return (
    <>
      <PayEmissionModal showModal={showModal} setShowModal={setShowModal} />
      <Card className="report-chart-card">
        <CardContent>
          <div className="salesWp column-charts-highcharts-">
            <h1>
              12.567 <span>kg of CO2e Cumulative Emissions</span>
            </h1>
            <div className="sub-heading">Monthly breakdown</div>
            <div className="filters">
              <div className="year ">
                <DatePicker />
              </div>
              <div className="total">
                Total payment: <span>£0.00</span>
              </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={chartData} />
          </div>
        </CardContent>
        <CardContent>
          <div className="salesWp column-charts-highcharts-">
            <h2>Did you know?</h2>
            <p>
              By upgrading your <span>8-yard skips</span> to a{" "}
              <span>12 yard skips</span> you would reduce your site movements by
              15% which could reduce your carbon emissions
            </p>
            <div className="sub-heading">Offset payments</div>
            <div className="filters">
              <div className="year">
                <DatePicker />
              </div>
              <div className="total">
                Total payment: <span>£0.00</span>
              </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={data2} />
            <div className="w-100 button-with-icon-bar-chart">
              <div className="w-100">
                <button onClick={() => {
                  setShowModal(true)
                }}>
                  <img src={Vector} alt="" />
                  <span>Pay CO2e offset</span>
                </button>
              </div>
              <div
                className="see-more"
                onClick={() => {
                  setShow(!show);
                }}
              >
                See more
              </div>
            </div>
            {show && (
              <div className="see-more-wrap">
                <div className="border-drop"></div>
                <div className="more-drop">
                  <div className="sub-heading">Site breakdown</div>
                  <div className="head-text">
                    <p>
                      <span>{stateSiteBreakDown?.data?.graph_data?.length}</span> site journeys
                    </p>
                    <p>
                      <span>525.5 miles</span> equivalent to driving from{" "}
                      <b>London</b> to <b>Berlin</b>
                    </p>
                  </div>
                  <div className="main-emission-break-down"
                  >
                    {stateSiteBreakDown?.data?.graph_data?.map((service, index) => {
                      return (
                        <div className="inner-break-down" key={index}  >
                          <div className="circle-main">
                            <div
                              className="circle"
                              style={{
                                width: `${service.Sum_Co2e.toFixed(1) > 100 ? 100 : service.Sum_Co2e.toFixed(1)
                                  }px`,
                                height: `${service.Sum_Co2e.toFixed(1) > 100 ? 100 : service.Sum_Co2e.toFixed(1)
                                  }px`,
                                background: index % 3 === 0 ? "#0F2851" : index % 3 === 1 ? '#4981F8' : '#60A0F8',
                                borderRadius: '50%',
                              }}
                            />
                          </div>
                          <div className="site-name">
                            <div className="site">{service.SiteName}</div>
                            <div className="percentage">
                              {service.Sum_Co2e.toFixed(1)} CO2e
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="sub-heading">CO2e breakdown</div>
                  <div className="sub-heading progress-label">
                    <p>Van</p>
                    <p>Truck</p>
                  </div>
                  <div className="services">
                    <div className="progress-div">
                      <div className="progress-bar" style={{ width: "40%" }}>
                        <label>25%</label>
                        <BorderLinearProgress value={100} variant="determinate" />
                      </div>
                      <div
                        className="progress-bar"
                        style={{ width: "60%", position: "relative" }}
                      >
                        <BorderLinearProgress value={0} variant="determinate" />
                        <label
                          style={{
                            right: 0,
                            paddingRight: "2.5%",
                          }}
                        >
                          60%
                        </label>
                      </div>
                    </div>
                  </div>
                  <Grid container marginTop={5}>
                    <BorderLinearProgress2 value={60} variant="determinate" />
                  </Grid>
                  <Grid container justifyContent="space-between">
                    {state?.data?.year?.map(value =>
                      <div className="sub-heading progress-label">
                        <p className="text left">
                          Tank-to-well <br />
                          <span> {value?.TTWCo2e?.toFixed(2)} Co2e</span>
                        </p>
                        <p className="text right">
                          Well-to-tank <br />
                          <span> {value?.WTTCo2e.toFixed(2)} Co2e</span>
                        </p>
                      </div>
                    )}
                  </Grid>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default EmissionReport;
