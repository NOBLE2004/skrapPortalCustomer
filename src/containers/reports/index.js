import React, {useEffect, useRef, useState} from 'react'
import {Card, CardContent, Grid, Select, OutlinedInput} from "@mui/material";
import { Masonry } from "@mui/lab";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import {CircleProgress} from 'react-gradient-progress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
//import { LineProgressBar } from '@frogress/line';
import './report.scss';
import { PieChartDefaultOptions, DonutChartDefaultOptions, BarChartOptions } from '../../components/utlils/chart';
import MenuItem from "@mui/material/MenuItem";
import { styled } from '@mui/material/styles';
import {makeStyles} from "@mui/styles";
import { servicesReport, wasteReport, sitesReport } from "../../components/utlils/constants";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 5.5 + ITEM_PADDING_TOP,
            padding: '0%',
            borderRadius: '16px'
        },
    },
};
const useStyles = makeStyles((theme) => ({
    selected: {
    },
    rootMenuItem: {
        margin: '2% !important',
        padding: '2% !important',
        "&$selected": {
            background: `linear-gradient(135deg, #76CCF8 27.99%, #518EF8 68.87%, #4981F8 77.07%)`,
            borderRadius: '8px',
            color: 'white'
        }
    }
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    width:'100%',
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        backgroundColor: '#A4ADBC',
        height:'25px',
        borderRadius:40
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 40,
        height:'25px',
        backgroundImage: 'linear-gradient(135deg, #76CCF8 27.99%, #518EF8 68.87%, #4981F8 77.07%)',
    },
}));
const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    width:'100%',
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        backgroundColor: '#A4ADBC',
        height:'5px',
        borderRadius:20
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 20,
        height:'5px',
        backgroundColor: theme.palette.mode === 'light' ? '#f7f7f7' : '#f7f7f7',
    },
}));
const NewReports = () => {
    const chartEl = useRef(null);
    const [gradientBg, setGradientBg] = useState();
    const [gradientBg2, setGradientBg2] = useState();
    const [selected, setSelected] = useState([]);
    const classes = useStyles();


    const handleChange = (event) => {
        const { name, value } = event.target;
        setSelected(value);
    }
    useEffect(()=>{
        const ctx = document.getElementById('myChart').getContext('2d');
        const ctx2 = document.getElementById('myChart2').getContext('2d');
        const gradientBg = ctx.createLinearGradient(0,0,0, 350);
        const gradientBg2 = ctx2.createLinearGradient(0,0,0, 350);
        gradientBg.addColorStop(0.1, '#73C6F9');
        gradientBg.addColorStop(1, '#5391F9');

        gradientBg2.addColorStop(0.1, '#7bc761');
        gradientBg2.addColorStop(1, '#5BA842');
        setGradientBg(gradientBg);
        setGradientBg2(gradientBg2);
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
                data: [100, 70, 75, 70, 60, 90, 70, 0, 90, 80, 70, 100],
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
    const data2 = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: 'bar',
                label: 'Emissions produced',
                data: [90, 60, 30, 50, 30, 80, 50],
                backgroundColor: gradientBg2,
                borderColor: '#5391F9',
                borderSkipped: false,
                borderRadius: 20,
                pointRadius: 15,
                pointStyle: 'rectRounded',
                boxWidth: 100,
                barPercentage: 0.5
            }
        ]
    };
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    return (
        <div className="main-report">
            <div className="report-header">
                <div className="report-grid-header">
                    {/*<div className="report-header-card first">*/}
                    {/*    <div className="text">*/}
                    {/*        */}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="report-header-card first">
                        <div className="text">
                            <span>Management Reporting</span>
                        </div>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple={true}
                            value={selected}
                            displayEmpty
                            onChange={handleChange}
                            input={<OutlinedInput notched={false} notchedOutline={false} label="Name" />}
                            MenuProps={MenuProps}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>Sites</em>;
                                }

                                return selected.length > 1 ? <div className="text-sec">Viewing: Multiple sites <span>{selected.length} of {names.length} sites</span></div> : selected.join(',');
                            }}
                        >
                            {names.map((name) => (
                                <MenuItem
                                    classes={{ selected: classes.selected, root: classes.rootMenuItem }}
                                    key={name}
                                    value={name}
                                    //style={getStyles(name, personName, theme)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="report-grid-header">
                    <div className="report-header-card">
                        <div className="text">
                            <span>6</span> Sites
                        </div>
                    </div>
                    <div className="report-header-card">
                        <div className="text">
                            <span>64</span> Bookings complete
                        </div>
                    </div>
                    <div className="report-header-card">
                        <div className="text">
                            <span>5</span> Hire Types
                        </div>
                    </div>
                    <div className="report-header-card">
                        <div className="text">
                            <span>3</span> Suppliers
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
                                            <div className="sub-heading">
                                                Site breakdown
                                            </div>
                                            <Chart
                                                type="pie"
                                                options={PieChartDefaultOptions}
                                                data={series}
                                                height="300"
                                                width="500"
                                            />
                                        </div>
                                        <div className="border-drop"></div>
                                        <div className="more-drop">
                                            <div className="sub-heading">
                                                Hire breakdown
                                            </div>
                                            <div className="services">
                                                {`<`}
                                                {
                                                    servicesReport.map((service)=>{
                                                        return (
                                                            <div className="service-box p-2">
                                                                <img src={service.full_url}/>
                                                                <div className="service-detail">
                                                                    <div className="name">{service.service_name}</div>
                                                                    <div className="percentage">{service.percentage}%</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                {`>`}
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
                                        <h1>12.567 <span>kg of CO2e Cumulative Emissions</span></h1>
                                        <div className="sub-heading">
                                            Monthly breakdown
                                        </div>
                                        <div className="filters">
                                            <div className="year">
                                                {`${'<'}`} 2022 >
                                            </div>
                                            <div className="total">
                                                Total payment: <span>£313.13</span>
                                            </div>
                                        </div>
                                        <Chart
                                            type="bar"
                                            ref={chartEl}
                                            id="myChart"
                                            options={BarChartOptions}
                                            data={data}
                                        />
                                    </div>
                                </CardContent>
                                <CardContent>
                                    <div className="salesWp">
                                        <h2>Did you know?</h2>
                                        <p>By upgrading your <span>8-yard skips</span> to a <span>12 yard skips</span> you would reduce your site movements by 15% which could reduce your carbon emissions</p>
                                        <div className="sub-heading">
                                            Offset payments
                                        </div>
                                        <div className="filters">
                                            <div className="year">
                                                {`${'<'}`} 2022 >
                                            </div>
                                            <div className="total">
                                                Total payment: <span>£313.13</span>
                                            </div>
                                        </div>
                                        <Chart
                                            type="bar"
                                            ref={chartEl}
                                            id="myChart2"
                                            options={BarChartOptions}
                                            data={data2}
                                        />
                                    </div>
                                    <div className="border-drop"></div>
                                    <div className="more-drop">
                                        <div className="sub-heading">
                                            Site breakdown
                                        </div>
                                        <div className="head-text">
                                            <p><span>86</span> site journeys</p>
                                            <p><span>525.5 miles</span> equivalent to driving from <b>London</b> to <b>Berlin</b></p>
                                        </div>
                                        <div className="services">
                                            {
                                                sitesReport.map((service)=>{
                                                    return (
                                                        <div className="service-box">
                                                            <div className="circle-wrap">
                                                                <div className="circle" style={
                                                                    {width: `${service.percentage > 5 ? service.percentage*4 : service.percentage*8}px`,
                                                                        height: `${service.percentage > 5 ? service.percentage*4 : service.percentage*8}px`,
                                                                    background: service.color}
                                                                }/>
                                                            </div>
                                                            <div className="service-detail start">
                                                                <div className="name circle-name">{service.name}</div>
                                                                <div className="percentage percentage-circle">{service.percentage} CO2e</div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="sub-heading">
                                            CO2e breakdown
                                        </div>
                                        <div className="sub-heading progress-label">
                                            <p>Van</p>
                                            <p>Truck</p>
                                        </div>
                                        <div className="services">
                                            <div className="progress-div">
                                                <div className="progress-bar" style={{width: '40%'}}>
                                                    <label>25%</label>
                                                    <BorderLinearProgress
                                                        value={100}
                                                        variant="determinate"
                                                    />
                                                </div>
                                                <div className="progress-bar" style={{width: '60%',position:'relative'}}>
                                                    <BorderLinearProgress
                                                        value={0}
                                                        variant="determinate"
                                                    />
                                                    <label style={{
                                                        right:0
,paddingRight:'2.5%'                                                    }}>60%</label>

                                                </div>
                                            </div>
                                        </div>
                                        <Grid container marginTop={5}>
                                            <BorderLinearProgress2
                                                value={60}
                                                variant="determinate"
                                            />
                                        </Grid>
                                        <Grid container justifyContent='space-between'>
                                            <div className="sub-heading progress-label">
                                                <p className="text left">
                                                    Tank-to-well <br />
                                                    <span> 7.44 miles</span>
                                                </p>
                                                <p className="text right">
                                                    Well-to-tank  <br />
                                                    <span> 7.44 miles</span>
                                                </p>
                                            </div>
                                        </Grid>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="report-chart-card-outer">
                            <div className="report-card-title">
                                C02e Breakdown
                            </div>
                            <Card className="report-chart-card">
                                <CardContent>
                                    <div className="salesWp">
                                        <h1>44.57 <span>Tonnes total weight</span></h1>
                                        <div className="salesWp-inner-wrap">
                                            <div className="salesWp-sub">
                                                <div>
                                                    <CircleProgress
                                                        width={280}
                                                        strokeWidth={25}
                                                        fontFamily={'DM Sans'}
                                                        fontSize={'26px'}
                                                        fontColor={'#0F285'}
                                                        fontWeight={'700'}
                                                        secondaryColor={'#F7F7F7'}
                                                        percentage={85}
                                                        primaryColor={['#73C6F9', '#5391F9']}
                                                    />
                                                </div>
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
                                        <div className="border-drop"></div>
                                        <div className="more-drop">
                                            <div className="sub-heading">
                                                Waste breakdown
                                            </div>
                                            <div className="services wrap row">
                                                {
                                                    wasteReport.map((waste)=>{
                                                        return (
                                                            <div className="waste-box">
                                                                <div className={`waste-detail ${waste.color}`}>
                                                                    <div className="name">{waste.name}</div>
                                                                    <div className="percentage">{waste.percentage}%</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="sub-heading">
                                                Site breakdown
                                            </div>
                                            <div className="services">
                                                {
                                                    sitesReport.map((service)=>{
                                                        return (
                                                            <div className="service-box">
                                                                <div className="circle-wrap">
                                                                    <div className="circle" style={
                                                                        {width: `${service.percentage > 5 ? service.percentage*4 : service.percentage*8}px`,
                                                                            height: `${service.percentage > 5 ? service.percentage*4 : service.percentage*8}px`}
                                                                    }/>
                                                                </div>
                                                                <div className="service-detail start">
                                                                    <div className="name circle-name">{service.name}</div>
                                                                    <div className="percentage percentage-circle">{service.percentage} T</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
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
                    </Masonry>
                </div>
        </div>
    )
}

export default NewReports
