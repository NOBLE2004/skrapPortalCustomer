import Highcharts from "highcharts";
import { numberWithCommas } from "../../../utlils/dashboard";

export const chartOptions = (data) => ({
  chart: {
    type: "column",
    height: 350,
    style: {
      fontFamily: "DM Sans, Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
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
      groupPadding: 0.1,
      pointPadding: 0,
      pointWidth: 10,
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
          [0, "#f69697"],
          [1, "#f69697"],
        ],
      },
      dataLabels: {
        enabled: true,
        color: "#ff0000",
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
    {
      name: `Avoided`,
      data: data?.Total || [],
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

export const chartOptionsWaste = (data) => ({
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
          return `${numberWithCommas(value)} %`;
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
          s += `<br/> ${point.series.name} :  ${numberWithCommas(point.y)} %`;
        }
      });
      return s;
    },
    shared: true,
  },

  xAxis: {
    categories: data?.labels || [],
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

  series: data.data,
  colors: ["#0f2851", "#4981f8", "#60a0f8", "#a4adbc"],

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
