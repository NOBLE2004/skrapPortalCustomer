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
    text: 'Deliveries and Exchanges',
  },

  subtitle: {
    text: null,
  },
  xAxis: {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  },

  tooltip: {
    formatter: function () {
      let s = `<b> ${this.x} </b>`;
      this.points.forEach((point) => {
        if (point?.series?.name !== "null") {
          s += `<br/> ${point.series.name} :  ${numberWithCommas(point.y)}`;
        }
      });
      return s;
    },
    shared: true,
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
      stacking: 'normal',
      dataLabels: {
        enabled: false,
        color: 'white'
      }
    },
  },

  series: data,

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
