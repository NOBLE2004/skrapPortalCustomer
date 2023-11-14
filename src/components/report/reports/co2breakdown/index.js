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
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

const Co2breakdownReport = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.landfillDiversion);
  const tonnageData = useSelector((state) => state?.tonnage);
  const wasteData = useSelector((state) => state?.waste);
  const wasteOfEnergyData = useSelector((state) => state?.energy);
  const recycledData = useSelector((state) => state?.recycled);
  const [chartData, setChartData] = useState();
  const [chartDataRecycled, setChartDataRecycled] = useState();
  const { sites, showMore, date, siteCurrency } = props;
  const [show, setShow] = useState(false);
  NoDataToDisplay(Highcharts)
  // useEffect(() => {
  //    if (sites !== "") {
  //   dispatch(getLandfillDiversion(sites !== "" && { sites: [sites] }));
  //   dispatch(getTonnage(sites !== "" && { sites: [sites] }));
  //   dispatch(getWaste(sites !== "" && { sites: [sites] }));
  //   dispatch(getWasteOfEnergy(sites !== "" && { sites: [sites] }));
  //   dispatch(getRecycled(sites !== "" && { sites: [sites] }));
  //    }
  // }, [sites]);

  useEffect(() => {
    dispatch(getLandfillDiversion({ sites: sites, date, currency:siteCurrency }));
    dispatch(getTonnage({ sites: sites, date, currency:siteCurrency }));
    dispatch(getWaste({ sites: sites, date, currency:siteCurrency }));
    //dispatch(getWasteOfEnergy({ sites: sites, date, currency:siteCurrency }));
    dispatch(getRecycled({ sites: sites, date, currency:siteCurrency }));
  }, [sites, date, siteCurrency]);

  useEffect(() => {
    setChartData({
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
        pointFormat: "<b>{point.percentage:.1f}%</b>",
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
          colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc", "#0033FF", "#787878"],
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            //alignTo: 'connectors',
            format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
                '<span style="opacity: 0.6">{point.percentage:.1f}% </span>' +
                '<span style="opacity: 0.6"> ({point.y:.2f}T)</span>',
            //connectorColor: 'rgba(128,128,128,0.5)',
            distance: 20
          }
        }
      },
      series: [
        {
          title: "",
          type: "pie",
          data: wasteData?.data?.result,
        },
      ],
      exporting: {
        filename: `chart-${new Date()?.toLocaleDateString()}`,
      },
    });
  }, [wasteData?.data]);

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
          borderWidth: 0,
          colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc", "#0033FF", "#787878"],
          dataLabels: {
            enabled: true,
            //alignTo: 'connectors',
            format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
                '<span style="opacity: 0.6">{point.y:.2f}% </span>',
            //connectorColor: 'rgba(128,128,128,0.5)',
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
          {/*{state?.isLoading ||*/}
          {/*wasteOfEnergyData?.isLoading ||*/}
          {/*recycledData?.isLoading ? (*/}
          {/*  <div className="d-flex justify-center align-center">*/}
          {/*    <FadeLoader color={"#518ef8"} loading={true} width={4} />*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <div className="salesWp-inner-wrap">*/}
          {/*    <Grid*/}
          {/*        container*/}
          {/*        spacing={2}*/}
          {/*        marginTop={1}*/}
          {/*        style={{*/}
          {/*          height:*/}
          {/*              wasteData?.data?.result?.length > 10 ? "300px" : "unset",*/}
          {/*          display: 'flex',*/}
          {/*          justifyContent: 'center'*/}
          {/*        }}*/}
          {/*        className="waste-main"*/}
          {/*    >*/}
          {/*    {recycledData?.data && recycledData?.data?.result && (*/}
          {/*        <HighchartsReact*/}
          {/*            highcharts={Highcharts}*/}
          {/*            options={chartDataRecycled}*/}
          {/*            ref={props.refFinance}*/}
          {/*        />*/}
          {/*    )}*/}
          {/*    </Grid>*/}
          {/*  </div>)}*/}
            {/*  <div*/}
            {/*    className="salesWp-sub main-progress-bar-large"*/}
            {/*    style={{ position: "relative" }}*/}
            {/*  >*/}
            {/*    <div>*/}
            {/*      /!*<CircleProgress*!/*/}
            {/*      /!*  width={250}*!/*/}
            {/*      /!*  strokeWidth={20}*!/*/}
            {/*      /!*  fontFamily={"DM Sans"}*!/*/}
            {/*      /!*  fontSize={"26px"}*!/*/}
            {/*      /!*  fontColor={"#0F285"}*!/*/}
            {/*      /!*  fontWeight={"700"}*!/*/}
            {/*      /!*  secondaryColor={"#F7F7F7"}*!/*/}
            {/*      /!*  percentage={*!/*/}
            {/*      /!*    state?.data?.result?.land_fill*!/*/}
            {/*      /!*      ? state?.data?.result?.land_fill*!/*/}
            {/*      /!*      : 0*!/*/}
            {/*      /!*  }*!/*/}
            {/*      /!*  primaryColor={["#73C6F9", "#5391F9"]}*!/*/}
                  {/*/>*/}
            {/*    </div>*/}
            {/*    <div style={{ position: "absolute" }}>*/}
            {/*      <CircleProgress*/}
            {/*        width={145}*/}
            {/*        strokeWidth={4}*/}
            {/*        fontFamily={"DM Sans"}*/}
            {/*        fontSize={"26px"}*/}
            {/*        fontColor={"#0F285"}*/}
            {/*        fontWeight={"700"}*/}
            {/*        secondaryColor={"#fff"}*/}
            {/*        hidePercentageText*/}
            {/*        percentage={state?.data?.result?.land_fill}*/}
            {/*        primaryColor={["#50D226", "#000000"]}*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div className="text-in-progressbar">*/}
            {/*      <span>*/}
            {/*        {state?.data?.result?.title*/}
            {/*          ? state?.data?.result?.title*/}
            {/*          : "Diverted from landfill"}*/}
            {/*      </span>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div className="salesWp-sub" style={{ alignItems: "center"}}>*/}
            {/*    <div className="guage-with-text">*/}
            {/*      <div className="salesWp-sub2" style={{ alignItems: "center" }}>*/}
            {/*      <CircleProgress*/}
            {/*        width={100}*/}
            {/*        strokeWidth={10}*/}
            {/*        fontFamily={"DM Sans"}*/}
            {/*        fontSize={"14px"}*/}
            {/*        fontColor={"#0F285"}*/}
            {/*        fontWeight={700}*/}
            {/*        secondaryColor={"#F7F7F7"}*/}
            {/*        percentage={*/}
            {/*          recycledData?.data?.result?.recycled*/}
            {/*        }*/}
            {/*        primaryColor={["#50D226", "#50D226"]}*/}
            {/*      />*/}
            {/*      <div className="text">*/}
            {/*        <h1>*/}
            {/*          {"Recycled"}*/}
            {/*        </h1>*/}
            {/*      </div>*/}
            {/*      </div>*/}
            {/*      <div className="salesWp-sub2" style={{ alignItems: "center" }}>*/}
            {/*      <CircleProgress*/}
            {/*          width={100}*/}
            {/*          strokeWidth={10}*/}
            {/*          fontFamily={"DM Sans"}*/}
            {/*          fontSize={"14px"}*/}
            {/*          fontColor={"#0F285"}*/}
            {/*          fontWeight={700}*/}
            {/*          secondaryColor={"#F7F7F7"}*/}
            {/*          percentage={recycledData?.data?.result?.waste_of_energy}*/}
            {/*          primaryColor={["#ec5e19", "#ec5e19"]}*/}
            {/*      />*/}
            {/*      <div className="text">*/}
            {/*        <h1>*/}
            {/*          {"Waste to energy"}*/}
            {/*        </h1>*/}
            {/*      </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="guage-with-text">*/}
            {/*      <div className="salesWp-sub2" style={{ alignItems: "center" }}>*/}
            {/*      <CircleProgress*/}
            {/*          width={100}*/}
            {/*          strokeWidth={10}*/}
            {/*          fontFamily={"DM Sans"}*/}
            {/*          fontSize={"14px"}*/}
            {/*          fontColor={"#0F285"}*/}
            {/*          fontWeight={700}*/}
            {/*          secondaryColor={"#F7F7F7"}*/}
            {/*          percentage={recycledData?.data?.result?.reuse}*/}
            {/*          primaryColor={["#0baeae", "#0baeae"]}*/}
            {/*      />*/}
            {/*      <div className="text">*/}
            {/*        <h1>*/}
            {/*          {"Reuse"}*/}
            {/*        </h1>*/}
            {/*      </div>*/}
            {/*      </div>*/}
            {/*      <div className="salesWp-sub2" style={{ alignItems: "center" }}>*/}
            {/*      <CircleProgress*/}
            {/*          width={100}*/}
            {/*          strokeWidth={10}*/}
            {/*          fontFamily={"DM Sans"}*/}
            {/*          fontSize={"14px"}*/}
            {/*          fontColor={"#0F285"}*/}
            {/*          fontWeight={700}*/}
            {/*          secondaryColor={"#F7F7F7"}*/}
            {/*          percentage={recycledData?.data?.result?.recovery}*/}
            {/*          primaryColor={["#2171df", "#2171df"]}*/}
            {/*      />*/}
            {/*      <div className="text">*/}
            {/*        <h1>*/}
            {/*          {"Recovery"}*/}
            {/*        </h1>*/}
            {/*        /!*<p>*!/*/}
            {/*        /!*  {wasteOfEnergyData?.data?.result?.kwh*!/*/}
            {/*        /!*    ? wasteOfEnergyData?.data?.result?.kwh*!/*/}
            {/*        /!*    : 0}{" "}*!/*/}
            {/*        /!*  {wasteOfEnergyData?.data?.result?.kwh_title*!/*/}
            {/*        /!*    ? wasteOfEnergyData?.data?.result?.kwh_title*!/*/}
            {/*        /!*    : "KWhr of energy"}*!/*/}
            {/*        /!*</p>*!/*/}
            {/*        /!*<label>*!/*/}
            {/*        /!*  Equivalent to {wasteOfEnergyData?.data?.result?.kwh ? (wasteOfEnergyData?.data?.result?.kwh / 0.2)?.toFixed(2) : 0 } <br />*!/*/}
            {/*        /!*  smartphone charges*!/*/}
            {/*        /!*</label>*!/*/}
            {/*      </div>*/}
            {/*      </div>*/}
            {/*      <div className="salesWp-sub2" style={{ alignItems: "center" }}>*/}
            {/*        <CircleProgress*/}
            {/*            width={100}*/}
            {/*            strokeWidth={10}*/}
            {/*            fontFamily={"DM Sans"}*/}
            {/*            fontSize={"14px"}*/}
            {/*            fontColor={"#0F285"}*/}
            {/*            fontWeight={700}*/}
            {/*            secondaryColor={"#F7F7F7"}*/}
            {/*            percentage={recycledData?.data?.result?.upcycle}*/}
            {/*            primaryColor={["#ff9205", "#f7a840"]}*/}
            {/*        />*/}
            {/*        <div className="text">*/}
            {/*          <h1>*/}
            {/*            {"UpCycle"}*/}
            {/*          </h1>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          {/* <div
            className="see-more"
            style={showMore ? { opacity: 0 } : { opacity: 1 }}
            onClick={() => {
              setShow(!show);
            }}
          >
            See more
          </div>
          {show && ( */}
          <div className="see-more-wrap">
            {/*<div className="border-drop"></div>*/}
            {tonnageData?.isLoading && wasteData?.isLoading ? (
              <div className="d-flex justify-center align-center">
                <FadeLoader
                  color={"#518ef8"}
                  loading={tonnageData?.isLoading && wasteData?.isLoading}
                  width={4}
                />
              </div>
            ) : (
              <div className="more-drop">
                {/*<div className="sub-heading" style={{paddingBottom: '10px'}}>Waste breakdown</div>*/}
                <h1>
                  {tonnageData?.data?.result?.total
                      ? numberWithCommas(tonnageData?.data?.result?.total?.toFixed(2))
                      : "0.00"}
                  &nbsp;
                  <span>
              {tonnageData?.data?.result?.title
                  ? tonnageData?.data?.result?.title
                  : "Tonnes total weight"}
            </span>
                </h1>
                <Grid
                  container
                  spacing={2}
                  marginTop={1}
                  style={{
                    height:
                      wasteData?.data?.result?.length > 10 ? "300px" : "unset",
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  className="waste-main"
                >
                  {wasteData?.data && wasteData?.data?.result && (
                      <HighchartsReact
                          highcharts={Highcharts}
                          options={chartData}
                          ref={props.refFinance}
                      />
                  )}
                  {/*{wasteData?.data?.result?.map((single, index) => {*/}
                  {/*  return (*/}
                  {/*    <Grid*/}
                  {/*      item*/}
                  {/*      md={4}*/}
                  {/*      lg={3}*/}
                  {/*      sm={4}*/}
                  {/*      xs={4}*/}
                  {/*      className="waste-box"*/}
                  {/*      key={index}*/}
                  {/*    >*/}
                  {/*      <div*/}
                  {/*        className="waste-detail "*/}
                  {/*        style={{*/}
                  {/*          color: "grey",*/}
                  {/*        }}*/}
                  {/*      >*/}
                  {/*        <div className="name">{single.name}</div>*/}
                  {/*        <div className="percentage">*/}
                  {/*          {single.waste === null ? 0 : single.waste}T*/}
                  {/*        </div>*/}
                  {/*      </div>*/}
                  {/*    </Grid>*/}
                  {/*  );*/}
                  {/*})}*/}
                </Grid>
                <div className="sub-heading">Site breakdown</div>

                <div className="main-emission-break-down-2">
                  {tonnageData?.data?.result?.data?.map((service, index) => {
                    return (
                      <div className="inner-break-down" key={index}>
                        <div className="circle-main">
                          <div
                            className="circle"
                            style={{
                              width: `${
                                service.tonnage === 0
                                  ? 10
                                  : service?.tonnage > 100
                                  ? 70
                                  : service?.tonnage + 20
                              }px`,
                              height: `${
                                service.tonnage === 0
                                  ? 10
                                  : service?.tonnage > 100
                                  ? 70
                                  : service?.tonnage + 20
                              }px`,
                              background:
                                index % 3 === 0
                                  ? "#0F2851"
                                  : index % 3 === 1
                                  ? "#4981F8"
                                  : "#60A0F8",
                              borderRadius: "50%",
                              margin: "auto",
                            }}
                          />
                        </div>
                        <div className="site-name">
                          <div className="site">
                            {service?.site_name !== null
                              ? service?.site_name
                              : service.address}
                          </div>
                          <div className="percentage">
                            {service?.tonnage?.toFixed(2)} T
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* )} */}
        </div>
      </CardContent>
    </Card>
  );
};
export default Co2breakdownReport;
