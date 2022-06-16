import { Card, CardContent } from "@mui/material";
import { CircleProgress } from "react-gradient-progress";
import { sitesReport, wasteReport } from "../../../utlils/constants";
import React, { useEffect, useState } from "react";
import './index.scss';

const Co2breakdownReport = (props) => {
    const { sites } = props;
    const [show, setShow] = useState(false);
    return (
        <Card className="report-chart-card">
            <CardContent>
                <div className="salesWp">
                    <h1>
                        44.57 <span>Tonnes total weight</span>
                    </h1>
                    <div className="salesWp-inner-wrap">
                        <div className="salesWp-sub" style={{position:'relative'}}>
                            <div>
                                <CircleProgress
                                    width={250}
                                    strokeWidth={20}
                                    fontFamily={"DM Sans"}
                                    fontSize={"26px"}
                                    fontColor={"#0F285"}
                                    fontWeight={"700"}
                                    secondaryColor={"#F7F7F7"}
                                    percentage={85}
                                    primaryColor={["#73C6F9", "#5391F9"]}
                                />
                            </div>
                            <div style={{position:'absolute'}}>
                                <CircleProgress
                                    width={145}
                                    strokeWidth={4}
                                    fontFamily={"DM Sans"}
                                    fontSize={"26px"}
                                    fontColor={"#0F285"}
                                    fontWeight={"700"}
                                    secondaryColor={"#fff"}
                                    fill="#ffffff"
                                    percentage={85}
                                    primaryColor={["#50D226","#50D226"]}
                                />
                            </div>
                        </div>
                        <div className="salesWp-sub">
                            <div className="guage-with-text">
                                <CircleProgress
                                    width={100}
                                    strokeWidth={10}
                                    fontFamily={"DM Sans"}
                                    fontSize={"14px"}
                                    fontColor={"#0F285"}
                                    fontWeight={700}
                                    secondaryColor={"#F7F7F7"}
                                    percentage={54}
                                    primaryColor={["#50D226", "#50D226"]}
                                />
                                <div className="text">
                                    <h1>Recycled</h1>
                                    <p>48.7 tonns CO2</p>
                                    <label>Equivalent to 200 trees</label>
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
                                    percentage={36}
                                    primaryColor={["#0F2851", "#0F2851"]}
                                />
                                <div className="text">
                                    <h1>Waste of energy</h1>
                                    <p>34.7 KWhr of energy</p>
                                    <label>
                                        Equivalent to 5000 <br />
                                        smartphone charges
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="see-more"
                        onClick={() => {
                            setShow(!show);
                        }}
                    >
                        See more
                    </div>
                    {show && (
                        <div className="see-more-wrap">
                            <div className="border-drop"></div>
                            <div className="more-drop">
                                <div className="sub-heading">Waste breakdown</div>
                                <div className="services wrap row">
                                    {wasteReport.map((waste) => {
                                        return (
                                            <div className="waste-box">
                                                <div
                                                    className={`waste-detail ${waste.color}`}
                                                >
                                                    <div className="name">{waste.name}</div>
                                                    <div className="percentage">
                                                        {waste.percentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="sub-heading">Site breakdown</div>
                                <div className="services">
                                    {sitesReport.map((service) => {
                                        return (
                                            <div className="service-box">
                                                <div className="circle-wrap">
                                                    <div
                                                        className="circle"
                                                        style={{
                                                            width: `${service.percentage > 5
                                                                    ? service.percentage * 4
                                                                    : service.percentage * 8
                                                                }px`,
                                                            height: `${service.percentage > 5
                                                                    ? service.percentage * 4
                                                                    : service.percentage * 8
                                                                }px`,
                                                        }}
                                                    />
                                                </div>
                                                <div className="service-detail start">
                                                    <div className="name circle-name">
                                                        {service.name}
                                                    </div>
                                                    <div className="percentage percentage-circle">
                                                        {service.percentage} T
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
export default Co2breakdownReport;
