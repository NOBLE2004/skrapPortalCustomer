export const chartLineOption = {
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};

export const spendData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep"],
  options: {
    legend: {
      display: false,
    },
  },
  datasets: [
    {
      data: [33, 53, 25, 41, 70, 55, 60, 46, 68],
      fill: false,
      pointRadius: 0,
      backgroundColor: "rgba(75,192,192,0.2)",
      borderColor: "#0176FF",
    },
  ],
};

export const spendChartData = {
  datasets: [
    {
      backgroundColor: '#52A9DD',
      data: [7.5, 5, 7, 3.3, 5, 9, 3.3, 0, 0, 0, 0, 0],
      label: "This year",
      borderWidth: 2,
      borderRadius: 5,
      borderColor: "#52A9DD",
      borderSkipped: false,
      cornerRadius: 4,
    },
  ],
  labels: [
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
};

export const spendChartOptions = {
  cornerRadius: 4,
  legend: { display: false },
  responsive: true,
  scales: {
    xAxes: [
      {
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
        gridLines: {
          display: false,
          drawBorder: false,
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          callback: function (value) {
            return '£' + value.toFixed(0);
          },
          beginAtZero: true
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
        },
      },
    ],
  }
};

export const dates = [
  { id: 2015, value: 2015 },
  { id: 2016, value: 2016 },
  { id: 2017, value: 2017 },
  { id: 2018, value: 2018 },
  { id: 2019, value: 2019 },
  { id: 2020, value: 2020 },
  { id: 2021, value: 2021 },
];