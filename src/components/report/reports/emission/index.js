import {Card, CardContent, Grid} from "@mui/material";
import DatePicker from "../../../yearPicker/yearPicker";
import {Chart} from "react-chartjs-2";
import {BarChartOptions} from "../../../utlils/chart";
import Vector from "../../../../assets/images/vector.svg";
import {sitesReport} from "../../../utlils/constants";
import React, {useEffect, useState} from "react";
import {styled} from "@mui/material/styles";
import LinearProgress, {linearProgressClasses} from "@mui/material/LinearProgress";
import './index.scss';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    width: "100%",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        backgroundColor: "#A4ADBC",
        height: "25px",
        borderRadius: 40,
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 40,
        height: "25px",
        backgroundImage:
            "linear-gradient(135deg, #76CCF8 27.99%, #518EF8 68.87%, #4981F8 77.07%)",
    },
}));
const BorderLinearProgress2 = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    width: "100%",
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        backgroundColor: "#A4ADBC",
        height: "5px",
        borderRadius: 20,
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 20,
        height: "5px",
        backgroundColor: theme.palette.mode === "light" ? "#f7f7f7" : "#f7f7f7",
    },
}));

const EmissionReport = (props) => {
    const { sites } = props;
    const [show,setShow] = useState(false);
    const [gradientBg, setGradientBg] = useState();
    const [gradientBg2, setGradientBg2] = useState();
    useEffect(() => {
        const ctx = document.getElementById("myChart").getContext("2d");
        const ctx2 = document.getElementById("myChart2").getContext("2d");
        const gradientBg = ctx.createLinearGradient(0, 0, 0, 350);
        const gradientBg2 = ctx2.createLinearGradient(0, 0, 0, 350);
        gradientBg.addColorStop(0.1, "#73C6F9");
        gradientBg.addColorStop(1, "#5391F9");

        gradientBg2.addColorStop(0.1, "#7bc761");
        gradientBg2.addColorStop(1, "#5BA842");
        setGradientBg(gradientBg);
        setGradientBg2(gradientBg2);
    }, []);
    const data = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                type: "bar",
                label: "Emissions produced",
                data: [90, 60, 30, 50, 30, 80, 50, 30, 80, 50, 30, 80],
                backgroundColor: gradientBg,
                borderColor: "#5391F9",
                borderSkipped: false,
                borderRadius: 20,
                pointRadius: 15,
                pointStyle: "rectRounded",
                boxWidth: 100,
                barPercentage: 0.8,
            },
            {
                type: "bar",
                label: "Predicted emissions(based on bookings)",
                data: [90, 60, 30, 50, 30, 80, 50, 30, 80, 50, 30, 80],
                backgroundColor: "#A4ADBC",
                borderColor: "#A4ADBC",
                borderSkipped: false,
                borderRadius: 20,
                pointRadius: 15,
                pointStyle: "rectRounded",
                boxWidth: 100,
                barPercentage: 0.8,
            },
            {
                type: "line",
                label: "2021 Emissions",
                data: [100, 70, 75, 70, 60, 90, 70, 0, 90, 80, 70, 100],
                backgroundColor: "#677790",
                borderColor: "#677790",
                borderDash: [8, 5],
                tension: 0.5,
                pointRadius: 0,
                pointStyle: "line",
                boxWidth: 100,
            },
        ],
    };
    const data2 = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                type: "bar",
                label: "Emissions produced",
                data: [90, 60, 30, 50, 30, 80, 50],
                backgroundColor: gradientBg2,
                borderColor: "#5391F9",
                borderSkipped: false,
                borderRadius: 20,
                pointRadius: 15,
                pointStyle: "rectRounded",
                boxWidth: 100,
                barPercentage: 0.5,
            },
        ],
    };
    return (
        <Card className="report-chart-card">
            <CardContent>
                <div className="salesWp">
                    <h1>
                        12.567 <span>kg of CO2e Cumulative Emissions</span>
                    </h1>
                    <div className="sub-heading">Monthly breakdown</div>
                    <div className="filters">
                        <div className="year ">
                            <DatePicker />
                        </div>
                        <div className="total">
                            Total payment: <span>£313.13</span>
                        </div>
                    </div>
                    <Chart
                        type="bar"
                        id="myChart"
                        options={BarChartOptions}
                        data={data}
                    />
                </div>
            </CardContent>
            <CardContent>
                <div className="salesWp">
                    <h2>Did you know?</h2>
                    <p>
                        By upgrading your <span>8-yard skips</span> to a{" "}
                        <span>12 yard skips</span> you would reduce your site
                        movements by 15% which could reduce your carbon emissions
                    </p>
                    <div className="sub-heading">Offset payments</div>
                    <div className="filters">
                        <div className="year">
                            <DatePicker />
                        </div>
                        <div className="total">
                            Total payment: <span>£313.13</span>
                        </div>
                    </div>
                    <Chart
                        type="bar"
                        id="myChart2"
                        options={BarChartOptions}
                        data={data2}
                    />
                    <div className="w-100 button-with-icon-bar-chart">
                        <div className="w-100">
                            <button>
                                <img src={Vector} alt="" />
                                <span>Pay CO2e offset</span>
                            </button>
                        </div>
                        <div
                            className="see-more"
                            onClick={() => {
                                setShow(!show);
                            }}
                        >
                            See more
                        </div>
                    </div>
                    {show && (
                        <div className="see-more-wrap">
                            <div className="border-drop"></div>
                            <div className="more-drop">
                                <div className="sub-heading">Site breakdown</div>
                                <div className="head-text">
                                    <p>
                                        <span>86</span> site journeys
                                    </p>
                                    <p>
                                        <span>525.5 miles</span> equivalent to driving
                                        from <b>London</b> to <b>Berlin</b>
                                    </p>
                                </div>
                                <div className="services">
                                    {sitesReport.map((service) => {
                                        return (
                                            <div className="service-box">
                                                <div className="circle-wrap">
                                                    <div
                                                        className="circle"
                                                        style={{
                                                            width: `${
                                                                service.percentage > 5
                                                                    ? service.percentage * 4
                                                                    : service.percentage * 8
                                                            }px`,
                                                            height: `${
                                                                service.percentage > 5
                                                                    ? service.percentage * 4
                                                                    : service.percentage * 8
                                                            }px`,
                                                            background: service.color,
                                                        }}
                                                    />
                                                </div>
                                                <div className="service-detail start">
                                                    <div className="name circle-name">
                                                        {service.name}
                                                    </div>
                                                    <div className="percentage percentage-circle">
                                                        {service.percentage} CO2e
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="sub-heading">CO2e breakdown</div>
                                <div className="sub-heading progress-label">
                                    <p>Van</p>
                                    <p>Truck</p>
                                </div>
                                <div className="services">
                                    <div className="progress-div">
                                        <div
                                            className="progress-bar"
                                            style={{ width: "40%" }}
                                        >
                                            <label>25%</label>
                                            <BorderLinearProgress
                                                value={100}
                                                variant="determinate"
                                            />
                                        </div>
                                        <div
                                            className="progress-bar"
                                            style={{ width: "60%", position: "relative" }}
                                        >
                                            <BorderLinearProgress
                                                value={0}
                                                variant="determinate"
                                            />
                                            <label
                                                style={{
                                                    right: 0,
                                                    paddingRight: "2.5%",
                                                }}
                                            >
                                                60%
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <Grid container marginTop={5}>
                                    <BorderLinearProgress2
                                        value={60}
                                        variant="determinate"
                                    />
                                </Grid>
                                <Grid container justifyContent="space-between">
                                    <div className="sub-heading progress-label">
                                        <p className="text left">
                                            Tank-to-well <br />
                                            <span> 7.44 miles</span>
                                        </p>
                                        <p className="text right">
                                            Well-to-tank <br />
                                            <span> 7.44 miles</span>
                                        </p>
                                    </div>
                                </Grid>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
export default EmissionReport;
