import React from "react";
import ReactExport from "react-data-export";
import moment from "moment";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DownLoadCSV = ({ rdata }) => {
  
  const data = [
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
          width: { wch: 40 },
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
        {
          title: "Service Date",
          width: { wch: 25 },
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
          width: { wch: 30 },
          style: {
            font: { sz: "10", bold: true },
            fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
          },
        },
      ],
      data:
        rdata.length > 0 &&
        rdata.map((order, index) => {
          return [
            { value: order.job_id ? order.job_id : "" },
            { value: order.job_address ? order.job_address :"" },
            { value: order.job_date ? moment(order.job_date).format('DD/MM/YYYY') : "" },
            { value: order.service_name ? order.service_name : "" },
            {
              value: order.EWC_Code,
              ...order.EWC_Code === 'Sub Total'? {
                style: {
                  font: { sz: "10", bold: true },
                  fill: { patternType: "solid", fgColor: { rgb: "52a9dd" } },
                }
              }: order.EWC_Code ? order.EWC_Code : ''
            },
            { value: order.transaction_cost ? "£" + order.transaction_cost : ""  },
            { value: order.full_name ? order.full_name: "" },
            { value: order.WTN_Nnumber ? order.WTN_Nnumber : "" },
            { value: order.Disposal_Site ? order.Disposal_Site :"" },
            { value: order.Tonnage ? order.Tonnage : "" },
            { value: order.Diverted_Tonnage ? order.Diverted_Tonnage :"" },
            { value: order.Volume ? order.Volume : "" },
            { value: order.Landfill_Diversion_Rate ? order.Landfill_Diversion_Rate : "" },
          ];
        }),
    },
  ];
  return (
    <div>
      <ExcelFile element={<button>Download Reports</button>} filename="reports">
        <ExcelSheet dataSet={data} name="Organization" />
      </ExcelFile>
    </div>
  );
};

export default DownLoadCSV;
