import React, { useEffect, useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import MenuItem from "@mui/material/MenuItem";
import { Bar } from "react-chartjs-2";
import {Box, Grid} from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { lineChartData, data2 } from "./constant";
import { spendChartOptions, dates } from "../../utlils/constants";
import "./spendchart.scss";
import { numberWithCommas } from "../../utlils/dashboard";
import FadeLoader from "react-spinners/FadeLoader";

const SpendChart = ({
  chartData,
  getDashBoardData,
  startDate,
  setStartDate,
  setLatestYear,
  loading,
}) => {
  const [max, setMax] = useState();
  const handleYearChange = (event) => {
    setStartDate(event);
    setLatestYear(event.getFullYear())
    getDashBoardData(event.getFullYear());
  };
  let arr = [];
  useEffect(() => {
    if (chartData !== null) {
      Object.keys(chartData?.salesTotal?.Months).map(function (key, index) {
        arr.push(chartData?.salesTotal?.Months[key].total);
      });
      setMax(Math.max(...arr));
    }
  }, [chartData]);

  const spendChartData = {
    chart: {
      type: "column",
      height: 300,
      style: {
        fontFamily: "DM Sans",
        color: "#677790",
        fontWeight: 700,
      },
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      gridLineColor: "transparent",
      gridTextColor: "#ffffff",
      lineColor: "transparent",
      tickColor: "transparent",
    },
    yAxis: {
      min: 0,
      max: max ? max : 100,
      title: {
        text: null,
      },
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
      labels: {
        formatter() {
          const getLabel = (value) => {
            return `${
              localStorage.getItem("currency")
                ? localStorage.getItem("currency")
                : "£"
            }${numberWithCommas(value)}`;
          };
          return getLabel(numberWithCommas(this.value));
        },
      },
    },
    tooltip: {
      formatter: function () {
        let s = `<b> ${this.x} </b>`;
        this.points.forEach((point) => {
          if (point?.series?.name !== "null") {
            s += `<br/> ${point.series.name} : ${
              localStorage.getItem("currency")
                ? localStorage.getItem("currency")
                : "£"
            } ${numberWithCommas(point.y)}`;
          }
        });
        return s;
      },
      shared: true,
    },
    // tooltip: {
    //   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //   pointFormat:
    //     '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //     `<td style="padding:0"><b>${localStorage.getItem("currency")?localStorage.getItem("currency"):'£'}  {point.y:.1f} </b></td></tr>`,
    //   footerFormat: "</table>",
    //   shared: true,
    //   useHTML: true,
    // },

    plotOptions: {
      column: {
        grouping: false,
      },
      series: {
        states: {
          hover: {
            enabled: false,
          },
        },
      },
    },
    legend: {
      symbolRadius: 2,
      itemStyle: {
        fontFamily: "DM Sans",
        color: "#677790",
        fontWeight: 700,
      },
      enabled: false,
    },
    series: [
      {
        name: "null",
        data:
          max == 0
            ? [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
            : [max, max, max, max, max, max, max, max, max, max, max, max],
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
        name: "Spend",
        data: [
          Number(chartData?.salesTotal?.Months[1].total),
          Number(chartData?.salesTotal?.Months[2].total),
          Number(chartData?.salesTotal?.Months[3].total),
          Number(chartData?.salesTotal?.Months[4].total),
          Number(chartData?.salesTotal?.Months[5].total),
          Number(chartData?.salesTotal?.Months[6].total),
          Number(chartData?.salesTotal?.Months[7].total),
          Number(chartData?.salesTotal?.Months[8].total),
          Number(chartData?.salesTotal?.Months[9].total),
          Number(chartData?.salesTotal?.Months[10].total),
          Number(chartData?.salesTotal?.Months[11].total),
          Number(chartData?.salesTotal?.Months[12].total),
        ],
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
    ],
  };

  const handleDateNext = () => {
    if (startDate.getFullYear() != new Date().getFullYear()) {
      const aYearFromNow = startDate;
      let newDate = aYearFromNow?.setFullYear(aYearFromNow?.getFullYear() + 1);
      setStartDate(new Date(newDate));
      setLatestYear(startDate.getFullYear())
      getDashBoardData(startDate.getFullYear());
    }
  };
  const handlePrevDate = () => {
    if (startDate != new Date()) {
      const aYearFromNow = startDate;
      let newDate = aYearFromNow?.setFullYear(aYearFromNow?.getFullYear() - 1);
      setStartDate(new Date(newDate));
      setLatestYear(startDate.getFullYear())
      getDashBoardData(startDate.getFullYear());
    }
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <span
        onClick={() => {
          handlePrevDate();
        }}
        style={{ padding: "0px 6px" }}
      >{`${"<"}`}</span>
      <span className="example-custom-input" onClick={onClick} ref={ref}>
        &nbsp; {value}
      </span>
      &nbsp;
      <span
        onClick={() => {
          handleDateNext();
        }}
        style={{ padding: "0px 6px" }}
      >{`${">"}`}</span>
    </>
  ));

  return (
    <div className="wrapper">
      {loading ? (
        <Box
          height={"100px"}
          display="flex"
          // my={2}
          justifyContent="center"
          alignItems="center"
        >
          <FadeLoader color={"#518ef8"} loading={loading} width={4} />
        </Box>
      ) : (
        <>
          <div className="salesWp">
            <div className="dateWp">
              <div>
                <span className="primary-title">Spend</span>
                {/*<div className="spend-filter-year">*/}
                {/*  <p>Filter by year:</p>*/}
                {/*  <div className="date-picker-main">*/}
                {/*    <DatePicker*/}
                {/*      selected={startDate}*/}
                {/*      onChange={(date) => handleYearChange(date)}*/}
                {/*      showYearPicker*/}
                {/*      dateFormat="yyyy"*/}
                {/*      yearItemNumber={15}*/}
                {/*      customInput={<ExampleCustomInput />}*/}
                {/*      maxDate={new Date()}*/}
                {/*    />*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>

          <Box className="spend-bar-chart">
            <HighchartsReact highcharts={Highcharts} options={spendChartData} />
          </Box>
        </>
      )}
    </div>
  );
};

export default SpendChart;
