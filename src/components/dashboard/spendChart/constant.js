export const lineChartData = (data) => (
   {
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
            return `${value}t`;
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
    series: [
      {
        name: 'null',
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        borderWidth: 0,
        stack: 1,
        borderSkipped: false,
        borderRadius: 6,
        pointStyle: "rectRounded",
        pointWidth: 10,
        boxWidth: "100%",
        color: "#F7F7F7"
      },
      {
        type: "column",
        name: "Emissions produced",
        data: [
          data?.salesTotal?.Months[1].total,
          data?.salesTotal?.Months[2].total,
          data?.salesTotal?.Months[3].total,
          data?.salesTotal?.Months[4].total,
          data?.salesTotal?.Months[5].total,
          data?.salesTotal?.Months[6].total,
          data?.salesTotal?.Months[7].total,
          data?.salesTotal?.Months[8].total,
          data?.salesTotal?.Months[9].total,
          data?.salesTotal?.Months[10].total,
          data?.salesTotal?.Months[11].total,
          data?.salesTotal?.Months[12].total,
        ],
        color: "#63acf9",
        borderSkipped: false,
        borderRadius: 6,
        pointStyle: "rectRounded",
        pointWidth: 10,
        boxWidth: "100%",
      },
      // {
      //   type: "column",
      //   name: "Predicted emissions(based on bookings)",
      //   data: [null, null, null, null, null, null, 50, null, null, null, null, null],
      //   color: "#a4adbc",
      //   borderSkipped: false,
      //   borderRadius: 6,
      //   pointStyle: "rectRounded",
      //   pointWidth: 10,
      //   boxWidth: "100%",
      // },
      // {
      //   type: "line",
      //   dashStyle: "Dash",
      //   name: "2021 Emissions",
      //   data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   color: "#677790",
      //   borderSkipped: false,
      //   borderRadius: 10,
      //   pointStyle: "rectRounded",
      //   pointWidth: 15,
      //   boxWidth: "100%",
      //   marker: {
      //     enabled: false,
      //   },
      // },
    ],
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
          return `€${value}`;
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
      pointWidth: 10,
      boxWidth: "100%",
      color: "#F7F7F7",
    },
    {
      type: "column",
      name: "Emissions produced",
      data: [null, null, null, null, null, null, null, null, null, null, null, null],
      color: "#5BA842",
      borderSkipped: false,
      borderRadius: 6,
      pointStyle: "rectRounded",
      pointWidth: 10,
      boxWidth: "100%",
    },
  ],
};
