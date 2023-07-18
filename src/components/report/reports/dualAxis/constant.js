import { numberWithCommas } from "../../../utlils/dashboard";
import Highcharts from "highcharts";

export const chartOptions = (siteCurrency) => ({
  chart: {
    zoomType: "xy",
  },
  title: {
    text: null,
  },
  subtitle: {
    text: null,
    align: "left",
  },
  xAxis: [
    {
      categories: [
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
      crosshair: true,
    },
  ],
  yAxis: [
    {
      // Primary yAxis
      labels: {
        format: "{value}°C",
        style: {
          color: Highcharts.getOptions().colors[2],
        },
      },
      title: {
        text: null,
        style: {
          color: Highcharts.getOptions().colors[2],
        },
      },
      opposite: true,
    },
    {
      // Secondary yAxis
      gridLineWidth: 0,
      title: {
        text: "Delivery",
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      labels: {
        format: "{value} mm",
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
    },
    {
      // Tertiary yAxis
      // gridLineWidth: 0,
      title: {
        text: "Utilization",
        style: {
          color: Highcharts.getOptions().colors[1],
        },
      },
      labels: {
        format: "{value} %",
        style: {
          color: Highcharts.getOptions().colors[1],
        },
      },
      opposite: true,
    },
  ],
  tooltip: {
    shared: true,
  },
  // legend: {
  //   layout: "vertical",
  //   align: "left",
  //   x: 80,
  //   verticalAlign: "bottom",
  //   y: 55,
  //   floating: true,
  //   backgroundColor:
  //     Highcharts.defaultOptions.legend.backgroundColor || // theme
  //     "rgba(255,255,255,0.25)",
  // },
  series: [
    {
      name: "Delivery",
      type: "line",
      yAxis: 1,
      data: [
        49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4,
      ],
      tooltip: {
        valueSuffix: " mm",
      },
    },
    {
      name: "Utilization",
      type: "line",
      yAxis: 2,
      data: [
        20.9, 40.5, 70.4, 100.2, 120.0, 150.0, 112.6, 160.5, 180.4, 1600.1,
        80.6, 20.4,
      ],
      tooltip: {
        valueSuffix: " mm",
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
            floating: false,
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
            x: 0,
            y: 0,
          },
          yAxis: [
            {
              labels: {
                align: "right",
                x: 0,
                y: -6,
              },
              showLastLabel: false,
            },
            {
              labels: {
                align: "left",
                x: 0,
                y: -6,
              },
              showLastLabel: false,
            },
            {
              visible: false,
            },
          ],
        },
      },
    ],
  },
});
export const data2 = (siteCurrency) => ({
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
    text: null,
  },
  subtitle: {
    text: null,
  },
  xAxis: {
    categories: [
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
    gridLineColor: "transparent",
    gridTextColor: "#ffffff",
    lineColor: "transparent",
    tickColor: "transparent",
  },
  yAxis: {
    min: 0,
    max: 100,
    title: {
      text: null,
    },
    gridLineColor: "#ffffff",
    gridLineWidth: 0,
    labels: {
      formatter() {
        const getLabel = (value) => {
          return `${
            siteCurrency
              ? siteCurrency
              : localStorage.getItem("currency")
              ? localStorage.getItem("currency")
              : "£"
          }${value}`;
        };
        return getLabel(this.value);
      },
    },
  },

  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      grouping: false,
      // pointPadding: 0.2,
      // borderWidth: 0,
    },
    series: {
      states: {
        hover: {
          enabled: false,
        },
      },
    },
  },
  legend: {
    enabled: false,
    symbolRadius: 2,
    itemStyle: {
      fontFamily: "DM Sans",
      color: "#677790",
      fontWeight: 700,
    },
  },
  series: [
    {
      name: "null",
      data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      borderWidth: 0,
      stack: 1,
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
      color: "#F7F7F7",
    },
    {
      type: "column",
      name: "Emissions produced",
      data: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ],
      color: "#5BA842",
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
    },
  ],
});

export const newChart = () => ({
  chart: {
    type: "column",
    style: {
      fontFamily: "DM Sans",
      color: "#677790",
      fontWeight: 700,
    },
  },
  title: {
    text: null,
    align: "left",
  },
  xAxis: {
    categories: ["28/11/2022", "29/11/2022", "30/11/2022", "01/12/2022"],
    gridLineColor: "transparent",
    gridTextColor: "#ffffff",
    lineColor: "transparent",
    tickColor: "transparent",
  },

  yAxis: {
    allowDecimals: false,
    gridLineColor: "#ffffff",
    gridLineWidth: 0,
    min: 0,
    title: {
      text: null,
    },
    labels: {
      formatter() {
        const getLabel = (value) => {
          return `${value} ${"kgco2e"} `;
        };
        return getLabel(numberWithCommas(this.value));
      },
    },
  },

  tooltip: {
    formatter: function () {
      return (
        "<b>" +
        this.x +
        "</b><br/>" +
        this.series.name +
        ": " +
        numberWithCommas(this?.y == 0 ? this.y : this.y?.toFixed(2))
      );
    },
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        align: "left",
        x: -10,
        style: {
          fontWeight: "bold",
          color: "#677790",
        },
        formatter: function () {
          return numberWithCommas(this?.y == 0 ? this.y : this.y?.toFixed(2));
        },
      },
      pointPadding: 0.1,
      groupPadding: 0,
    },
  },

  series: [
    {
      name: "Recycled",
      data: [79.63, 99.646, 108.52, 96.971],
      pointWidth: 30,
      borderRadius: 6,
      stack: "1",
    },
    //    {
    //      name: "Landfill",
    //      data: [3331.98, 4221.49, 1843, 1267],
    //      stack: "2",
    //    },
    //    {
    //      name: "Reuse",
    //      data: [0, 0, 0, 0],
    //      stack: "3",
    //    },
  ],
});
