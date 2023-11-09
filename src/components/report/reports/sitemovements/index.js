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
import { numberWithCommas } from "../../../utlils/dashboard";

const SiteMovementsReport = (props) => {
  const { sites, showMore, date, siteCurrency } = props;
  const [show, setShow] = useState(false);
  const state = useSelector((state) => state?.siteMovements);
  const siteDetail = useSelector((state) => state?.siteMovementDetail);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   async function fetchData() {
  //      if (sites !== "") {
  //     await dispatch(getSitesMovement(sites !== "" && { sites: [sites] }));
  //      }
  //   }
  //   fetchData();
  // }, [sites]);

  // useEffect(() => {
  //    if (sites !== "") {
  //   dispatch(getSiteMovementDetails(sites !== "" && { sites: [sites] }));
  //    }
  // }, [sites]);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getSitesMovement({ sites: sites, date, currency:siteCurrency }));
    }
    fetchData();
    dispatch(getSiteMovementDetails({ sites: sites, date, currency:siteCurrency }));
  }, [sites, date, siteCurrency]);

  return (
    <Card className="report-chart-card " id="site_movements">
      <CardContent>
        <div className="salesWp">
          {state?.data?.result?.total ? (
              <>
                <h1>
                  {numberWithCommas(state?.data?.result?.total)}{" "}
                  <span>Total bookings</span>
                </h1>
                { state?.data?.result?.reduction > 0 && <h1>
                  <span style={{color: '#848c99', width: '50%'}}>
                    <span style={{color: 'rgb(80, 210, 38)'}}> {state?.data?.result?.reduction} % </span>
                    reduction in C02 emissions by avoiding use of {state?.data?.result?.reduced} additional dumpsters.
                    {/*in reduction which is {state?.data?.result?.reduced} dumpsters we considered baseline as {state?.data?.result?.dumpsters} dumpsters to landfill.*/}
                  </span>
                </h1>}
              </>
          ) : (
            <h1>0.00</h1>
          )}
          {state?.isLoading || siteDetail?.isLoading ? (
            <div className="d-flex justify-center align-center">
              <FadeLoader color={"#518ef8"} loading={true} width={4} />
            </div>
          ) : (
            <Grid container className="small-chart-large">
              <Grid container className="d-flex align-center">
                <div className="flex-3 high-chart-site-movement">
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={siteMovementData(
                      state?.data?.result?.data,
                      siteDetail?.data?.result.reduce((accumulator, object) => {
                        return accumulator + object.percentage;
                      }, 0)
                    )}
                  />
                </div>
              </Grid>
            </Grid>
          )}
          <div
            className="see-more"
            style={showMore ? { opacity: 0 } : { opacity: 1 }}
            onClick={() => {
              setShow(!show);
            }}
          >
            See more
          </div>
          {show && (
            <div className="see-more-wrap">
              <div className="border-drop"></div>
              {siteDetail?.isLoading ? (
                <div className="d-flex justify-center align-center">
                  <FadeLoader
                    color={"#518ef8"}
                    loading={state?.isLoading}
                    width={4}
                  />
                </div>
              ) : (
                <Timeline className="more-drop">
                  {siteDetail?.data?.result?.map((single, index) => (
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
                              borderTopLeftRadius: index === 0 ? "8px" : "0px",
                              borderTopRightRadius: index === 0 ? "8px" : "0px",
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
                                  options={smallPieData(single)}
                                />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default SiteMovementsReport;
