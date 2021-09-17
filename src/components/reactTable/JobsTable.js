import React, {useEffect, useMemo, useState} from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@material-ui/core";
import "./jobs-react-table.scss";
import { payment, status } from "../../services/utils";

const JobsTable = ({data}) => {
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

  const columns = useMemo(
    () => [
      {
        Header: "Order #",
        accessor: "job_id",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
          Cell: (props) => `SK${props.value}`
      },
      {
        Header: "Booked",
        accessor: "save_date",
        disableFilters: true,
          Cell: (props) => new Date(props.value).toLocaleDateString()
      },
      {
        Header: "Delivery Date",
        accessor: "job_start_time",
        disableFilters: true,
          Cell: (props) => new Date(props.value).toLocaleString().substring(0, 17),
      },
      {
        Header: "Site Contact",
          accessor: d => d.site_contact_number !== null ? d.site_contact_number : d.mobile_number,
          id: 'site contact',
        disableFilters: true,
      },
      {
        Header: "Service",
        accessor: "service_name",
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
        accessor: "transaction_cost",
        disableSortBy: true,
        disableFilters: true,
        filter: "equals",
      },
      {
        Header: "Status",
        accessor: "appointment_status",
        disableFilters: true,
        Cell: (props) => <CommonStatus status={status(props.value)} />,
      },
      {
        Header: "Payment",
        accessor: "payment_type",
        disableFilters: true,
          Cell: (props) => {
              return payment(props.value);
          },
      },
      {
        Header: "Booked By",
        accessor: "booked_by_name",
        disableFilters: true,
      },
      {
        Header: "PO",
        accessor: "purchase_order",
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
        data={data}
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
