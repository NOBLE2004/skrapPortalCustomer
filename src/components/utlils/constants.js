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
      backgroundColor: "#52A9DD",
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
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        padding: 0,
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
            return "£" + parseInt(value.toFixed(0)).toLocaleString();
          },
          beginAtZero: true,
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
  },
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

export const jobHeadCells = [
  { id: "order", numeric: false, disablePadding: false, label: "Order #" },
  { id: "booked", numeric: false, disablePadding: false, label: "booked" },
  {
    id: "deliveryDate",
    numeric: false,
    disablePadding: false,
    label: "delivery date",
  },
  {
    id: "siteContact",
    numeric: true,
    disablePadding: false,
    label: "site Contact",
  },
  { id: "service", numeric: false, disablePadding: false, label: "service" },
  { id: "address", numeric: true, disablePadding: false, label: "address" },
  { id: "cost", numeric: false, disablePadding: false, label: "cost" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  { id: "payment", numeric: false, disablePadding: false, label: "Payment" },
  { id: "bookedBy", numeric: true, disablePadding: false, label: "booked by" },
  { id: "po", numeric: true, disablePadding: false, label: "PO" },
  { id: "action", numeric: true, disablePadding: false, label: "" },
];

export const paymentTypes = [
  {
    value: "2",
    name: "Credit",
  },
  {
    value: "0",
    name: "Stripe",
  },
];
export const serviceList = [
  {
    service_id: 2,

    service_name: "Skip Hire",

    description:
      "<p>Ideal for disposing of large amounts of building, construction and garden waste. Skips come&nbsp;in varied sizes and are measured in yards.</p>",

    full_url:
      "https://portaltest2.skrap.app/service_images/5fdc817505c54skip-hire.png",

    img_url: "/service_images/5fdc817505c54skip-hire.png",
  },

  {
    service_id: 1,

    service_name: "Grab Hire",

    description:
      "<p>Ideal for disposing of&nbsp;large amounts of building, construction and garden waste.&nbsp;&nbsp;A&nbsp;grab lorry uses a grab arm and bucket to collect and clear away large quantities of waste from otherwise inaccessible areas</p>",

    full_url:
      "https://portaltest2.skrap.app/service_images/61546f4cae16c5f9fe0d6d5062Group 48624@3x.png",

    img_url: "/service_images/61546f4cae16c5f9fe0d6d5062Group 48624@3x.png",
  },

  {
    service_id: 3,

    service_name: "Cage Hire",

    description:
      "<p>An alternative removal solution to skip hire, suitable for all types of waste removals and includes a professional and experienced driver who will assist you in loading your waste. Ideal for removal of bulky items or for locations where a skip isn&#39;t practical, such as more congested roads or busy urban areas with parking restrictions.</p>",

    full_url:
      "https://portaltest2.skrap.app/service_images/5f9fd84dca502Group 49016@3x.png",

    img_url: "/service_images/5f9fd84dca502Group 49016@3x.png",
  },
  {
    description:
      "<p>Ready Mix Concrete is a batch of concrete that is pre-mixed before being delivered to the project site. Tell us the volume required, and we have it delivered to site in a volume metric vehicle.&nbsp;</p>",
    full_url:
      "https://portaltest2.skrap.app/service_images/5f9fe11ab933aGroup 47848@3x.png",
    img_url: "/service_images/5f9fe11ab933aGroup 47848@3x.png",
    service_id: 80,
    service_name: "Concrete",
  },
  {
    description:
      "<p>We have portable Toilets available for varied workforce sizes, hired on a weekly basis with an additional haulage charge.</p>",
    full_url:
      "https://portaltest2.skrap.app/service_images/5f9fe5eca9899Group 45309@3x.png",
    img_url: "/service_images/5f9fe5eca9899Group 45309@3x.png",
    service_id: 43,
    service_name: "Portable Toilet",
  },
];
