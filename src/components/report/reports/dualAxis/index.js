/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, CardContent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import FadeLoader from "react-spinners/FadeLoader";
import "../../../yearPicker/yearPicker.scss";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { chartOptions } from "./constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getEfficencyList } from "../../../../store/actions/action.reportEfficenyList";
import { forwardRef } from "react";

const DualAxisGraph = (props) => {
  const dispatch = useDispatch();
  const { sites, dateM } = props;
  const [dateMonth, setDateMonth] = useState(new Date());
  const [dateWeek, setDateWeek] = useState();
  const data = useSelector((state) => state?.efficencyList);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <TextField
      size="small"
      value={value}
      onClick={onClick}
      placeholder="Select Month"
    />
  ));
  const ExampleCustomInput2 = forwardRef(({ value, onClick }, ref) => (
    <TextField
      size="small"
      value={value}
      onClick={onClick}
      placeholder="Select day"
    />
  ));

  const getData = (date) => {
    dispatch(getEfficencyList({ sites: sites, date: dateM, date_month: date }));
  };

  useEffect(() => {
    getData(dateMonth?.getMonth() + 1);
  }, [sites]);

  return (
    <>
      <Card className="report-chart-card" id={"emissions"}>
        <CardContent>
          <div className="salesWp column-charts-highcharts-">
            <div className="filters">
              <Box sx={{ display: "flex" }}>
                <div>
                  <div className="total" style={{ marginBottom: "5px" }}>
                    <span>Month:</span>{" "}
                  </div>
                  <DatePicker
                    selected={dateMonth}
                    onChange={(date) => {
                      setDateMonth(date);
                      getData(date?.getMonth() + 1);
                    }}
                    dateFormat="MM/yyyy"
                    customInput={<ExampleCustomInput />}
                    showMonthYearPicker
                  />
                </div>
                <div style={{ marginLeft: "8px" }}>
                  <div className="total" style={{ marginBottom: "5px" }}>
                    <span>Weeks:</span>
                  </div>
                  <DatePicker
                    selected={dateWeek}
                    onChange={(date) => {
                      const filterDates = `${date?.getDate()}-${
                        date?.getMonth() + 1
                      }-${date?.getFullYear()}`;
                      setDateWeek(date);
                      getData(filterDates);
                    }}
                    showMonthDropdown
                    customInput={<ExampleCustomInput2 />}
                  />
                </div>
              </Box>
            </div>
            {data?.isLoading ? (
              <div className="d-flex justify-center align-center">
                <FadeLoader
                  color={"#518ef8"}
                  loading={data?.isLoading}
                  width={4}
                />
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions(data?.data)}
                  ref={props.ref2}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default DualAxisGraph;
