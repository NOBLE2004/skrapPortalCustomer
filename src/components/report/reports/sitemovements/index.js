import { Card, CardContent, Grid } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
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
import { getSiteMovementDetails } from "../../../../store/actions/action.siteMovementDetails";
import FadeLoader from "react-spinners/FadeLoader";
import { smallPieData, siteMovementData } from "./constant";
import "./index.scss";

const SiteMovementsReport = () => {
  const [show, setShow] = useState(false);
  const state = useSelector(state => state?.siteMovements)
  const siteDetail = useSelector(state => state?.siteMovementDetail)
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
    dispatch(getSiteMovementDetails())
  }, [])

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
                  <HighchartsReact highcharts={Highcharts} options={siteMovementData(state?.data?.result?.data, state?.data?.result?.full_total_percentage)} />
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

                <TimelineItem

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
                          borderTopLeftRadius: "8px",
                          borderTopRightRadius: "8px",
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
                              options={smallPieData('Exchange', siteDetail?.data?.result?.exchange)}
                            />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem

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
                              options={smallPieData('Wait & load', siteDetail?.data?.result?.wait_and_load)}
                            />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem

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
                              options={smallPieData('Collect', siteDetail?.data?.result?.collect)}
                            />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem
                  sx={{ width: "100%", }}>
                  <TimelineSeparator>
                    <div
                      style={{
                        display: "flex",
                        height: "100%",
                      }} >
                      <TimelineConnector
                        sx={{
                          width: "8px",
                          backgroundColor: "#d6eafd",
                          borderBottomLeftRadius: "8px",
                          borderBottomRightRadius: "8px",
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
                              options={smallPieData('Delivery', siteDetail?.data?.result?.delivery)}
                            />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default SiteMovementsReport;
