import { Card, CardContent, Grid } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import { servicesReport } from "../../../utlils/constants";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import KeyboardTabIcon from "../../../../assets/images/arrow.svg";
import TimelineContent from "@mui/lab/TimelineContent";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useDispatch, useSelector } from "react-redux";
import { getSitesMovement } from "../../../../store/actions/action.siteMovements";
import FadeLoader from "react-spinners/FadeLoader";
import "./index.scss";

const SiteMovementsReport = () => {
  const [show, setShow] = useState(false);
  const [chartData, setChartData] = useState();
  const state = useSelector(state => state?.siteMovements)
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      if (!state?.data) {
        await dispatch(getSitesMovement());
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setChartData({
      chart: {
        reflow: false,
        height: 250,
        type: "pie",
        events: {
          render: function () {
            var series = this.series[0],
              seriesCenter = series?.center,
              x = seriesCenter[0] + this.plotLeft,
              y = seriesCenter[1] + this.plotTop,
              text = 100 + "%",
              fontMetrics = this.renderer.fontMetrics(16);
            if (!this.customTitle) {
              this.customTitle = this.renderer
                .text(text, null, null, true)
                .css({
                  transform: "translate(-50%)",
                  fontSize: "30px",
                  color: "#0F2851",
                  fontFamily: "DM Sans",
                  fontWeight: 700,
                })
                .add();
            }

            this.customTitle.attr({
              x,
              y: y + fontMetrics.f / 2,
            });
          },
        },
      },
      title: {
        text: null,
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      legend: {
        align: "right",
        layout: "vertical",
        verticalAlign: "middle",
        x: -100,
        y: 0,
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: 5,
        itemStyle: {
          lineHeight: "14px",
        },
      },
      plotOptions: {
        pie: {
          center: ['50%', '50%'],
          size: [210, 100],
          allowPointSelect: true,
          cursor: "pointer",
          colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc"],
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              minWidth: 300,
            },
          },
        ],
      },
      series: [
        {
          minPointSize: 10,
          innerSize: "75%",
          zMin: 0,
          data: state?.data?.result?.data,
        },
      ],
    })

  }, [state?.data])

  const smallPieData = (data) => ({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      height: 180,
      events: {
        render: function () {
          var series = this.series[0],
            seriesCenter = series.center,
            x = seriesCenter[0] + this.plotLeft,
            y = seriesCenter[1] + this.plotTop,
            text = series.total + "%",
            fontMetrics = this.renderer.fontMetrics(16);

          if (!this.customTitle) {
            this.customTitle = this.renderer
              .text(text, null, null, true)
              .css({
                transform: "translate(-50%)",
                fontSize: "26px",
                color: "#0F2851",
                fontFamily: "DM Sans",
                fontWeight: 700,
              })
              .add();
          }

          this.customTitle.attr({
            x,
            y: y + fontMetrics.f / 2,
          });
        },
      },
    },
    title: {
      text: null,
    },
    subtitle: {
      text: `${data?.title}`,
      y: 80,
      x: 10,
      style: {
        color: '#677790',
        fontFamily: 'DM Sans',
        fontWeight: 700,
        fontSize: "12px"
      }
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    legend: {
      align: "right",
      layout: "vertical",
      verticalAlign: "middle",
      x: 0,
      y: 0,
      padding: 3,
      itemMarginTop: 2,
      itemMarginBottom: 2,
      itemStyle: {
        lineHeight: "14px",
      },
    },
    plotOptions: {
      pie: {
        center: ["30%", "30%"],
        size: [150, 100],
        allowPointSelect: true,
        cursor: "pointer",
        colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc"],
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        minPointSize: 10,
        innerSize: "75%",
        zMin: 0,
        name: "countries",
        data: [
          {
            name: "Exchange 0%",
            y: 0,
          },
          {
            name: "Wait & load 0%",
            y: 0,
          },
          {
            name: "Collect 0%",
            y: 0,
          },
          {
            name: "Delivery 100%",
            y: 100,
          },
        ],
      },
    ],
  });

  return (
    <Card className="report-chart-card ">
      <CardContent>
        <div className="salesWp">
          {state?.data?.result?.total &&
            <h1>
              {state?.data?.result?.total} <span>Total bookings</span>
            </h1>
          }
          {state?.isLoading ?
            <div className="d-flex justify-center align-center">
              <FadeLoader
                color={"#29a7df"}
                loading={state?.isLoading}
                width={4}
              />
            </div>
            :
            <Grid container className="small-chart-large">
              <Grid container className="d-flex align-center">
                <div className="flex-3 high-chart-site-movement">
                  <HighchartsReact highcharts={Highcharts} options={chartData} />
                </div>
              </Grid>
            </Grid>
          }
          <div
            className="see-more"
            onClick={() => {
              setShow(!show);
            }}
          >
            See more
          </div>
          {show && (
            <div className="see-more-wrap">
              <div className="border-drop"></div>
              <Timeline className="more-drop">
                {servicesReport.map((service, index) => {
                  return (
                    <TimelineItem
                      key={index}
                      sx={{
                        width: "100%",
                      }}
                    >
                      <TimelineSeparator>
                        <div
                          style={{
                            display: "flex",
                            height: "100%",
                          }}
                        >
                          <TimelineConnector
                            sx={{
                              width: "8px",
                              backgroundColor: "#d6eafd",
                              borderTopLeftRadius: index === 0 ? "8px" : "0x",
                              borderTopRightRadius: index === 0 ? "8px" : "0x",
                            }}
                          />
                          <div className="d-flex align-center">
                            <img src={KeyboardTabIcon} alt="" />
                          </div>
                        </div>
                      </TimelineSeparator>

                      <TimelineContent
                        sx={{
                          padding: "12px 0px",
                        }}
                      >
                        <Grid container className="small-chart">
                          <Grid container className="d-flex align-center">
                            <div className="flex-3">
                              <div className="flex-3 high-chart-site-movement">
                                <HighchartsReact
                                  highcharts={Highcharts}
                                  options={smallPieData(service)}
                                />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </TimelineContent>
                    </TimelineItem>
                  );
                })}
              </Timeline>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default SiteMovementsReport;
