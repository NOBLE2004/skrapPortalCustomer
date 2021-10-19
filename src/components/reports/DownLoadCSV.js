import React from "react";
import { CSVLink } from "react-csv";
const DownLoadCSV = ({ data }) => {
  return (
    <div>
      <CSVLink data={data} filename="reports.csv">
        Download Reports
      </CSVLink>
    </div>
  );
};

export default DownLoadCSV;
