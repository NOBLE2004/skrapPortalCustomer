import React, { useEffect, useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import MenuItem from "@mui/material/MenuItem";
import { Bar } from "react-chartjs-2";
import { Box, FormControl, Grid, Menu, Skeleton, Stack } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { lineChartData, data2 } from "./constant";
import { spendChartOptions, dates, numberFormatter } from "../../utlils/constants";
import "./spendchart.scss";
import { numberWithCommas } from "../../utlils/dashboard";
import FadeLoader from "react-spinners/FadeLoader";
import { ExpandMoreOutlined } from "@mui/icons-material";
import FilterCard from "../cardFilter";

const SpendChart = ({
  chartData,
  getDashBoardData,
  startDate,
  setStartDate,
  setLatestYear,
  loading,
}) => {
  const [max, setMax] = useState();
  const [total, setTotal] = useState(0.00)
  const handleYearChange = (event) => {
    setStartDate(event);
    setLatestYear(event.getFullYear())
    getDashBoardData(event.getFullYear());
  };

  let arr = [];
  useEffect(() => {
    if (chartData !== null) {
      let sum = 0;
      Object.keys(chartData?.salesTotal?.Months).map(function (key, index) {
        arr.push(chartData?.salesTotal?.Months[key].total);
        sum += parseFloat(chartData?.salesTotal?.Months[key].total);
      });
      setTotal(parseFloat(sum));
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
            return `${localStorage.getItem("currency")
              ? localStorage.getItem("currency")
              : "£"
              }${numberFormatter(value)}`;
          };
          return getLabel(numberFormatter(this.value));
        },
      },
    },
    tooltip: {
      formatter: function () {
        let s = `<b> ${this.x} </b>`;
        this.points.forEach((point) => {
          if (point?.series?.name !== "null") {
            s += `<br/> ${point.series.name} : ${localStorage.getItem("currency")
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
        pointWidth: 16,
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
        pointWidth: 16,
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
      <>
        <div className="salesWp">
          <div className="dateWp">
            <Box width={"100%"}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="primary-title2">Spending Breakdown</span>
                {/*<FilterCard />*/}
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <p className="" style={{ margin: 0 }}>Spent this Year:</p>
                    <p style={{ color: "#0F2851", margin: 0, fontWeight: 700, opacity: 1 }}>{localStorage.getItem("currency")}{total.toLocaleString()}</p>
                  </Box>
                </Box>
              </Box>
              <div className="spend-filter-year">
                <Box display={"flex"} alignItems="center">
                  <p>Filter by year:</p>
                  <div className="date-picker-main">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => handleYearChange(date)}
                      showYearPicker
                      dateFormat="yyyy"
                      yearItemNumber={15}
                      customInput={<ExampleCustomInput />}
                      maxDate={new Date()}
                    />
                  </div>
                </Box>
              </div>
            </Box>
          </div>
        </div>
        {loading ? (
          <Grid container justifyContent="space-between" pb={2} spacing={1} px={2} sx={{ width: "100%" }} mt={1}>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
            <Grid item xs={.5}>
              <Skeleton variant='text' sx={{ fontSize: '1rem', height: 320 }} />
            </Grid>
          </Grid >
        ) : (
          <Box className="spend-bar-chart" px={2}>
            <HighchartsReact highcharts={Highcharts} options={spendChartData} />
          </Box>
        )}
      </>

    </div>
  );
};

export default SpendChart;
