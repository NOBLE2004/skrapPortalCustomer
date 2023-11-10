import { Card, CardContent, Grid } from "@mui/material";
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

const WasteBreakDown = (props) => {
  const dispatch = useDispatch();
  const recycledData = useSelector((state) => state?.recycled);
  const [chartDataRecycled, setChartDataRecycled] = useState();
  const { sites, showMore, date, siteCurrency } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    //dispatch(getLandfillDiversion({ sites: sites, date, currency:siteCurrency }));
    // dispatch(getTonnage({ sites: sites, date, currency:siteCurrency }));
    // dispatch(getWaste({ sites: sites, date, currency:siteCurrency }));
    //dispatch(getWasteOfEnergy({ sites: sites, date, currency:siteCurrency }));
    dispatch(getRecycled({ sites: sites, date, currency:siteCurrency }));
  }, [sites, date, siteCurrency]);

  useEffect(() => {
    setChartDataRecycled({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
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
          dataLabels: {
            enabled: true,
            format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
                '<span style="opacity: 0.6">{point.y:.2f}% </span>',
            connectorColor: 'rgba(128,128,128,0.5)',
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
    <Card className="report-chart-card" id="waste_statistics">
      <CardContent>
        <div className="salesWp">
          {recycledData?.isLoading ? (
            <div className="d-flex justify-center align-center">
              <FadeLoader color={"#518ef8"} loading={true} width={4} />
            </div>
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
        </div>
      </CardContent>
    </Card>
  );
};
export default WasteBreakDown;
