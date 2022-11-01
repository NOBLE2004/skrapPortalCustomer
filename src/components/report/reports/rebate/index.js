import { Card, CardContent } from "@mui/material";
import "../finance/style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getSiteBreakdown } from "../../../../store/actions/action.siteBd";
import { getHireBreakdown } from "../../../../store/actions/action.hireBd";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HireBreakDown from "../finance/hireBreakDown/hireBreakDown";
import ServiceBreakDown from "./serviceBreakdown/hireBreakDown";

const FinanceReport = (props) => {
    const { sites, showMore } = props;
    const [chartData, setChartData] = useState();
    const dispatch = useDispatch();
    const stateSites = useSelector((state) => state?.siteBreakdown);
    const [show, setShow] = useState(false);
    const [currency, setCurrency] = useState('€')

    useEffect(() => {
        setCurrency(sites[0] == 3629 ? '£' : '€');
        const data = sites[0] == 3629 ? [{
            name: 'Wood waste',
            y: 37.52
        }, {
            name: 'Paper waste',
            y: 20.81
        },
            {
                name: 'Plastic waste',
                y: 41.67
            }
        ]:[{
            name: 'Wood waste',
            y: 37.52
        }, {
            name: 'Paper waste',
            y: 20.81
        },
            {
                name: 'Plastic waste',
                y: 41.67
            }
            ];
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
                pointFormat: sites[0] == 3629 ? '<b>{point.y}%</b>' : '<b>{point.y}%</b>',
            },
            accessibility: {
                point: {
                    valueSuffix: "%",
                },
            },
            legend: {
                align: "right",
                size: "40%",
                verticalAlign: "middle",
                layout: "vertical",
                itemStyle: {
                    width: 250,
                    textOverflow: "ellipsis",
                },
                margin: 0,
            },
            plotOptions: {
                pie: {
                    size: "100%",
                    allowPointSelect: true,
                    cursor: "pointer",
                    colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc"],
                    dataLabels: {
                        enabled: false,
                    },
                    showInLegend: true,
                },
            },
            series: [
                {
                    title: "",
                    type: "pie",
                    data: data,
                },
            ],
            exporting: {
                filename: `chart-${new Date()?.toLocaleDateString()}`,
            },
        });
    }, [sites]);

    useEffect(() => {
        async function fetchData() {
            //if (!stateSites?.site_breakdown?.result?.data) {
            await dispatch(getSiteBreakdown({ sites: sites }));
            await dispatch(getHireBreakdown({ sites }));
            //}
        }
        fetchData();
    }, [sites]);

    return (
        <Card className="report-chart-card" id={"finance"}>
            <CardContent>
                <div className="salesWp">
                    <h1>
                        {currency}{sites[0] == 3629 ? '103,950.00' : '120,842.22'}
                        <span> Total spend</span>
                    </h1>

                    <div className="sub-heading">Rebate breakdown</div>
                    <div className="highchart-sites">
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartData}
                            ref={props.refFinance}
                        />
                    </div>
                    <div className="see-more-wrap">
                        <div className="border-drop"></div>

                        <div className="more-drop">
                            <div className="sub-heading">Waste breakdown</div>
                            <div className="services"></div>
                        </div>
                        <ServiceBreakDown sites={sites} currency={currency} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default FinanceReport;
