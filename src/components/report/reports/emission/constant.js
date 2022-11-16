export const chartOptions = data => ({
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
          return `${value} kg`;
        };
        return getLabel(this.value);
      },
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} kg</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      grouping: false
      // pointPadding: 0.2,
      // groupPadding: 0.9,
    },
    series: {
      states: {
        hover: {
          enabled: false
        }
      }
    }
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
export const data2 = {
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
          return `${localStorage.getItem("currency")?localStorage.getItem("currency"):'£'}${value}`;
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
      grouping: false
      // pointPadding: 0.2,
      // borderWidth: 0,
    },
    series: {
      states: {
        hover: {
          enabled: false
        }
      }
    }
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
      name: 'null',
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
      data: [null, null, null, null, null, 50, null, null, null, null, null, null],
      color: "#5BA842",
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
    },
  ],
};
