export const PieChartDefaultOptions = {
  plugins: {
    legend: {
      display: true,
      fullWidth: false,
      position: "right",
      align: "center",
      maxWidth: 500,
      labels: {
        display: true,
        usePointStyle: true,
        fullWidth: true,
        padding: 10,
        font: {
          size: 10,
          family: "DM Sans",
          weight: 700,
        },
      },
    },
  },
  maintainAspectRatio: true,
  responsive: true,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};
export const DonutChartDefaultOptions = {
  plugins: {
    legend: {
      display: false,
      position: "right",
      horizontalAlign: "center",
      verticalAlign: "left",
      textAlign: "center",
      onClick: (e) => e.stopPropagation(),
      labels: {
        usePointStyle: true,
        padding: 25,
        font: {
          size: 12,
          family: "DM Sans",
          weight: 700,
        },
      },
    },
  },
  cutout: 90,
  maintainAspectRatio: true,
  responsive: false,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};
export const DonutChartSmallDefaultOptions = {
  plugins: {
    legend: {
      display: false,
      fullWidth: true,
      position: "right",
      align: "center",
      text: "grab hire",
      maxWidth: 500,
      onClick: (e) => e.stopPropagation(),
      title: {
        padding: 20,
        display: true,
        text: "abc",
      },
      labels: {
        display: true,
        usePointStyle: true,
        fullWidth: true,
        padding: 20,
        spacing: 5,
        font: {
          size: 10,
          family: "DM Sans",
          weight: 700,
        },
      },
    },
  },
  cutout: 55,
  maintainAspectRatio: true,
  responsive: false,
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};
export const BarChartOptions = {
  categoryPercentage: 0.6,
  fillColor: "grey",
  
  plugins: {
    legend: {
      borderWidth: 1,
      display: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "left",
      textAlign: "center",
      fullSize: true,
      labels: {
        usePointStyle: true,
        fullWidth: true,
        font: {
          size: 12,
          family: "DM Sans",
          weight: 500,
          textAlign: "right",
        },
      },
    },
  },
  scales: {
    x: {
      //stacked: true,
      ticks: {
        padding: 10,
        font: {
          size: 12,
          family: "DM Sans",
          weight: 500,
        },
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    y: {
      ticks: {
        stepSize: (c) =>
          (Math.max(...c.chart.data.datasets[0].data) -
            Math.min(...c.chart.data.datasets[0].data)) /
          3,
        callback: function (value) {
          return parseInt(value.toFixed(0)).toLocaleString() + " t";
        },
        padding: 10,
        font: {
          size: 12,
          family: "DM Sans",
          weight: 500,
        },
      },
      beginAtZero: true,
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
  maintainAspectRatio: true,
  responsive: true,
};
