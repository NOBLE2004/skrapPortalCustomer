export const data = {
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
      pointPadding: 0.2,
      groupPadding: 0.9,
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
  series: [
    {
      type: "column",
      name: "Emissions produced",
      data: [140, 130, 60, 100, 60, 80, 50, 60, 80, 50, 60, 80],
      color: "#63acf9",
      borderSkipped: false,
      borderRadius: 10,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
    },
    {
      type: "column",
      name: "Predicted emissions(based on bookings)",
      data: [140, 130, 60, 100, 60, 80, 50, 60, 80, 50, 60, 80],
      color: "#a4adbc",
      borderSkipped: false,
      borderRadius: 10,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
    },
    {
      type: "line",
      dashStyle: "Dash",
      name: "2021 Emissions",
      data: [125, 70, 75, 70, 60, 90, 70, 0, 90, 80, 70, 100],
      color: "#677790",
      borderSkipped: false,
      borderRadius: 10,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
      marker: {
        enabled: false,
      },
    },
  ],
};
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
    title: {
      text: null,
    },
    gridLineColor: "#ffffff",
    gridLineWidth: 0,
    labels: {
        formatter() {
          const getLabel = (value) => {
            return `£${value}`;
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
      pointPadding: 0.2,
      borderWidth: 0,
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
  series: [
    {
      type: "column",
      name: "Emissions produced",
      data: [90, 60, 30, 50, 30, 80, 50, 0, 0, 0, 0, 0],
      color: "#6bb751",
      borderSkipped: false,
      borderRadius: 10,
      pointStyle: "rectRounded",
      pointWidth: 15,
      boxWidth: "100%",
    },
  ],
};
