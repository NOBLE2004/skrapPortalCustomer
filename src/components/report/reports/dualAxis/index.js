/* eslint-disable react-hooks/exhaustive-deps */
import { Card, CardContent, Grid } from "@mui/material";
// import DatePicker from "../../../yearPicker/yearPicker";
import Vector from "../../../../assets/images/vector.svg";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import FadeLoader from "react-spinners/FadeLoader";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { DateRangePicker, createStaticRanges } from "react-date-range";
import { addDays, endOfDay, startOfDay } from "date-fns";

import { useDispatch, useSelector } from "react-redux";
import { getReportEmissions } from "../../../../store/actions/action.reportEmission";
import { getReportSiteBreakDownEmissions } from "../../../../store/actions/action.reportEmissionSiteBreakdown";
import { getReportEmissionVehicles } from "../../../../store/actions/action.reportEmisionVehicle";
import "./index.scss";
import PayEmissionModal from "../../../modals/payEmissionModal/payEmissionModal";
import { numberWithCommas } from "../../../utlils/dashboard";
import { newChart, chartOptions } from "./constant";
import { getUserDataFromLocalStorage } from "../../../../services/utils";
import ReactDatePicker from "react-datepicker";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: "100%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    backgroundColor: "#A4ADBC",
    height: "25px",
    borderRadius: 40,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 40,
    height: "25px",
    backgroundImage:
      "linear-gradient(135deg, #76CCF8 27.99%, #518EF8 68.87%, #4981F8 77.07%)",
  },
}));
const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  width: "100%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    backgroundColor: "#A4ADBC",
    height: "5px",
    borderRadius: 20,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 20,
    height: "5px",
    backgroundColor: theme.palette.mode === "light" ? "#f7f7f7" : "#f7f7f7",
  },
}));

const DualAxisGraph = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const states = useSelector((state) => state?.reportEmission);
  const userDetail = getUserDataFromLocalStorage();
  const stateSiteBreakDown = useSelector(
    (state) => state?.reportEmissionSiteBreakDown
  );
  const { sites, showMore, siteCurrency, dateM } = props;

  // const stateEmissionVehicle = useSelector(state => state?.reportEmissionVehicle)
  const dispatch = useDispatch();
  // const [chartData, setChartData] = useState(chartOptions(siteCurrency));
  const [isNewYear, setNewYear] = useState(false);
  //dummy states for secend graph date picker
  const [date, setDate] = useState(new Date());
  const handleDate = () => {
    console.log("date");
  };
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [max, setMax] = useState(100);
  const [emission, setEmission] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  const getData = (year) => {
    if (startDate) {
      dispatch(
        getReportEmissions({
          year: year ? year : startDate.getFullYear(),
          address_id: sites.toString(),
          date: dateM,
        })
      );
    }
  };

  useEffect(() => {
    if (isNewYear) {
      getData();
    }
  }, [startDate, isNewYear, dateM]);

  // useEffect(() => {
  //    if (sites !== "") {
  //     getData();
  //     dispatch(getReportSiteBreakDownEmissions({ address_id: sites?.toString() }));
  //     dispatch(getReportEmissionVehicles());
  //    }
  // }, [sites]);

  useEffect(() => {
    getData();
    dispatch(
      getReportSiteBreakDownEmissions({
        address_id: sites?.toString(),
        date: dateM,
      })
    );
    dispatch(getReportEmissionVehicles());
    setEmission([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  }, [sites, dateM]);

  const getMonthData = (month, value) => {
    switch (month) {
      case "january":
        emission[0] = value;
        break;
      case "february":
        emission[1] = value;
        break;
      case "march":
        emission[2] = value;
        break;
      case "april":
        emission[3] = value;
        break;
      case "may":
        emission[4] = value;
        break;
      case "june":
        emission[5] = value;
        break;
      case "july":
        emission[6] = value;
        break;
      case "august":
        emission[7] = value;
        break;
      case "september":
        emission[8] = value;
        break;
      case "october":
        emission[9] = value;
        break;
      case "november":
        emission[10] = value;
        break;
      case "december":
        emission[11] = value;
        break;
      default:
        return emission;
    }
    setEmission(emission);
    return emission;
  };

  let value = [
    {
      name: "null",
      data: max
        ? [max, max, max, max, max, max, max, max, max, max, max, max]
        : [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      borderWidth: 0,
      stack: 1,
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
      color: "#F7F7F7",
      visible: true,
      tooltip: {
        pointFormat: "",
      },
    },
    {
      type: "column",
      name: "Emissions produced",
      data: emission,
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
      pointWidth: 15,
      boxWidth: "100%",
    },
  ];

  // useEffect(() => {
  //   setChartData((st) => ({
  //     ...st,
  //     series: value,
  //   }));
  // }, [emission, state?.data?.data, startDate, max]);

  console.log("state", state);

  return (
    <>
      <PayEmissionModal showModal={showModal} setShowModal={setShowModal} />
      <Card className="report-chart-card" id={"emissions"}>
        <CardContent>
          <div className="salesWp column-charts-highcharts-">
            {/* <h1>
              {states?.data?.year?.length > 0
                ? numberWithCommas(states?.data?.year[0]?.Sum_Co2e?.toFixed(2))
                : `0.00`}{" "}
              <span>kg of CO2e Cumulative Emissions</span>
            </h1>
            <div className="sub-heading">Transport Emission</div> */}
            {states?.isLoading ? (
              <div className="d-flex justify-center align-center">
                <FadeLoader
                  color={"#518ef8"}
                  loading={states?.isLoading}
                  width={4}
                />
              </div>
            ) : (
              <>
                {/* <div className="filters">
                  <div className="year ">
                    <ReactDatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      showMonthDropdown
                    />
                    <DateRangePicker
                      onChange={(item) => {
                        console.log(item);
                        setState([item.selection]);
                      }}
                      maxDate={addDays(state[0]?.startDate, 7)}
                      showSelectionPreview={false}
                      moveRangeOnFirstSelection={false}
                      showDateDisplay={false}
                      months={1}
                      color="f6be00"
                      // date={addDays(new Date(), -20)}
                      ranges={state}
                      direction="horizontal"
                      staticRanges={createStaticRanges([
                        {
                          label: "Last 7 Days",
                          range: () => ({
                            startDate: startOfDay(addDays(new Date(), -7)),
                            endDate: endOfDay(new Date()),
                          }),
                        },
                      ])}
                      inputRanges={[]}
                    />
                  </div>
                  <div className="total">
                    Total CO2:{" "}
                    <span>
                      {state?.data?.year?.length > 0
                        ? numberWithCommas(
                            state?.data?.year[0]?.Sum_Co2e?.toFixed(2)
                          )
                        : `0.00`}{" "}
                      Kg
                    </span>
                  </div>
                </div> */}
                <div style={{ width: "100%" }}>
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions()}
                    ref={props.ref2}
                  />
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default DualAxisGraph;
