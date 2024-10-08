/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Card,
  CardContent,
  Grid,
  Popover,
  Popper,
  Skeleton,
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
import { getDeliveriesReport } from "../../../../store/actions/actions.getDeliveriesReport";
import YearPicker from "../../../yearPicker/yearPicker";

const DeliveriesGraph = (props) => {
  const dispatch = useDispatch();
  const { sites, dateM, siteCurrency } = props;
  const [type, setType] = useState("year");
  const data = useSelector((state) => state?.deliveriesReport);
  const [service, setService] = useState([]);
  const userService = useSelector((state) => state?.userService);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [date, setDate] = useState(new Date());

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
    //sites.length == 1 ? setType('month') : setType('year');
    dispatch(
        getDeliveriesReport({
        sites: sites,
        date: (endDate &&
          `${startDate?.getDate()}-${startDate?.getMonth() + 1
          }-${startDate?.getFullYear()},${endDate?.getDate()}-${endDate?.getMonth() + 1
          }-${endDate?.getFullYear()}`),
        year: date.getFullYear(),
        currency: siteCurrency,
      })
    );
  };

  useEffect(() => {
    getData();
  }, [sites, siteCurrency, endDate, dateM]);

  return (
    <>
      <Card className="report-chart-card">
        <CardContent>
          <div className="salesWp  ">
            {dateM == null &&
              <div className="filters" style={{ margin: 0 }}>
                <Grid container spacing={1} justifyContent={"space-between"}>
                  {/*<Grid item xs={12}>*/}
                  {/*  <Typography*/}
                  {/*    color="primary"*/}
                  {/*    component="h4"*/}
                  {/*    sx={{ textAlign: "end" }}*/}
                  {/*  >*/}
                  {/*    <span*/}
                  {/*      style={{ cursor: "pointer" }}*/}
                  {/*      onClick={() => {*/}
                  {/*        handleReset();*/}
                  {/*      }}*/}
                  {/*    >*/}
                  {/*      Reset*/}
                  {/*    </span>*/}
                  {/*  </Typography>*/}
                  {/*</Grid>*/}
                  <Grid item xs={6} sx={{ display: "flex" }}>
                    <div>
                    </div>
                    <div className="year ">
                      {/*<div className="total" style={{ marginBottom: "15px" }}>*/}
                      {/*  <span>Year:</span>*/}
                      {/*</div>*/}
                      <YearPicker
                        startDate={date}
                        setStartDate={setDate}
                        getData={getData}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            }
            {data?.isLoading ?
              <Grid container justifyContent="space-between" spacing={1} px={2} sx={{ width: "90%" }} mt={1}>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
                <Grid item xs={.5}>
                  <Skeleton variant='text' sx={{ fontSize: '1rem', height: 400 }} />
                </Grid>
              </Grid >
              :

              <div style={{ width: "100%", marginTop: "20px" }}>
                <HighchartsReact
                  highcharts={Highcharts}
                  height="300px"
                  options={chartOptions(data?.data)}
                  ref={props.ref2}
                />
              </div>
            }
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default DeliveriesGraph;
