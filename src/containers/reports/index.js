import React from 'react'
import {Card, CardContent, Grid} from "@material-ui/core";
import { Masonry } from "@mui/lab";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import './report.scss'
import { PieChartDefaultOptions, DonutChartDefaultOptions, BarChartOptions } from '../../components/utlils/chart';
import Utils from "moment";
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
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: 'bar',
                label: 'Emissions produced',
                data: [90, 60, 30, 50, 30, 80, 50, 30, 80, 50, 30, 80],
                backgroundColor: '#4981F8',
                borderColor: '#73C6F9',
                borderSkipped: false,
                borderRadius: 20,
                pointRadius: 15,
                pointStyle: 'rectRounded',
                boxWidth: 100,
            },
            {
                type: 'bar',
                label: 'Predicted emissions(based on bookings)',
                data: [90, 60, 30, 50, 30, 80, 50, 30, 80, 50, 30, 80],
                backgroundColor: '#A4ADBC',
                borderColor: '#A4ADBC',
                borderSkipped: false,
                borderRadius: 20,
                pointRadius: 15,
                pointStyle: 'rectRounded',
                boxWidth: 100,
            },
            {
                type: 'line',
                label: '2021 Emissions',
                data: [100, 70, 75, 70, 60, 90, 70, 80, 90, 80, 70, 100],
                backgroundColor: '#677790',
                borderColor: '#677790',
                borderDash: [8, 5],
                tension: 0.5,
                pointRadius: 0,
                pointStyle: 'line',
                boxWidth: 100
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
                                        <Chart
                                            type="pie"
                                            options={PieChartDefaultOptions}
                                            data={series}
                                            height="300"
                                            width="500"
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
                                    <Chart
                                        type="doughnut"
                                        options={DonutChartDefaultOptions}
                                        data={series}
                                        height="200"
                                        width="400"
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
                                                    const textX = Math.round((width - ctx.measureText(text).width) / 4);
                                                    const textY = height / 2.5;
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
                                        <Chart
                                            type="pie"
                                            options={PieChartDefaultOptions}
                                            data={series}
                                            height="300"
                                            width="500"
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
                                    <h1>12.567 <span>kg of CO2e</span></h1>
                                    <Chart
                                        options={BarChartOptions}
                                        data={data}
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
