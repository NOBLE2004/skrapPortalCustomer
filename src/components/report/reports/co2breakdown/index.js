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

const Co2breakdownReport = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state?.landfillDiversion);
  const tonnageData = useSelector((state) => state?.tonnage);
  const wasteData = useSelector((state) => state?.waste);
  const wasteOfEnergyData = useSelector((state) => state?.energy);
  const recycledData = useSelector((state) => state?.recycled);
  const { sites, showMore } = props;
  const [show, setShow] = useState(false);
  useEffect(() => {
    dispatch(getLandfillDiversion({ sites }));
    dispatch(getTonnage({ sites }));
    dispatch(getWaste({ sites }));
    dispatch(getWasteOfEnergy({ sites }));
    dispatch(getRecycled({ sites }));
  }, [sites]);

  return (
    <Card className="report-chart-card" id="waste_statistics">
      <CardContent>
        <div className="salesWp">
          <h1>
            {tonnageData?.data?.result?.total
              ? tonnageData?.data?.result?.total?.toFixed(2)
              : "0.00"}
            &nbsp;
            <span>
              {tonnageData?.data?.result?.title
                ? tonnageData?.data?.result?.title
                : "Tonnes total weight"}
            </span>
          </h1>
          {state?.isLoading ||
          wasteOfEnergyData?.isLoading ||
          recycledData?.isLoading ? (
            <div className="d-flex justify-center align-center">
              <FadeLoader color={"#518ef8"} loading={true} width={4} />
            </div>
          ) : (
            <div className="salesWp-inner-wrap">
              <div
                className="salesWp-sub main-progress-bar-large"
                style={{ position: "relative" }}
              >
                <div>
                  <CircleProgress
                    width={250}
                    strokeWidth={20}
                    fontFamily={"DM Sans"}
                    fontSize={"26px"}
                    fontColor={"#0F285"}
                    fontWeight={"700"}
                    secondaryColor={"#F7F7F7"}
                    percentage={
                      state?.data?.result?.land_fill
                        ? state?.data?.result?.land_fill
                        : 0
                    }
                    primaryColor={["#73C6F9", "#5391F9"]}
                  />
                </div>
                <div style={{ position: "absolute" }}>
                  <CircleProgress
                    width={145}
                    strokeWidth={4}
                    fontFamily={"DM Sans"}
                    fontSize={"26px"}
                    fontColor={"#0F285"}
                    fontWeight={"700"}
                    secondaryColor={"#fff"}
                    hidePercentageText
                    percentage={state?.data?.result?.land_fill}
                    primaryColor={["#50D226", "#000000"]}
                  />
                </div>
                <div className="text-in-progressbar">
                  <span>
                    {state?.data?.result?.title
                      ? state?.data?.result?.title
                      : "Diverted from landfill"}
                  </span>
                </div>
              </div>
              <div className="salesWp-sub" style={{alignItems: 'flex-start'}}>
                <div className="guage-with-text">
                  <CircleProgress
                    width={100}
                    strokeWidth={10}
                    fontFamily={"DM Sans"}
                    fontSize={"14px"}
                    fontColor={"#0F285"}
                    fontWeight={700}
                    secondaryColor={"#F7F7F7"}
                    percentage={
                      recycledData?.data?.result?.land_fill
                        ? recycledData?.data?.result?.land_fill
                        : 0
                    }
                    primaryColor={["#50D226", "#50D226"]}
                  />
                  <div className="text">
                    <h1>
                      {recycledData?.data?.result?.title
                        ? recycledData?.data?.result?.title
                        : "Recycled"}
                    </h1>
                    <p>
                      {recycledData?.data?.result?.emco2
                        ? recycledData?.data?.result?.emco2
                        : 0}{" "}
                      {recycledData?.data?.result?.emco2_title
                        ? recycledData?.data?.result?.emco2_title
                        : "tonns CO2"}
                    </p>
                    {/*<label>Equivalent to 200 trees</label>*/}
                    <p>
                      {recycledData?.data?.result?.saved
                          ? recycledData?.data?.result?.saved
                          : 0}{" "}
                      {recycledData?.data?.result?.saved_title
                          ? recycledData?.data?.result?.saved_title
                          : "Saved to landfill"}
                    </p>
                  </div>
                </div>
                <div className="guage-with-text">
                  <CircleProgress
                    width={100}
                    strokeWidth={10}
                    fontFamily={"DM Sans"}
                    fontSize={"14px"}
                    fontColor={"#0F285"}
                    fontWeight={700}
                    secondaryColor={"#F7F7F7"}
                    percentage={wasteOfEnergyData?.data?.result?.land_fill}
                    primaryColor={["#0F2851", "#0F2851"]}
                  />
                  <div className="text">
                    <h1>
                      {wasteOfEnergyData?.data?.result?.title
                        ? wasteOfEnergyData?.data?.result?.title
                        : "Waste to energy"}
                    </h1>
                    {/*<p>*/}
                    {/*  {wasteOfEnergyData?.data?.result?.kwh*/}
                    {/*    ? wasteOfEnergyData?.data?.result?.kwh*/}
                    {/*    : 0}{" "}*/}
                    {/*  {wasteOfEnergyData?.data?.result?.kwh_title*/}
                    {/*    ? wasteOfEnergyData?.data?.result?.kwh_title*/}
                    {/*    : "KWhr of energy"}*/}
                    {/*</p>*/}
                    {/*<label>*/}
                    {/*  Equivalent to {wasteOfEnergyData?.data?.result?.kwh ? (wasteOfEnergyData?.data?.result?.kwh / 0.2)?.toFixed(2) : 0 } <br />*/}
                    {/*  smartphone charges*/}
                    {/*</label>*/}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            className="see-more"
            style={showMore ? { opacity: 0 } : { opacity: 1 }}
            onClick={() => {
              setShow(!show);
            }}
          >
            See more
          </div>
          {show && (
            <div className="see-more-wrap">
              <div className="border-drop"></div>
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
                  <div className="sub-heading">Waste breakdown</div>
                  <Grid
                    container
                    spacing={2}
                    marginTop={1}
                    style={{
                      height:
                        wasteData?.data?.result?.length > 10
                          ? "300px"
                          : "unset",
                    }}
                    className="waste-main"
                  >
                    {wasteData?.data?.result?.map((single, index) => {
                      return (
                        <Grid
                          item
                          md={4}
                          lg={3}
                          sm={4}
                          xs={4}
                          className="waste-box"
                          key={index}
                        >
                          <div
                            className="waste-detail "
                            style={{
                              color: single.waste > 50 ? "#50D226" : "grey",
                            }}
                          >
                            <div className="name">{single.name}</div>
                            <div className="percentage">
                              {single.waste === null ? 0 : single.waste}%
                            </div>
                          </div>
                        </Grid>
                      );
                    })}
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
                                    ? 100
                                    : service?.tonnage + 20
                                }px`,
                                height: `${
                                  service.tonnage === 0
                                    ? 10
                                    : service?.tonnage > 100
                                    ? 100
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
                            <div className="site">{service.address}</div>
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default Co2breakdownReport;
