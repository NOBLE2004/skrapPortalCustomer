import Highcharts from "highcharts";

export const chartOptions = (data) => ({
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
      categories: data?.date || [],
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
      title: {
        text: "Delivery",
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
      labels: {
        format: "{value}",
        style: {
          color: Highcharts.getOptions().colors[0],
        },
      },
    },
    {
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
  series: [
    {
      name: "Delivery",
      type: "line",
      yAxis: 1,
      data: data?.TotalDeliveryJobs || [],
      tooltip: {
        valueSuffix: "",
      },
    },
    {
      name: "Utilization",
      type: "line",
      yAxis: 2,
      data: data?.Utilization || [],
      tooltip: {
        valueSuffix: "%",
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
