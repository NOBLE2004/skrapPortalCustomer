import { Card, CardContent, Grid } from "@mui/material";
import { Chart } from "react-chartjs-2";
import { PieChartDefaultOptions } from "../../../utlils/chart";
import { servicesReport } from "../../../utlils/constants";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getHireBreakdown } from "../../../../store/actions/action.hireBd";
import { getSiteBreakdown } from "../../../../store/actions/action.siteBd";
import React, { useEffect, useState, createRef } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FinanceReport = (props) => {
  const [chartData, setChartData] = useState();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const dispatch = useDispatch();
  const ref = createRef();
  const state = useSelector((state) => state?.hireBreakdown);
  const stateSites = useSelector((state) => state?.siteBreakdown);
  const { sites } = props;
  const [show, setShow] = useState(false);
  useEffect(() => {
    setChartData({
      series: [
        {
          title: '',
          type: 'pie',
          data: stateSites?.site_breakdown?.result?.data,
        },
      ],
    });
  }, [stateSites?.site_breakdown]);

  useEffect(() => {
    async function fetchData() {
      if (!state?.hire_breakdown?.result) {
        await dispatch(getHireBreakdown());
      }
      if (!stateSites?.site_breakdown?.result?.data) {
        await dispatch(getSiteBreakdown());
      }
    }
    fetchData();
  }, []);

  return (
    <Card className="report-chart-card main-for-carusal">
      <CardContent>
        <div className="salesWp">
          <h1>
            £10,270.00 <span>Total spent</span>
          </h1>
          <div className="sub-heading">Site breakdown</div>

          {/*<Grid container className="small-chart-large" paddingBottom={2}>*/}
          {/*  <Grid item xs={8} className="d-flex align-center">*/}
              <div>
                {(stateSites?.site_breakdown &&
                    stateSites?.site_breakdown?.result?.data) &&
                //     (<Chart
                //   type="pie"
                //   data={chartData}
                //   options={PieChartDefaultOptions}
                // />
                    (<HighchartsReact
                        highcharts={Highcharts}
                        options={chartData}
                    />
                  )}
              </div>
            {/*</Grid>*/}
            {/*<Grid*/}
            {/*  item*/}
            {/*  xs={4}*/}
            {/*  className="right-legends-small-chart"*/}
            {/*  style={{*/}
            {/*    height: "220px",*/}
            {/*    overflow: "auto",*/}
            {/*  }}*/}
            {/*>*/}
              {/*{stateSites?.site_breakdown?.result?.data?.map((single) => (*/}
              {/*  <div className="legend-one" key={single?.value}>*/}
              {/*    <div className="icon">*/}
              {/*      <span*/}
              {/*        style={{*/}
              {/*          backgroundColor: "#102751",*/}
              {/*        }}*/}
              {/*      ></span>*/}
              {/*    </div>*/}
              {/*    <div className="text-small">*/}
              {/*      <h1>*/}
              {/*        {single?.job_address} {single?.jobs}*/}
              {/*      </h1>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*))}*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}

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

              <div className="more-drop">
                <div className="sub-heading">Hire breakdown</div>

                <div className="services"></div>
              </div>
              <Grid container spacing={1} marginTop={1} alignItems="center">
                <Grid
                  item
                  lg={0.5}
                  md={0.5}
                  sm={0.5}
                  xs={0.5}
                  onClick={() => {
                    ref?.current?.previous();
                  }}
                >
                  <span className="span-arrows-for-carusal"> {`<`}</span>
                </Grid>
                <Grid item lg={11} md={11} sm={11} xs={11}>
                  {state?.hire_breakdown?.result?.length > 0 ? (
                    <Carousel
                      responsive={responsive}
                      ref={ref}
                      arrows={false}
                      autoPlay={false}
                      className="main-for-carusal"
                    >
                      {state?.hire_breakdown?.result?.map((service) => {
                        return (
                          <div className="service-box p-2" key={service?.id}>
                            <img
                              src={service?.url}
                              alt=""
                              style={{ height: "30px" }}
                            />
                            <div className="service-detail">
                              <div className="name">
                                {service?.service_name}
                              </div>
                              <div className="percentage">{service?.jobs}</div>
                            </div>
                          </div>
                        );
                      })}
                    </Carousel>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid
                  item
                  lg={0.5}
                  md={0.5}
                  xs={0.5}
                  sm={0.5}
                  onClick={() => {
                    ref?.current?.next();
                  }}
                >
                  <span className="span-arrows-for-carusal"> {`>`}</span>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default FinanceReport;
