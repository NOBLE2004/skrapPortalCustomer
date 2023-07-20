import { Card, CardContent } from "@mui/material";
import "./style.scss";
import { useSelector, useDispatch } from "react-redux";
import { getRebateBreakdown } from "../../../../store/actions/action.rebateBd";
import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import FadeLoader from "react-spinners/FadeLoader";

const RebateReport = (props) => {
    const { sites, showMore, siteCurrency, date } = props;
    const [chartData, setChartData] = useState();
    const [currency, setCurrency] = useState(siteCurrency);

    const dispatch = useDispatch();
    const stateSites = useSelector((state) => state?.rebateBreakDown);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (siteCurrency !== null) {
            setCurrency(siteCurrency);
        } else {
            setCurrency(localStorage.getItem("currency"));
        }
    }, [siteCurrency]);

    useEffect(() => {
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
                pointFormat: "<b>{point.percentage:.1f}%</b>",
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
                    data: stateSites?.rebate_breakdown?.result?.data,
                },
            ],
            exporting: {
                filename: `chart-${new Date()?.toLocaleDateString()}`,
            },
        });
    }, [stateSites?.rebate_breakdown]);

    // useEffect(() => {
    //   async function fetchData() {
    //      if (sites !== "") {
    //       await dispatch(getSiteBreakdown(sites !=='' &&{ sites: [sites] }));
    //       await dispatch(getHireBreakdown(sites !=='' &&{ sites: [sites] }));
    //      }
    //   }
    //   fetchData();
    // }, [sites]);

    useEffect(() => {
        async function fetchData() {
            await dispatch(getRebateBreakdown({ sites: sites, date, currency }));
        }
        fetchData();
    }, [sites, date, currency]);

    return (
        <>
            {(stateSites?.rebate_breakdown?.result?.length > 0 && stateSites?.rebate_breakdown?.result?.total != 0) && <div className="report-chart-card-outer">
        <div className="report-card-title">Rebate report</div>
        <Card className="report-chart-card" id={"finance"}>
            <CardContent>
                <div className="salesWp">
                    {stateSites?.rebate_breakdown?.result?.total && (
                        <h1>
                            {`${currency ? currency : "£"}`}
                            {stateSites?.rebate_breakdown?.result?.total.toLocaleString()}
                            <span> Total rebate</span>
                        </h1>
                    )}

                    <div className="sub-heading">Site breakdown</div>
                    {stateSites?.isLoading ? (
                        <div className="d-flex justify-center align-center">
                            <FadeLoader
                                color={"#518ef8"}
                                loading={stateSites?.isLoading}
                                width={4}
                            />
                        </div>
                    ) : (
                        <div className="highchart-sites">
                            {stateSites?.rebate_breakdown &&
                                stateSites?.rebate_breakdown?.result?.data && (
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={chartData}
                                        ref={props.refFinance}
                                    />
                                )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
        </div>}
            </>
    );
};
export default RebateReport;
