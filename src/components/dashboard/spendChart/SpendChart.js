import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Bar } from "react-chartjs-2";
import { Box } from "@material-ui/core";
import { spendChartOptions, spendChartData, dates } from "../../utlils/constants";
import "./spendchart.scss";

const SpendChart = () => {
  const [selectedDate, setSelectedDate] = useState(2021);

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
                  onChange={(event) => {
                    setSelectedDate(event.target.value);
                  }}
                >
                  {dates.map((date) => {
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
        <Box>
          <Bar data={spendChartData} options={spendChartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SpendChart;
