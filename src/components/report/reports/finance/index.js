import { Box, Card, CardContent, Skeleton, Stack } from "@mui/material";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getSiteBreakdown } from "../../../../store/actions/action.siteBd";
import { getHireBreakdown } from "../../../../store/actions/action.hireBd";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HireBreakDown from "./hireBreakDown/hireBreakDown";
import FadeLoader from "react-spinners/FadeLoader";
import { numberWithCommas } from "../../../utlils/dashboard";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

const FinanceReport = (props) => {
  const { sites, showMore, siteCurrency, date } = props;
  const [chartData, setChartData] = useState();
  const [currency, setCurrency] = useState(siteCurrency);

  const dispatch = useDispatch();
  const stateSites = useSelector((state) => state?.siteBreakdown);
  const [show, setShow] = useState(true);
  NoDataToDisplay(Highcharts)

  useEffect(() => {
    if (siteCurrency !== null) {
      setCurrency(siteCurrency);
    } else {
      setCurrency(localStorage.getItem("currency"));
    }
  }, [siteCurrency]);

  useEffect(() => {
    setChartData({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        style: {
          fontFamily: "DM Sans, Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
          color: "#677790",
          fontWeight: 700,
        },
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
      lang: {
        noData: "No data to display"
      },
      legend: {
        align: "right",
        size: "40%",
        verticalAlign: "middle",
        layout: "vertical",
        itemStyle: {
          width: 250,
          fontFamily: "DM Sans, Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
          textOverflow: "ellipsis",
        },
        margin: 0,
      },
      plotOptions: {
        pie: {
          borderWidth: 0,
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
          data: stateSites?.site_breakdown?.result?.data || [],
        },
      ],
      exporting: {
        filename: `chart-${new Date()?.toLocaleDateString()}`,
      },
    });
  }, [stateSites?.site_breakdown?.result?.data]);

  // useEffect(() => {
  //   async function fetchData() {
  //      if (sites !== "") {
  //       await dispatch(getSiteBreakdown(sites !=='' &&{ sites: [sites] }));
  //       await dispatch(getHireBreakdown(sites !=='' &&{ sites: [sites] }));
  //      }
  //   }
  //   fetchData();
  // }, [sites]);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getSiteBreakdown({ sites: sites, date, currency }));
      await dispatch(getHireBreakdown({ sites: sites, date, currency }));
    }
    fetchData();
  }, [sites, date, currency]);

  return (
    <Card className="report-chart-card">
      <CardContent>
        <div className="salesWp">
          <div className="sub-heading" style={{ paddingBottom: '10px' }}>Site breakdown</div>
          {stateSites?.site_breakdown?.result?.total ? (
            <h1>
              {`${currency ? currency : "£"}`}
              {stateSites?.site_breakdown?.result?.total.toLocaleString()}
              <span> Total spend</span>
            </h1>
          ) : <h1>
            {`${currency ? currency : "£"}`}0.00
            <span> Total spend</span>
          </h1>}

          {stateSites?.site_breakdown?.result?.reduction > 0 && <h1>
            <span style={{ color: '#848c99', width: '50%' }}>
              <span style={{ color: 'rgb(80, 210, 38)' }}> {`${currency ? currency : "£"}`}{numberWithCommas(stateSites?.site_breakdown?.result?.reduction?.toFixed(2))} </span>
              reduction in cost by avoiding use of {stateSites?.site_breakdown?.result?.dumpsters} additional dumpsters (Baseline {stateSites?.site_breakdown?.result?.total_dumpsters} dumpsters).
            </span>
          </h1>}

          {stateSites?.isLoading && !stateSites?.site_breakdown?.result ? (
            <div className="d-flex justify-center align-center" style={{ width: "100%" }}>
              <Box display={"flex"} justifyContent={"center"} spacing={1} p={2} sx={{ width: "100%" }} mt={1}>
                <Skeleton variant="circular" width={300} height={300} />
              </Box >
            </div>
          ) : (
            <div className="highchart-sites">
              {stateSites?.site_breakdown &&
                stateSites?.site_breakdown?.result && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartData}
                    ref={props.refFinance}
                  />
                )}
            </div>
          )}
          {/*<div*/}
          {/*  className="see-more"*/}
          {/*  onClick={() => {*/}
          {/*    setShow(!show);*/}
          {/*  }}*/}
          {/*  style={showMore ? { opacity: 0 } : { opacity: 1 }}*/}
          {/*>*/}
          {/*  See more*/}
          {/*</div>*/}

          {/*{show && (*/}
          <div className="see-more-wrap">
            <div className="border-drop"></div>

            <div className="more-drop">
              <div className="sub-heading">Hire breakdown</div>

              <div className="services"></div>
            </div>
            <HireBreakDown sites={sites} />
          </div>
          {/*)}*/}
        </div>
      </CardContent>
    </Card>
  );
};
export default FinanceReport;
