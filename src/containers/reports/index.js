import React, {useEffect, useRef, useState} from 'react'
import {Card, CardContent, Grid} from "@material-ui/core";
import { Masonry } from "@mui/lab";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import {CircleProgress} from 'react-gradient-progress'
import './report.scss'
import { PieChartDefaultOptions, DonutChartDefaultOptions, BarChartOptions } from '../../components/utlils/chart';
import Utils from "moment";
const NewReports = () => {
    const chartEl = useRef(null);
    const [gradientBg, setGradientBg] = useState();
    useEffect(()=>{
        const ctx = document.getElementById('myChart').getContext('2d');
        const gradientBg = ctx.createLinearGradient(0,0,0, 350);
        gradientBg.addColorStop(0.1, '#73C6F9');
        gradientBg.addColorStop(1, '#5391F9');
        setGradientBg(gradientBg);
    },[]);
const  series = {
        labels: ['      Exchange 75% ', '      Wait & Load 17% ', '      Collect 4% ', '      Delivery 4% '],
        datasets: [
            {
                data: [90, 20, 10, 30],
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
                backgroundColor: gradientBg,
                borderColor: '#5391F9',
                borderSkipped: false,
                borderRadius: 20,
                pointRadius: 15,
                pointStyle: 'rectRounded',
                boxWidth: 100,
                barPercentage: 0.8
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
                barPercentage: 0.8
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
            <div className="report-header">
                <div className="report-grid-header">

                </div>
                <div className="report-grid-header">
                    <div className="report-header-card">
                        <div className="text">
                            6 Sites
                        </div>
                    </div>
                    <div className="report-header-card">
                        <div className="text">
                            64 Bookings complete
                        </div>
                    </div>
                    <div className="report-header-card">
                        <div className="text">
                            5 Hire Types
                        </div>
                    </div>
                </div>
            </div>
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
                                                    const max_val = Math.max.apply(Math, chart.data.datasets[0].data);
                                                    console.log(chart.getDatasetMeta(0).data[0]);
                                                    const text = `${max_val}%`;
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
                                        <h1>44.57 <span>Tonnes total weight</span></h1>
                                        <div className="salesWp-inner-wrap">
                                            <div className="salesWp-sub">
                                                <CircleProgress
                                                    width={280}
                                                    strokeWidth={25}
                                                    fontFamily={'DM Sans'}
                                                    text={'Diverted from <br /> landfill'}
                                                    fontSize={'26px'}
                                                    fontColor={'#0F285'}
                                                    fontWeight={'700'}
                                                    secondaryColor={'#F7F7F7'}
                                                    percentage={85}
                                                    primaryColor={['#73C6F9', '#5391F9']}
                                                />
                                            </div>
                                            <div className="salesWp-sub">
                                                <div className="guage-with-text">
                                                    <CircleProgress
                                                        width={120}
                                                        strokeWidth={12}
                                                        fontFamily={'DM Sans'}
                                                        fontSize={'14px'}
                                                        fontColor={'#0F285'}
                                                        fontWeight={700}
                                                        secondaryColor={'#F7F7F7'}
                                                        percentage={54}
                                                        primaryColor={['#50D226', '#50D226']}
                                                    />
                                                    <div className="text">
                                                        <h1>Recycled</h1>
                                                        <p>48.7 tonns CO2</p>
                                                        <label>Equivalent to 200 trees</label>
                                                    </div>
                                                </div>
                                                <div className="guage-with-text">
                                                    <CircleProgress
                                                        width={120}
                                                        strokeWidth={12}
                                                        fontFamily={'DM Sans'}
                                                        fontSize={'14px'}
                                                        fontColor={'#0F285'}
                                                        fontWeight={700}
                                                        secondaryColor={'#F7F7F7'}
                                                        percentage={36}
                                                        primaryColor={['#0F2851', '#0F2851']}
                                                    />
                                                    <div className="text">
                                                        <h1>Waste of energy</h1>
                                                        <p>34.7 KWhr of energy</p>
                                                        <label>Equivalent to 5000 <br />smartphone charges</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                                        ref={chartEl}
                                        id="myChart"
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
