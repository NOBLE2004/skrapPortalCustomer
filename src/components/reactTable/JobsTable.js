import React, { useMemo } from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import { jobsTableData } from "../utlils/jobListing";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import "./jobs-react-table.scss";

const JobsTable = () => {
  const handleButtonClick = (e, row) => {
    console.log("row click", row);
  };

  const columns = useMemo(

    () => [
      {
        Header: "Order #",
        accessor: "ref",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Booked",
        accessor: "job_date",
        disableFilters: true,
       
      },
      {
        Header: "Delivery Date",
        accessor: "delivery_date",
        disableFilters: true,
      },
      {
        Header: "Site Contact",
        accessor: "full_name",
        disableFilters: true,
      },
      {
        Header: "Service",
        accessor: "Service_name",
        disableFilters: true,
      },
      {
        Header: "Address",
        accessor: "job_address",
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: "Cost",
        accessor: "cost",
        disableSortBy: true,
        disableFilters: true,
        filter: "equals",
      },
      {
        Header: "Status",
        accessor: "description",
        disableFilters: true,
        Cell : (props) => <CommonStatus status={props.value}/>
      },
      {
        Header: "Payment",
        accessor: "payment",
        disableFilters: true,
      },
      {
        Header: "Booked By",
        accessor: "name",
        disableFilters: true,
      },
      {
        Header: "PO",
        accessor: "job_id",
        disableFilters: true,
      },
      {
        Header: "",
        id: "edit-id",
        Cell: ({ rows }) => (
          <span
            onClick={(e) => handleButtonClick(e, rows)}
            style={{ padding: "0px", cursor: "pointer" }}
          >
            ooo
          </span>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <TableContainer columns={columns} data={jobsTableData} name={"jobs"}/>
    </div>
  );
};

export default JobsTable;
