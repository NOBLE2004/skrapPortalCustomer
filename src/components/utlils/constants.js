export const chartLineOption = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
      },
    },
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
      backgroundColor: "rgb(81, 142, 248)",
      borderColor: "rgb(81, 142, 248)",
    },
  ],
};

export const spendChartData = {
  datasets: [
    {
      backgroundColor: "rgb(81, 142, 248)",
      data: [7.5, 5, 7, 3.3, 5, 9, 3.3, 0, 0, 0, 0, 0],
      label: "This year",
      borderWidth: 2,
      borderRadius: 5,
      borderColor: "rgb(81, 142, 248)",
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
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      borderWidth: 1,
      display: false,
      position: "top",
      horizontalAlign: "center",
      verticalAlign: "left",
      textAlign: "center",
      fullSize: true,
      labels: {
        padding: 25,
        fullWidth: true,
        font: {
          size: 12,
          family: "DM Sans",
          weight: 500,
        },
      },
    },
  },
  scales: {
    x: {
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
          4,
        callback: function (value) {
          return (
            `${
              localStorage.getItem("currency")
                ? localStorage.getItem("currency")
                : "£"
            }` + parseInt(value.toFixed(0)).toLocaleString()
          );
        },
        beginAtZero: true,
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
  { id: 2022, value: 2022 },
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
  {
    description:
        "<p>Tipper trucks come with a fitted chassis and open-top body suited for lifting and transporting different heavy materials on-site.</p>",
    full_url:
        "https://portal.skrap.app/storage/service_images/61d849c9c7969Asset 5@4x.png",
    img_url: "/service_images/61d849c9c7969Asset 5@4x.png",
    service_id: 283,
    service_name: "Tipper Hire",
  },
];
export const servicesReport = [
  {
    service_id: 2,
    service_name: "Skip Hire",
    full_url:
      "https://portaltest2.skrap.app/service_images/5fdc817505c54skip-hire.png",
    img_url: "/service_images/5fdc817505c54skip-hire.png",
    percentage: 20,
    title: "Exchange",
  },

  {
    service_id: 1,
    service_name: "Grab Hire",
    full_url:
      "https://portal.skrap.app/storage/service_images/61542e3a5509egroup_48818.png",
    img_url: "/service_images/61546f4cae16c5f9fe0d6d5062Group 48624@3x.png",
    percentage: 100,
    title: "Wait & load",
  },

  {
    service_id: 3,
    service_name: "Tipper Hire",
    full_url:
      "https://portal.skrap.app/storage/service_images/61d849c9c7969Asset 5@4x.png",
    img_url: "/service_images/5f9fd84dca502Group 49016@3x.png",
    percentage: 60,
    title: "Collect",
  },
  {
    service_id: 80,
    service_name: "Plant Hire",
    full_url:
      "https://portal.skrap.app/storage/service_images/5f9fe0d6d5062Group 48624@3x.png",
    img_url: "/service_images/5f9fe11ab933aGroup 47848@3x.png",
    percentage: 50,
    title: "Delivery",
  },
  // {
  //   service_id: 43,
  //   service_name: "Portable Toilet",
  //   full_url: "https://portaltest2.skrap.app/service_images/5f9fe5eca9899Group 45309@3x.png",
  //   img_url: "/service_images/5f9fe5eca9899Group 45309@3x.png",
  //   percentage: 30
  // },
];

export const wasteReport = [
  {
    name: "Wood",
    percentage: 29,
    color: "grey",
  },
  {
    name: "Glass",
    percentage: 30,
    color: "green",
  },
  {
    name: "Plasterboard",
    percentage: 40,
    color: "green",
  },
  {
    name: "Soil & stone",
    percentage: 15,
    color: "grey",
  },
  {
    name: "Metal",
    percentage: 10,
    color: "green",
  },
  {
    name: "Gypsum",
    percentage: 60,
    color: "grey",
  },
  {
    name: "Mixed construction",
    percentage: 50,
    color: "green",
  },
  {
    name: "Hardcore",
    percentage: 45,
    color: "green",
  },
];
export const sitesReport = [
  {
    name: "Century House",
    percentage: 10.7,
    color: "#4981F8",
  },
  // {
  //   name: 'Richmond Green',
  //   percentage: 2.1,
  //   color: '#60A0F8'
  // },
  // {
  //   name: 'Ludlow Lodge',
  //   percentage: 15.3,
  //   color: '#0F2851'
  // },
  // {
  //   name: 'Skinners School',
  //   percentage: 2.1,
  //   color: '#60A0F8'
  // },
  // {
  //   name: 'Swandon Way',
  //   percentage: 1.44,
  //   color: '#60A0F8'
  // }
];
