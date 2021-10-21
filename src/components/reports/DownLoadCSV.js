import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

// const data = [
//   {
//     columns: [
//       { title: "Order #" },
//       { title: "Customer" },
//       { title: "Ref #" },
//       { title: "Status" },
//       { title: "Total" },
//       { title: "Sub Total" },
//       { title: "Order Time" },
//       { title: "Items Count" },
//     ],
//     data: csvData.map((order, index) => {
//       return [
//         { value: order.order_no },
//         { value: order.customer_name },
//         { value: order.ref_id},
//         { value: this.getStatusName(order) },
//         { value: order.total.toFixed(2) },
//         { value: humanizeT(order.order_time) },
//         { value: order.customer_name },
//         { value: order.order_item_count },
//       ];
//     }),
//   },
// ]


const DownLoadCSV = ({data}) => {
  console.log('data' , data)
  const multiDataSet = [
    {
      columns: [
        {
          title: "Job Number",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Site",
          width: {wch: 30},
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Service Date",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Service Type",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Description",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "EWC Code",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Cost",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Provider",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "WTN Number",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Disposal Site",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Tonnage",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Diverted Tonnage",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Volumn",
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Landfill Diversion Rate",
          width: {wch: 30},
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
      ],
      data: [
        [
          { value: "H1"},
          { value: "Bold alkjsdfkljalskfa asldfj"},
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Hello world this",
          },
        ],
        [
          { value: "H2"},
          { value: "underline" },
          {
            value: "Blue",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
        ],
        [
          { value: "H3" },
          { value: "italic" },
          {
            value: "Green",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
        ],
        [
          { value: "H4" },
          { value: "strike"},
          {
            value: "Orange",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
        ],
        [
          { value: "H5" },
          { value: "outline" },
          {
            value: "Hello world",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
          {
            value: "Red",
          },
        ],
        [
          { value: "" },
          {
            value: "",
          },
  
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "Sub Total",
            style: {
              font: { bold: true, sz: "10" },
              fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
            },
          },
          {
            value: "20000",
            style: {
              font: { bold: true, sz: "10" },
            },
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
          {
            value: "",
          },
        ],
      ],
    },
  ];
  return (
    <div>
      <ExcelFile element={<button>Download Reports</button>} filename="reports">
        <ExcelSheet dataSet={multiDataSet} name="Organization" />
      </ExcelFile>
    </div>
  );
};

export default DownLoadCSV;
