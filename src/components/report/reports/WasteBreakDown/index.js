import { Box, Card, CardContent, Grid, Skeleton, Stack } from "@mui/material";
import { CircleProgress } from "react-gradient-progress";
import { useDispatch, useSelector } from "react-redux";
import { getLandfillDiversion } from "../../../../store/actions/action.landfillDiversion";
import { getTonnage } from "../../../../store/actions/action.tonnage";
import { getWaste } from "../../../../store/actions/action.waste";
import { getWasteOfEnergy } from "../../../../store/actions/action.wasteOfEnergy";
import { getRecycled } from "../../../../store/actions/action.recycled";
import FadeLoader from "react-spinners/FadeLoader";
import React, { useEffect, useState } from "react";
import "./index.scss";
import { numberWithCommas } from "../../../utlils/dashboard";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";
import { getSuppRecycled } from "../../../../store/actions/action.recycledsupp";
import { chartOptions, chartOptionsWaste } from "../wasteEmissionGraph/constant";

const WasteBreakDown = (props) => {
  const dispatch = useDispatch();
  const recycledData = useSelector((state) => state?.recycled);
  const recycledSuppData = useSelector((state) => state?.recycledSupp);
  const [chartDataRecycled, setChartDataRecycled] = useState();
  const { sites, showMore, date, siteCurrency } = props;
  const [show, setShow] = useState(true);
  NoDataToDisplay(Highcharts)
  useEffect(() => {
    //dispatch(getLandfillDiversion({ sites: sites, date, currency:siteCurrency }));
    // dispatch(getTonnage({ sites: sites, date, currency:siteCurrency }));
    // dispatch(getWaste({ sites: sites, date, currency:siteCurrency }));
    //dispatch(getWasteOfEnergy({ sites: sites, date, currency:siteCurrency }));
    dispatch(getRecycled({ sites: sites, date, currency: siteCurrency }));
    if (sites.length === 1) {
      dispatch(getSuppRecycled({ sites: sites, date, currency: siteCurrency }));
    }
  }, [sites, date, siteCurrency]);

  useEffect(() => {
    setChartDataRecycled({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
        style: {
          fontFamily: "DM Sans, Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
          color: "#677790",
          fontWeight: 700,
        },
      },
      title: {
        text: null,
      },
      tooltip: {
        pointFormat: "<b>{point.y:.2f}%</b>",
      },
      accessibility: {
        announceNewData: {
          enabled: true
        },
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc"],
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
              '<span style="opacity: 0.6">{point.y:.2f}% </span>',
            // connectorColor: 'rgba(128,128,128,0.5)',
            distance: 20
          }
        }
      },
      series: [
        {
          title: "",
          type: "pie",
          data: recycledData?.data?.result,
        },
      ],
      exporting: {
        filename: `chart-${new Date()?.toLocaleDateString()}`,
      },
    });
  }, [recycledData?.data]);

  return (
    <Card className="report-chart-card">
      <CardContent>
        <div className="salesWp">
          {recycledData?.isLoading ? (
            <div className="d-flex justify-center align-center" style={{ width: "100%" }}>
              <Stack spacing={1} px={2} sx={{ width: "100%" }} mt={1}>
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                <Skeleton variant='rounded' height={20} />
                <Skeleton variant='rectangular' width={'100%'} height={200} />
                <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              </Stack>            </div>
          ) : (
            <div className="salesWp-inner-wrap">
              <Grid
                container
                spacing={2}
                marginTop={1}
                style={{
                  height: "unset",
                  display: 'flex',
                  justifyContent: 'center'
                }}
                className="waste-main"
              >
                {recycledData?.data && recycledData?.data?.result && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartDataRecycled}
                    ref={props.refFinance}
                  />
                )}
              </Grid>
            </div>)}
          {/* )} */}
          {/*{(sites.length === 1 && recycledSuppData?.data?.result?.data?.length > 1) && <div*/}
          {/*    className="see-more"*/}
          {/*    onClick={() => {*/}
          {/*      setShow(!show);*/}
          {/*    }}*/}
          {/*    style={showMore ? { opacity: 0 } : { opacity: 1 }}*/}
          {/*>*/}
          {/*  Suppliers Breakdown*/}
          {/*</div>}*/}
        </div>
      </CardContent>
      {show && <CardContent>
        <div className="salesWp">
          {recycledData?.isLoading ? (
            <div className="d-flex justify-center align-center" style={{ width: "100%" }}>
              <Box display={"flex"} justifyContent={"center"} spacing={1} p={2} sx={{ width: "100%" }} mt={1}>
                <Skeleton variant="circular" width={300} height={300} />
              </Box >
            </div>
          ) : (
            <div className="salesWp-inner-wrap">
              <div style={{ width: "100%" }}>
                {recycledSuppData?.data && recycledSuppData?.data?.result && recycledSuppData?.data?.result.data.length > 1 && (
                  <HighchartsReact
                    highcharts={Highcharts}
                    height="400px"
                    options={chartOptionsWaste(recycledSuppData?.data?.result)}
                    ref={props.ref2}
                  />
                )}
              </div>
            </div>)}
          {/* )} */}
        </div>
      </CardContent>}
    </Card>
  );
};
export default WasteBreakDown;
