import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/material";
import {
  spendChartOptions,
  dates,
} from "../../utlils/constants";
import "./spendchart.scss";

const SpendChart = ({ chartData , getDashBoardData , latestYear}) => {
  const [selectedDate, setSelectedDate] = useState(latestYear);
  const handleYearChange = (event) => {
    setSelectedDate(event.target.value);
    getDashBoardData(event.target.value)
  };
  const spendChartData = {
    datasets: [
      {
        backgroundColor: "#52A9DD",
        data: [
          chartData?.salesTotal?.Months[1].total,
          chartData?.salesTotal?.Months[2].total,
          chartData?.salesTotal?.Months[3].total,
          chartData?.salesTotal?.Months[4].total,
          chartData?.salesTotal?.Months[5].total,
          chartData?.salesTotal?.Months[6].total,
          chartData?.salesTotal?.Months[7].total,
          chartData?.salesTotal?.Months[8].total,
          chartData?.salesTotal?.Months[9].total,
          chartData?.salesTotal?.Months[10].total,
          chartData?.salesTotal?.Months[11].total,
          chartData?.salesTotal?.Months[12].total,
        ],
        label: 'This Year £',
        borderWidth: 0,
        borderRadius: 15,
        barThickness: 12,
        borderSkipped: false
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
  return (
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
                  onChange={handleYearChange}
                >
                  {dates.map((date) => {
                    return (
                      <MenuItem key={date.id} value={date.value} name={date.value}>
                        {date.value}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            </div>
          </div>
        </div>
        <Box className="spend-bar-chart">
          <Bar
            data={spendChartData}
            options={spendChartOptions}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpendChart;
