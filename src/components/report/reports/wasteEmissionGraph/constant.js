import Highcharts from "highcharts";
import { numberWithCommas } from "../../../utlils/dashboard";

export const chartOptions = (data) => ({
  chart: {
    type: "column",
    height: 300,
    style: {
      fontFamily: "DM Sans",
      color: "#677790",
      fontWeight: 700,
    },
  },
  title: {
    text: console.log(data),
  },

  subtitle: {
    text: null,
  },

  yAxis: {
    title: {
      text: null,
    },
  },

  xAxis: {
    categories: data?.date || [],
  },

  legend: {
    symbolRadius: 2,
    itemStyle: {
      fontFamily: "DM Sans",
      color: "#677790",
      fontWeight: 700,
    },
  },
  plotOptions: {
    series: {
      states: {
        hover: {
          enabled: false,
        },
      },
    },
  },

  series: [
    {
      name: "Emission",
      data: data?.Emission || [],
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
});
