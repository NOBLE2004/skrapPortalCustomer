import React from "react";
import { footColumns, otherColumns } from "../utlils/reportData";
import ReactExport from "react-data-export";
import moment from "moment";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const DownLoadCSV = ({ rdata }) => {
  const footPrintData = [
    {
      columns: footColumns,
      data:
        rdata.length > 0 &&
        rdata.map((order, index) => {
          return [
            { value: order.job_id ? order.job_id : "" },
            { value: order.job_address ? order.job_address : "" },
            {
              value: order.job_date
                ? moment(order.job_date).format("DD/MM/YYYY")
                : "",
            },
            { value: order.service_name ? order.service_name : "" },
            {
              value: order.EWC_Code ? order.EWC_Code : "",
            },
            {
              value: order.transaction_cost ? "£" + order.transaction_cost : "",
            },
            {
              value: String(order.full_name),
              ...(order.full_name == "Average"
                ? {
                  style: {
                    font: { sz: "10", bold: true },
                    fill: {
                      patternType: "solid",
                      fgColor: { rgb: "52a9dd" },
                    },
                  },
                }
                : order.full_name
                  ? String(order.full_name)
                  : ""),
            },
            {
              value: order.co2_emissions
                ? order.co2_emissions + "2"
                : order.WTN_Number
                  ? order.WTN_Number + " kg CO2"
                  : "",
            },
          ];
        }),
    },
  ];
  const data = [
    {
      columns: otherColumns,
      data:
        rdata.length > 0 &&
        rdata.map((order, index) => {
          return [
            { value: order.job_id ? order.job_id : "" },
            { value: order.job_address ? order.job_address : "" },
            {
              value: order.job_date
                ? moment(order.job_date).format("DD/MM/YYYY")
                : "",
            },
            { value: order.service_name ? order.service_name : "" },
            {
              value: order.EWC_Code,
              ...(order.EWC_Code === "Sub Total"
                ? {
                  style: {
                    font: { sz: "10", bold: true },
                    fill: {
                      patternType: "solid",
                      fgColor: { rgb: "52a9dd" },
                    },
                  },
                }
                : order.EWC_Code
                  ? order.EWC_Code
                  : ""),
            },
            {
              value: order.transaction_cost ? "£" + order.transaction_cost : "",
            },
            {
              value: String(order.full_name) ? String(order.full_name) : "",
            },
            {
              value: order.WTN_Number ? "£" + order.WTN_Number : "",
            },
            {
              value: order.Disposal_Site ? order.Disposal_Site : "",
            },
            { value: order.Tonnage ? order.Tonnage : "" },
            {
              value: order.Diverted_Tonnage ? order.Diverted_Tonnage : "",
            },
            { value: order.Volume ? order.Volume : "" },
            {
              value: order.Landfill_Diversion_Rate
                ? order.Landfill_Diversion_Rate
                : "",
            },
          ];
        }),
    },
  ];
  return (
    <div>
      <ExcelFile element={<button>Download Reports</button>} filename="reports">
        <ExcelSheet
          dataSet={
            rdata[rdata.length - 1].transaction_cost ? data : footPrintData
          }
          name="Organization"
        />
      </ExcelFile>
    </div>
  );
};

export default DownLoadCSV;
