import React, { useMemo, useState } from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import { jobsTableData } from "../utlils/jobListing";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@material-ui/core";
import "./jobs-react-table.scss";

const JobsTable = () => {
  const [state, setState] = useState({
    openMenu: false,
    mouseX: null,
    mouseY: null,
    contextRow: null,
  });

  const { openMenu, mouseX, mouseY, contextRow } = state;

  const handleButtonClick = (e, props) => {
    e.stopPropagation();   
      // if (contextRow === null) {
        setState({...state,
          openMenu: true,
          mouseX: e.clientX - 2,
          mouseY: e.clientY - 4
        });
      // }
    
  };
  const handleClose = () => {
    console.log("close called");

    setState({
      ...state,
      openMenu: false,
      mouseX: null,
      mouseY: null,
      contextRow: null,
    });
  };

  const onRowClick = (state, rowInfo, column, instance) => {
    return {
      onClick: (e) => {
        console.log("A Td Element was clicked!");
        console.log("it produced this event:", e);
        console.log("It was in this column:", column);
        console.log("It was in this row:", rowInfo);
        console.log("It was in this table instance:", instance);
      },
    };
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
        Cell: (props) => <CommonStatus status={props.value} />,
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
        id: "id-edit",
        Cell: ({ cell }) => (
          <>
            <span
              onClick={(e) => handleButtonClick(e, cell?.row?.original)}
              style={{ padding: "0px", cursor: "pointer" }}
              id="simple-menu"
            >
              ooo
            </span>
          </>
        ),
      },
    ],
    []
  );
  return (
    <div>
      <TableContainer
        columns={columns}
        data={jobsTableData}
        name={"jobs"}
      />
      <Menu
        keepMounted
        className="job-table-menu"
        open={openMenu}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          mouseY !== null && mouseX !== null
            ? { top: mouseY, left: mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Exchange</MenuItem>
        <MenuItem onClick={handleClose}>Reorder</MenuItem>
        <MenuItem onClick={handleClose}>Collection</MenuItem>
        <MenuItem onClick={handleClose}>Waste Report</MenuItem>
        <MenuItem onClick={handleClose}>Track Driver</MenuItem>
      </Menu>{" "}
    </div>
  );
};

export default JobsTable;
