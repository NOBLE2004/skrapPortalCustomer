import {Card, CardContent, Grid} from "@mui/material";
import {Chart} from "react-chartjs-2";
import {DonutChartSmallDefaultOptions} from "../../../utlils/chart";
import Timeline from "@mui/lab/Timeline";
import {servicesReport} from "../../../utlils/constants";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import KeyboardTabIcon from "../../../../assets/images/arrow.svg";
import TimelineContent from "@mui/lab/TimelineContent";
import React, {useEffect, useState} from "react";
import './index.scss';

const SiteMovementsReport = () => {
    const [show, setShow] = useState(false);

    const series3 = {
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
        <Card className="report-chart-card ">
            <CardContent>
                <div className="salesWp">
                    <h1>
                        537 <span>Total bookings</span>
                    </h1>
                    <Grid container className="small-chart-large">
                        <Grid item xs={8} className="d-flex align-center">
                            <div className="flex-3">
                                <Chart
                                    className="chart"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    type="doughnut"
                                    options={DonutChartSmallDefaultOptions}
                                    plugins={[
                                        {
                                            beforeDraw(chart) {
                                                const { width } = chart;
                                                const { height } = chart;
                                                const { ctx } = chart;
                                                ctx.restore();
                                                const fontSize = (height / 80).toFixed(2);
                                                ctx.font = `${fontSize}em DM Sans`;
                                                ctx.textBaseline = "top";
                                                const max_val = Math.max.apply(
                                                    Math,
                                                    chart.data.datasets[0].data
                                                );
                                                const text = `${max_val}%`;
                                                const textX = Math.round(
                                                    (width - ctx.measureText(text).width) / 2
                                                );
                                                const textY = height / 2.5;
                                                ctx.fillText(text, textX, textY);
                                                ctx.save();
                                            },
                                        },
                                    ]}
                                    data={series3}
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
                    {/* <Chart
                    type="doughnut"
                    options={DonutChartDefaultOptions}
                    data={series}
                    height="250"
                    width="450"
                    plugins={[
                      {
                        beforeDraw(chart) {
                          const { width } = chart;
                          const { height } = chart;
                          const { ctx } = chart;
                          ctx.restore();
                          const fontSize = (height / 80).toFixed(2);
                          ctx.font = `${fontSize}em DM Sans`;
                          ctx.textBaseline = "top";
                          const max_val = Math.max.apply(
                            Math,
                            chart.data.datasets[0].data
                          );
                          console.log(chart.getDatasetMeta(0).data[0]);
                          const text = `${max_val}%`;
                          const textX = Math.round(
                            (width - ctx.measureText(text).width) / 4
                          );
                          const textY = height / 2.5;
                          ctx.fillText(text, textX, textY);
                          ctx.save();
                        },
                      },
                    ]}
                  /> */}
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
                            <Timeline className="more-drop">
                                {servicesReport.map((service, index) => {
                                    return (
                                        <TimelineItem
                                            key={index}
                                            sx={{
                                                width: "100%",
                                            }}
                                        >
                                            <TimelineSeparator>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        height: "100%",
                                                    }}
                                                >
                                                    <TimelineConnector
                                                        sx={{
                                                            width: "8px",
                                                            backgroundColor: "#d6eafd",
                                                            borderTopLeftRadius:
                                                                index === 0 ? "8px" : "0x",
                                                            borderTopRightRadius:
                                                                index === 0 ? "8px" : "0x",
                                                        }}
                                                    />
                                                    <div className="d-flex align-center">
                                                        <img src={KeyboardTabIcon} alt="" />
                                                    </div>
                                                </div>
                                            </TimelineSeparator>

                                            <TimelineContent
                                                sx={{
                                                    padding: "12px 0px",
                                                }}
                                            >
                                                <Grid container className="small-chart">
                                                    <Grid
                                                        item
                                                        xs={6}
                                                        className="d-flex align-center"
                                                    >
                                                        <div className="flex-3">
                                                            <Chart
                                                                className="chart"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                }}
                                                                type="doughnut"
                                                                options={
                                                                    DonutChartSmallDefaultOptions
                                                                }
                                                                plugins={[
                                                                    {
                                                                        beforeDraw(chart) {
                                                                            const { width } = chart;
                                                                            const { height } = chart;
                                                                            const { ctx } = chart;
                                                                            ctx.restore();
                                                                            const fontSize = (
                                                                                height / 80
                                                                            ).toFixed(2);
                                                                            ctx.font = `${fontSize}em DM Sans`;
                                                                            ctx.textBaseline = "top";
                                                                            const max_val = Math.max.apply(
                                                                                Math,
                                                                                chart.data.datasets[0].data
                                                                            );
                                                                            const text = `${max_val}%`;
                                                                            const textX = Math.round(
                                                                                (width -
                                                                                    ctx.measureText(text)
                                                                                        .width) /
                                                                                2
                                                                            );
                                                                            const textY = height / 2.5;
                                                                            ctx.fillText(
                                                                                text,
                                                                                textX,
                                                                                textY
                                                                            );
                                                                            ctx.save();
                                                                        },
                                                                    },
                                                                ]}
                                                                data={series3}
                                                            />
                                                        </div>
                                                        <div className="title-right w-100 flex-1">
                                                            <h1>{service?.title}</h1>
                                                        </div>
                                                    </Grid>

                                                    <Grid
                                                        item
                                                        xs={6}
                                                        className="right-legends-small-chart"
                                                    >
                                                        <div className="legend-one">
                                                            <div className="icon">
                                                                <h1
                                                                    style={{
                                                                        backgroundColor: "#102751",
                                                                    }}
                                                                >
                                                                    1
                                                                </h1>
                                                            </div>
                                                            <div className="text-small">
                                                                <h1>Century House 75%</h1>
                                                            </div>
                                                        </div>
                                                        <div className="legend-one">
                                                            <div className="icon">
                                                                <h1
                                                                    style={{
                                                                        backgroundColor: "#60a0f8",
                                                                    }}
                                                                >
                                                                    2
                                                                </h1>
                                                            </div>
                                                            <div className="text-small">
                                                                <h1>Richmond Green 68%</h1>
                                                            </div>
                                                        </div>
                                                        <div className="legend-one">
                                                            <div className="icon">
                                                                <h1
                                                                    style={{
                                                                        backgroundColor: "#dfecfe",
                                                                    }}
                                                                >
                                                                    3
                                                                </h1>
                                                            </div>
                                                            <div className="text-small">
                                                                <h1>Ludlow Lodge 66%</h1>
                                                            </div>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </TimelineContent>
                                        </TimelineItem>
                                    );
                                })}
                            </Timeline>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
export default SiteMovementsReport;
