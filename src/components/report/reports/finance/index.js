import { Card, CardContent } from "@mui/material";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getSiteBreakdown } from "../../../../store/actions/action.siteBd";
import { getHireBreakdown } from "../../../../store/actions/action.hireBd";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HireBreakDown from "./hireBreakDown/hireBreakDown";
import FadeLoader from "react-spinners/FadeLoader";
import {numberWithCommas} from "../../../utlils/dashboard";

const FinanceReport = (props) => {
  const { sites, showMore, siteCurrency, date } = props;
  const [chartData, setChartData] = useState();
  const [currency, setCurrency] = useState(siteCurrency);

  const dispatch = useDispatch();
  const stateSites = useSelector((state) => state?.siteBreakdown);
  const [show, setShow] = useState(true);

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
      exporting: {
        filename: `chart-${new Date()?.toLocaleDateString()}`,
      },
    });
  }, [stateSites?.site_breakdown]);

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
    <Card className="report-chart-card" id={"finance"}>
      <CardContent>
        <div className="salesWp">
          <div className="sub-heading" style={{paddingBottom: '10px'}}>Site breakdown</div>
          {stateSites?.site_breakdown?.result?.total && (
            <h1>
              {`${currency ? currency : "£"}`}
              {stateSites?.site_breakdown?.result?.total.toLocaleString()}
              <span> Total spend</span>
            </h1>
          )}

          { stateSites?.site_breakdown?.result?.reduction > 0 && <h1>
                  <span style={{color: '#848c99', width: '50%'}}>
                    <span style={{color: 'rgb(80, 210, 38)'}}> £{numberWithCommas(stateSites?.site_breakdown?.result?.reduction?.toFixed(2))} </span>
                    reduction in cost by avoiding use of {stateSites?.site_breakdown?.result?.dumpsters} additional dumpsters.
                  </span>
          </h1>}

          {stateSites?.isLoading ? (
            <div className="d-flex justify-center align-center">
              <FadeLoader
                color={"#518ef8"}
                loading={stateSites?.isLoading}
                width={4}
              />
            </div>
          ) : (
            <div className="highchart-sites">
              {stateSites?.site_breakdown &&
                stateSites?.site_breakdown?.result?.data && (
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
