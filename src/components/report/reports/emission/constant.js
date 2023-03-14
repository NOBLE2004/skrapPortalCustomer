import { numberWithCommas } from "../../../utlils/dashboard";

export const chartOptions = (siteCurrency) => ({
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
    // max: 100,
    title: {
      text: null,
    },
    gridLineColor: "#ffffff",
    gridLineWidth: 0,
    labels: {
      formatter() {
        const getLabel = (value) => {
          return `${numberWithCommas(value)} kg`;
        };
        return getLabel(numberWithCommas(this.value));
      },
    },
  },

  // tooltip: {
  //   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  //   pointFormat:
  //     '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  //     '<td style="padding:0"><b>{point.y:.1f} kg</b></td></tr>',
  //   footerFormat: "</table>",
  //   shared: true,
  //   useHTML: true,
  // },

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

  plotOptions: {
    column: {
      grouping: false,
      // pointPadding: 0.2,
      // groupPadding: 0.9,
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
    symbolRadius: 2,
    itemStyle: {
      fontFamily: "DM Sans",
      color: "#677790",
      fontWeight: 700,
    },
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
          return `${value} ${"kg CO2e"} `;
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
      name: "Closed loop",
      data: [79.63, 99.646, 108.52, 96.971],
      stack: "1",
    },
    {
      name: "Landfill",
      data: [3331.98, 4221.49, 1843, 1267],
      stack: "2",
    },
    {
      name: "Reuse",
      data: [0, 0, 0, 0],
      stack: "3",
    },
  ],
});
