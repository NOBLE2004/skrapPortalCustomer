import Highcharts from "highcharts";
import {numberWithCommas} from "../../../utlils/dashboard";

export const chartOptions = (data) => ({
  chart: {
    zoomType: "xy",
    height: 350,
    style: {
      fontFamily: "DM Sans, Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif",
      color: "#677790",
      fontWeight: 700,
    },
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
      min: 0,
      max: Math.max.apply(Math, data?.TotalDeliveryJobs) > 50 ? Math.max.apply(Math, data?.TotalDeliveryJobs) : 60,
      labels: {
        formatter() {
          const getLabel = (value) => {
            return `${value}`;
          };
          return getLabel(this.value);
        },
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
      min: 0,
      max: 100,
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
        // pointFormatter: function () {
        //   let y = this.y;
        //   console.log(data?.job_service_name?.[this.x]);
        //   return `<p>${this.series.name}: ${this.y}</p> ${
        //     data?.job_service_name?.[this.x]?.length > 0 ? "<br/>" : ""
        //   } <p>${data?.job_service_name?.[this.x]}</p>${
        //     data?.job_service_name?.[this.x]?.length > 0 ? "<br/>" : ""
        //   }`;
        // },
        enabled: false,
        crosshairs: true
      },
      dataLabels: {
        enabled: true,
        color: '#6cacf5',
      }
    },
    {
      name: "Utilization",
      type: "line",
      yAxis: 2,
      data: data?.Utilization || [],
      tooltip: {
        enabled: false,
        crosshairs: true
      },
      dataLabels: {
        enabled: true,
        format: '{y}%',
      }
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
