import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Bar } from "react-chartjs-2";
import { Box, useTheme, colors } from "@material-ui/core";
import "./spendchart.scss";
const dates = [
  { id: 2015, value: 2015 },
  { id: 2016, value: 2016 },
  { id: 2017, value: 2017 },
  { id: 2018, value: 2018 },
  { id: 2019, value: 2019 },
  { id: 2020, value: 2020 },
  { id: 2021, value: 2021 },
];

const SpendChart = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(2021);
  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [0, 0, 0, 0, 21, 0, 0, 0, 0, 0],
        label: "This year",
      },
    ],
    labels: [
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
  };
  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
        },
      ],
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };
  return (
    <>
      <Card className="graphCard">
        <CardContent>
          <div className="salesWp">
            <div className="dateWp">
              <div>
                <span className="primary-title">Spend</span>
                <div className="spend-filter-year">
                  <p>Filter by year:</p>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className="dropdown"
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event.target.value);
                    }}
                  >
                    {(dates || []).map((date) => {
                      return (
                        <MenuItem
                          key={date.id}
                          value={date.id}
                          name={date.value}
                        >
                          {date.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>
          </div>
          <Box
            sx={{
              height: 206,
              position: "relative",
            }}
          >
            <Bar data={data} options={options} />
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default SpendChart;
