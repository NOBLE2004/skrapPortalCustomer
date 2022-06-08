import {Card, CardContent, Grid} from "@mui/material";
import {Chart} from "react-chartjs-2";
import {PieChartDefaultOptions} from "../../../utlils/chart";
import {servicesReport} from "../../../utlils/constants";
import React, {useState} from "react";

const FinanceReport = (props) => {
    const { sites } = props;
    const [show,setShow] = useState(false);

    const series = {
        labels: [
            "      Exchange 75% ",
            "      Wait & Load 17% ",
            "      Collect 4% ",
            "      Delivery 4% ",
        ],
        datasets: [
            {
                data: [90, 20, 10, 30],
                backgroundColor: [
                    "#0F2851",
                    "#DFECFE",
                    "#60A0F8",
                    "#4981F8",
                    "#A4ADBC",
                ],
                hoverBackgroundColor: [
                    "#0F2851",
                    "#DFECFE",
                    "#60A0F8",
                    "#4981F8",
                    "#A4ADBC",
                ],
            },
        ],
    };
    return (
        <Card className="report-chart-card">
            <CardContent>
                <div className="salesWp">
                    <h1>
                        £10,270.00 <span>Total spent</span>
                    </h1>
                    <div className="sub-heading">Site breakdown</div>

                    <Grid container className="small-chart-large">
                        <Grid item xs={8} className="d-flex align-center">
                            <div className="flex-3">
                                <Chart
                                    type="pie"
                                    options={PieChartDefaultOptions}
                                    data={series}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={4} className="right-legends-small-chart">
                            <div className="legend-one">
                                <div className="icon">
                            <span
                                style={{
                                    backgroundColor: "#102751",
                                }}
                            ></span>
                                </div>
                                <div className="text-small">
                                    <h1>Exchange 75%</h1>
                                </div>
                            </div>
                            <div className="legend-one">
                                <div className="icon">
                            <span
                                style={{
                                    backgroundColor: "#60a0f8",
                                }}
                            />
                                </div>
                                <div className="text-small">
                                    <h1>Wait & load 17%</h1>
                                </div>
                            </div>
                            <div className="legend-one">
                                <div className="icon">
                            <span
                                style={{
                                    backgroundColor: "#dfecfe",
                                }}
                            ></span>
                                </div>
                                <div className="text-small">
                                    <h1>Collect 4%</h1>
                                </div>
                            </div>
                            <div className="legend-one">
                                <div className="icon">
                            <span
                                style={{
                                    backgroundColor: "#A4ADBC",
                                }}
                            ></span>
                                </div>
                                <div className="text-small">
                                    <h1>Delivery 4%</h1>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

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
                                <div className="sub-heading">Hire breakdown</div>
                                <div className="services">
                                    {`<`}
                                    {servicesReport.map((service) => {
                                        return (
                                            <div className="service-box p-2">
                                                <img src={service.full_url} />
                                                <div className="service-detail">
                                                    <div className="name">
                                                        {service.service_name}
                                                    </div>
                                                    <div className="percentage">
                                                        {service.percentage}%
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {`>`}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
export default FinanceReport;
