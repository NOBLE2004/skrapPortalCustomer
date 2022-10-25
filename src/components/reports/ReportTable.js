import React, { useMemo } from "react";
import TableContainer from "../reactTable/TableContainer";
import "./reportTable.scss";

const ReportTable = ({ data, lastCalculatedReport, reportType }) => {
  const siteMovementsColumns = useMemo(
    () => [
      {
        Header: "Job Number",
        accessor: "job_id",
        disableSortBy: true,
        filter: "equals",
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Site",
        accessor: "job_address",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Service Date",
        accessor: "job_date",
        disableFilters: true,
        Cell: (props) =>
          props.value ? new Date(props.value).toLocaleDateString() : "n/a",
      },
      {
        Header: "Service Type",
        accessor: "service_name",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "EWC Code",
        accessor: "ewc_code",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Cost",
        accessor: "transaction_cost",
        disableFilters: true,
        Cell: (props) => {
          return <span>{`€${props.value}` || "n/a"}</span>;
        },
      },
      {
        Header: "Provider",
        accessor: "full_name",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "WTN Number",
        accessor: "WTN_number",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Disposal Site",
        accessor: "disposal_site",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Tonnage",
        accessor: "tonnage",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Diverted Tonnage",
        accessor: "diverted_tonnage",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Volume",
        accessor: "Volume",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Landfill Diversion Rate",
        accessor: "landfill_diversion_rate",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
    ],
    []
  );

  const carbonFootPrintColumns = useMemo(
    () => [
      {
        Header: "Job Number",
        accessor: "job_id",
        disableSortBy: true,
        filter: "equals",
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Site",
        accessor: "job_address",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Service Date",
        accessor: "job_date",
        disableFilters: true,
        Cell: (props) =>
          props.value ? new Date(props.value).toLocaleDateString() : "n/a",
      },
      {
        Header: "Service Type",
        accessor: "service_name",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "EWC Code",
        accessor: "ewc_code",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Cost",
        accessor: "transaction_cost",
        disableFilters: true,
        Cell: (props) => {
          return <span>{`€${props.value}` || "n/a"}</span>;
        },
      },
      {
        Header: "Provider",
        accessor: "full_name",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Co2 Emmissions",
        accessor: "co2_emissions",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
    ],
    []
  );
  return (
    <div className="reportTableWp">
      <TableContainer
        columns={
          reportType === "Site_movements"
            ? siteMovementsColumns
            : carbonFootPrintColumns
        }
        data={data}
        name={"reports"}
      />
      <p className="subTotal">
        {reportType === "Site_movements"
          ? `Sub Total:  ${lastCalculatedReport}`
          : `Average: ${lastCalculatedReport}`}
      </p>
    </div>
  );
};

export default ReportTable;
