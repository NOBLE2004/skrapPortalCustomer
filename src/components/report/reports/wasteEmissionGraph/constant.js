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
    labels: {
      formatter() {
        const getLabel = (value) => {
          return `${numberWithCommas(value)} kgCo2e`;
        };
        return getLabel(numberWithCommas(this.value));
      },
    },
  },

  tooltip: {
    formatter: function () {
      let s = `<b> ${this.x} </b>`;
      this.points.forEach((point) => {
        if (point?.series?.name !== "null") {
          s += `<br/> ${point.series.name} :  ${numberWithCommas(point.y)} kg`;
        }
      });
      return s;
    },
    shared: true,
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
    column: {
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "10px",
        },
      },
    },
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
      name: `Landfill`,
      data: data?.LandFill || [],
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, "#73C6F9"],
          [1, "#5391F9"],
        ],
      },
      dataLabels: {
        enabled: true,
        color: "#6cacf5",
        formatter() {
          if (this.y > 0) {
            return numberWithCommas(this.y);
          } else {
            return null;
          }
        },
      },
    },
    {
      name: `Recycled`,
      data: data?.Recycled || [],
      color: {
        linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
        stops: [
          [0, "#50D226"],
          [1, "#50D226"],
        ],
      },
      dataLabels: {
        enabled: true,
        color: "#50D226",
        formatter() {
          if (this.y > 0) {
            return numberWithCommas(this.y);
          } else {
            return null;
          }
        },
      },
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
