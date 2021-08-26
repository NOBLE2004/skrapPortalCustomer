import React from "react";
import { Line } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import "./totalspend.scss";
const TotalSpend = ({ totalSpend }) => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep"],
    options: {
      legend: {
        display: false,
      },
    },
    datasets: [
      {
        data: [33, 53, 25, 41, 70, 55, 60, 46, 68],
        fill: false,
        pointRadius: 0,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#0176FF",
      },
    ],
  };
  const options = {
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };
  return (
    <div className="listViewWp">
      <div className="lineChartWp">
        <div className="chartInfo">
          <h1>{`£ ${totalSpend ? totalSpend : 4476.0}`} </h1>
          <span className="primary-title"> Total Spend </span>
        </div>
        <div className="lineChart">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default TotalSpend;
