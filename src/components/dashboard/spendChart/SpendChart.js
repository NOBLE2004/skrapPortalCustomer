import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Bar } from "react-chartjs-2";
import { Box } from "@material-ui/core";
import {
  spendChartOptions,
  spendChartData,
  dates,
} from "../../utlils/constants";
import "./spendchart.scss";

const SpendChart = ({ chartData , getDashBoardData , latestYear}) => {
  console.log('latest' , latestYear)
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
          chartData?.salesTotal?.Months[1].count,
          chartData?.salesTotal?.Months[2].count,
          chartData?.salesTotal?.Months[3].count,
          chartData?.salesTotal?.Months[4].count,
          chartData?.salesTotal?.Months[5].count,
          chartData?.salesTotal?.Months[6].count,
          chartData?.salesTotal?.Months[7].count,
          chartData?.salesTotal?.Months[8].count,
          chartData?.salesTotal?.Months[9].count,
          chartData?.salesTotal?.Months[10].count,
          chartData?.salesTotal?.Months[11].count,
          chartData?.salesTotal?.Months[12].count,
        ],
        label: "This year",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#52A9DD",
        borderSkipped: false,
        cornerRadius: 4,
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
            height={231}
            width={448}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpendChart;
