/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Card, CardContent, Grid, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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
import { getUserService } from "../../../../store/actions/action.userService";

const DualAxisGraph = (props) => {
  const dispatch = useDispatch();
  const { sites, dateM } = props;
  const [dateMonth, setDateMonth] = useState(new Date());
  const [dateWeek, setDateWeek] = useState();
  const data = useSelector((state) => state?.efficencyList);
  const [service, setService] = useState([]);
  const userService = useSelector((state) => state?.userService);

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <TextField
      size="small"
      value={value}
      fullWidth
      onClick={onClick}
      placeholder="Select Month"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "12px",
        },
        "& .MuiOutlinedInput-input": {
          borderRadius: "12px",
          background: dateMonth ? "#518ef8" : null,
          color: dateMonth && "#fff",
        },
      }}
    />
  ));
  const ExampleCustomInput2 = forwardRef(({ value, onClick }, ref) => (
    <TextField
      size="small"
      value={value}
      fullWidth
      onClick={onClick}
      placeholder="Select day"
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderRadius: "12px",
        },
        "& .MuiOutlinedInput-input": {
          borderRadius: "12px",
          background: dateWeek ? "#518ef8" : null,
          color: dateWeek && "#fff",
        },
      }}
    />
  ));

  const getData = (date) => {
    dispatch(
      getEfficencyList({
        sites: sites,
        date: dateM,
        date_month: date,
        service_id: service,
      })
    );
  };

  useEffect(() => {
    if (!userService?.data) {
      dispatch(getUserService());
    }
  }, [userService?.data]);

  useEffect(() => {
    getData(`${dateMonth?.getMonth() + 1}-${dateMonth?.getFullYear()}`);
  }, [sites, service]);

  const handleChange = (e) => {
    setService(e.target.value);
    console.log("eee", e);
  };

  return (
    <>
      <Card className="report-chart-card" id={"emissions"}>
        <CardContent>
          <div className="salesWp column-charts-highcharts-">
            <div className="filters">
              <Grid container spacing={2} justifyContent={"space-between"}>
                <Grid item xs={3}>
                  <div>
                    <div className="total" style={{ marginBottom: "5px" }}>
                      <span>Month:</span>{" "}
                    </div>
                    <DatePicker
                      selected={dateMonth}
                      onChange={(date) => {
                        setDateMonth(date);
                        getData(
                          `${date?.getMonth() + 1}-${date?.getFullYear()}`
                        );
                        setDateWeek();
                      }}
                      dateFormat="MM/yyyy"
                      customInput={<ExampleCustomInput />}
                      showMonthYearPicker
                    />
                  </div>
                </Grid>
                <Grid item xs={3}>
                  <div>
                    <div className="total" style={{ marginBottom: "5px" }}>
                      <span>Days:</span>
                    </div>
                    <DatePicker
                      selected={dateWeek}
                      onChange={(date) => {
                        const filterDates = `${date?.getDate()}-${
                          date?.getMonth() + 1
                        }-${date?.getFullYear()}`;
                        setDateWeek(date);
                        getData(filterDates);
                        setDateMonth();
                      }}
                      showMonthDropdown
                      customInput={<ExampleCustomInput2 />}
                    />
                  </div>
                </Grid>
                <Grid item xs={5}>
                  {/* <FormControl fullWidth>
                    <div className="total" style={{ marginBottom: "5px" }}>
                      <span>Service:</span>
                    </div>
                    <Select
                      value={service || []}
                      onChange={handleChange}
                      sx={{
                        borderRadius: "12px",
                      }}
                      multiple
                      size="small"
                      displayEmpty
                      inputProps={{
                        "aria-label": "Without label",
                        placeholder: "testing",
                      }}
                    >
                      {userService?.data?.result?.map((single) => (
                        <MenuItem
                          key={single?.service_id}
                          value={single?.service_id}
                        >
                          {single?.service_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl> */}
                </Grid>
              </Grid>
            </div>
            {data?.isLoading ? (
              <div
                className="d-flex justify-center align-center"
                style={{ height: "300px" }}
              >
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
