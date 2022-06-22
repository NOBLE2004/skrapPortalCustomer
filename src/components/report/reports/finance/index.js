import { Card, CardContent } from "@mui/material";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getSiteBreakdown } from "../../../../store/actions/action.siteBd";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HireBreakDown from "./hireBreakDown/hireBreakDown";
import FadeLoader from "react-spinners/FadeLoader";

const FinanceReport = (props) => {
  const { sites } = props;
  const [chartData, setChartData] = useState();
  const dispatch = useDispatch();
  const stateSites = useSelector((state) => state?.siteBreakdown);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setChartData({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: null,
      },
      tooltip: {
        pointFormat: "<b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      legend: {
        align: "right",
        size: "40%",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: {
          width: 250,
          textOverflow: "ellipsis",
        },
        margin: 0,
      },
      plotOptions: {
        pie: {
          size: "100%",
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
          title: "",
          type: "pie",
          data: stateSites?.site_breakdown?.result?.data,
        },
      ],
    });
  }, [stateSites?.site_breakdown]);
  useEffect(() => {
    async function fetchData() {
      if (!stateSites?.site_breakdown?.result?.data) {
        await dispatch(getSiteBreakdown());
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      //if (!stateSites?.site_breakdown?.result?.data) {
      await dispatch(getSiteBreakdown({ sites: sites }));
      //}
    }
    fetchData();
  }, [sites]);

  return (
    <Card className="report-chart-card">
      <CardContent>
        <div className="salesWp">
          {stateSites?.site_breakdown?.result?.total && (
            <h1>
              £{stateSites?.site_breakdown?.result?.total.toLocaleString()}
              <span> Total spent</span>
            </h1>
          )}
          <div className="sub-heading">Site breakdown</div>

          {/*<Grid container className="small-chart-large" paddingBottom={2}>*/}
          {/*  <Grid item xs={8} className="d-flex align-center">*/}
          {stateSites?.isLoading ? (
            <div className="d-flex justify-center align-center">
              <FadeLoader
                color={"#29a7df"}
                loading={stateSites?.isLoading}
                width={4}
              />
            </div>
          ) : (
            <div className="highchart-sites">
              {stateSites?.site_breakdown &&
                stateSites?.site_breakdown?.result?.data && (
                  //     (<Chart
                  //   type="pie"
                  //   data={chartData}
                  //   options={PieChartDefaultOptions}
                  // />
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartData}
                  />
                )}
            </div>
          )}
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
              <HireBreakDown sites={sites} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default FinanceReport;
