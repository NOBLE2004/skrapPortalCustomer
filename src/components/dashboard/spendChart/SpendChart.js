import React, { useEffect, useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import MenuItem from "@mui/material/MenuItem";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { lineChartData, data2 } from "./constant";
import {
  spendChartOptions,
  dates,
} from "../../utlils/constants";
import "./spendchart.scss";

const SpendChart = ({ chartData, getDashBoardData, startDate, setStartDate }) => {
  const [max, setMax] = useState()
  const handleYearChange = (event) => {
    setStartDate(event)
    getDashBoardData(event.getFullYear())
  };
  let arr = [];
  useEffect(() => {
    Object.keys(chartData?.salesTotal?.Months).map(function (key, index) {
      arr.push(chartData?.salesTotal?.Months[key].total)
    });
    setMax(Math.max(...arr))

  }, [])
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
      max: max ? max :100,
      title: {
        text: null,
      },
      gridLineColor: "#ffffff",
      gridLineWidth: 0,
      labels: {
        formatter() {
          const getLabel = (value) => {
            return `£${value}`;
          };
          return getLabel(this.value);
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>£ {point.y:.1f} </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        grouping: false
        // pointPadding: 0.2,
        // groupPadding: 0.9,
      },
      series: {
        states: {
          hover: {
            enabled: false
          }
        }
      }
    },
    legend: {
      symbolRadius: 2,
      itemStyle: {
        fontFamily: "DM Sans",
        color: "#677790",
        fontWeight: 700,
      },
      enabled: false
    },
    series: [
      {
        name: 'null',
        data: max == 0 ? [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100] : [max, max, max, max, max, max, max, max, max, max, max, max],
        borderWidth: 0,
        stack: 1,
        borderSkipped: false,
        borderRadius: 6,
        pointStyle: "rectRounded",
        pointWidth: 15,
        boxWidth: "100%",
        color: "#F7F7F7"
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
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
          },
          stops: [
            [0, '#73C6F9'],
            [1, '#5391F9']
          ]
        },
        // color: "#63acf9",
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
      getDashBoardData(startDate.getFullYear())
    }
  };
  const handlePrevDate = () => {
    if (startDate != new Date()) {
      const aYearFromNow = startDate;
      let newDate = aYearFromNow?.setFullYear(aYearFromNow?.getFullYear() - 1);
      setStartDate(new Date(newDate));
      getDashBoardData(startDate.getFullYear())
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
    <Card className="graphCard">
      <CardContent>
        <div className="salesWp">
          <div className="dateWp">
            <div>
              <span className="primary-title">Spend</span>
              <div className="spend-filter-year">
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
              </div>
            </div>
          </div>
        </div>
        <Box className="spend-bar-chart">
          <HighchartsReact highcharts={Highcharts} options={spendChartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpendChart;
