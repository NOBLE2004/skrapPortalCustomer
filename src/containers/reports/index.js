import React from 'react'
import {Card, CardContent, Grid} from "@material-ui/core";
import { Masonry } from "@mui/lab";
import { Pie, Doughnut } from "react-chartjs-2";
import './report.scss'
import { PieChartDefaultOptions, DonutChartDefaultOptions } from '../../components/utlils/chart';
const NewReports = () => {
const  series = {
        labels: ['      Exchange 75% ', '      Wait & Load 17% ', '      Collect 4% ', '      Delivery 4% '],
        datasets: [
            {
                data: [300, 50, 100, 50],
                backgroundColor: ['#0F2851', '#DFECFE', '#60A0F8', '#4981F8', '#A4ADBC'],
                hoverBackgroundColor: ['#0F2851', '#DFECFE', '#60A0F8', '#4981F8', '#A4ADBC']
            }
        ]
    };
    return (
        <div className="main-report">
                <div className="report-grid">
                    <Masonry container columns={2} spacing={4}>
                    <div className="report-chart-card-outer">
                        <div className="report-card-title">
                            Finance report
                        </div>
                            <Card className="report-chart-card">
                                <CardContent>
                                    <div className="salesWp">
                                        <h1>£10,270.00 <span>Total spent</span></h1>
                                        <Pie
                                            options={PieChartDefaultOptions}
                                            data={series}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                    </div>
                    <div className="report-chart-card-outer">
                        <div className="report-card-title">
                            Site Movements
                        </div>
                        <Card className="report-chart-card">
                            <CardContent>
                                <div className="salesWp">
                                    <h1>537 <span>Total bookings</span></h1>
                                    <Doughnut
                                        options={DonutChartDefaultOptions}
                                        data={series}
                                        width={150}
                                        height={80}
                                        plugins={[
                                            {
                                                beforeDraw(chart) {
                                                    const { width } = chart;
                                                    const { height } = chart;
                                                    const { ctx } = chart;
                                                    ctx.restore();
                                                    const fontSize = (height / 80).toFixed(2);
                                                    ctx.font = `${fontSize}em DM Sans`;
                                                    ctx.textBaseline = 'top';
                                                    const text = "90%";
                                                    const textX = Math.round((width - ctx.measureText(text).width) / 2.8);
                                                    const textY = height / 2.3;
                                                    ctx.fillText(text, textX, textY);
                                                    ctx.save();
                                                },
                                            },
                                        ]}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                        <div className="report-chart-card-outer">
                            <div className="report-card-title">
                                Waste statistics
                            </div>
                            <Card className="report-chart-card">
                                <CardContent>
                                    <div className="salesWp">
                                        <h1>£10,270.00 <span>Total spent</span></h1>
                                        <Pie
                                            options={PieChartDefaultOptions}
                                            data={series}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    <div className="report-chart-card-outer">
                        <div className="report-card-title">
                            Emissions
                        </div>
                        <Card className="report-chart-card">
                            <CardContent>
                                <div className="salesWp">
                                    <h1>525.2 <span>Miles</span></h1>
                                    <Pie
                                        options={PieChartDefaultOptions}
                                        data={series}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    </Masonry>
                </div>
        </div>
    )
}

export default NewReports
