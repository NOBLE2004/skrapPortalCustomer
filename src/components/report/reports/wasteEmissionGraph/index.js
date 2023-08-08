/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardContent,
  Grid,
  Popover,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
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
import { DateRange } from "react-date-range";
import { getWasteEmssionData } from "../../../../store/actions/action.reportWasteEmssion";

const WasteEmissionGraph = (props) => {
  const dispatch = useDispatch();
  const { sites, dateM, siteCurrency } = props;
  const [type, setType] = useState("month");
  const data = useSelector((state) => state?.wasteEmission);
  const [service, setService] = useState([]);
  const userService = useSelector((state) => state?.userService);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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
      }}
    />
  ));

  const getData = () => {
    dispatch(
      getWasteEmssionData({
        sites: sites,
        date:
          endDate &&
          `${startDate?.getDate()}-${
            startDate?.getMonth() + 1
          }-${startDate?.getFullYear()},${endDate?.getDate()}-${
            endDate?.getMonth() + 1
          }-${endDate?.getFullYear()}`,
        type: type,
        service_id: service,
        currency: siteCurrency,
      })
    );
  };

  useEffect(() => {
    if (!userService?.data) {
      dispatch(getUserService({ currency: siteCurrency }));
    }
  }, [userService?.data]);

  useEffect(() => {
    getData();
  }, [sites, service, siteCurrency, endDate, type]);

  const handleChange = (e) => {
    setService(e.target.value);
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleReset = () => {
    setService([]);
    setType("month");
    setStartDate(null);
    setEndDate(null);
  };

  console.log("data", data);

  return (
    <>
      <Card className="report-chart-card">
        <CardContent>
          <div className="salesWp  ">
            <div className="filters" style={{ margin: 0 }}>
              <Grid container spacing={1} justifyContent={"space-between"}>
                <Grid item xs={12}>
                  <Typography
                    color="primary"
                    component="h4"
                    sx={{ textAlign: "end" }}
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleReset();
                      }}
                    >
                      Reset
                    </span>
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: "flex" }}>
                  <div>
                    <div className="total" style={{ marginBottom: "5px" }}>
                      <span>Type:</span>
                    </div>
                    <Select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      sx={{ borderRadius: "12px" }}
                      size="small"
                      displayEmpty
                      inputProps={{
                        "aria-label": "Without label",
                        placeholder: "testing",
                      }}
                    >
                      <MenuItem value={"month"}>Month</MenuItem>
                      <MenuItem value={"day"}>Days</MenuItem>
                    </Select>
                  </div>
                  <div style={{ marginLeft: "6px" }}>
                    <div className="total" style={{ marginBottom: "5px" }}>
                      <span>Days:</span>
                    </div>
                    <DatePicker
                      selectsRange={true}
                      startDate={startDate}
                      monthsShown={2}
                      endDate={endDate}
                      customInput={<ExampleCustomInput2 />}
                      onChange={onChange}
                    />
                  </div>
                </Grid>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <div className="total" style={{ marginBottom: "5px" }}>
                      <span>Hire Type</span>
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
                  </FormControl>
                </Grid>
              </Grid>
            </div>

            <div style={{ width: "100%", marginTop: "20px" }}>
              <HighchartsReact
                highcharts={Highcharts}
                height="300px"
                options={chartOptions(data?.data)}
                ref={props.ref2}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  {type == "month" ? (
                    <span>
                      <b>Weekly</b>
                    </span>
                  ) : (
                    <span>
                      <b>Days</b>
                    </span>
                  )}
                </Box>
                <Box>
                  <span style={{ marginRight: "10px", color: "#518ef8" }}>
                    <b>
                      Landfill Total : {(data?.data?.total?.[0]?.Landfill/1000).toLocaleString() || 0}{" "}
                      TnCo2e
                    </b>
                  </span>{" "}
                  <span style={{ color: "#50D226" }}>
                    <b>
                      Recycled Total: {(data?.data?.total?.[0]?.Recycled/1000).toLocaleString() || 0}{" "}
                      TnCo2e{" "}
                    </b>
                  </span>
                </Box>
              </Box>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default WasteEmissionGraph;
