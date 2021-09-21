import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../reactTable/TableContainer";
import { SelectColumnFilter } from "../../reactTable/filters";
import CommonStatus from "../../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@material-ui/core";
import "../../reactTable/jobs-react-table.scss";
import { payment, status } from "../../../services/utils";

const SiteManagerTable = ({ managerData }) => {
  console.log('site data' , managerData)
  const [state, setState] = useState({
    openMenu: false,
    mouseX: null,
    mouseY: null,
    contextRow: null,
  });
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    setJobs(managerData?.jobs?.data);
  }, []);
  const { openMenu, mouseX, mouseY, contextRow } = state;

  const handleButtonClick = (e, props) => {
    e.stopPropagation();
    setState({
      ...state,
      openMenu: true,
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
  };
  const handleClose = () => {
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
        Cell: (props) => `SK${props.value}`,
      },
      {
        Header: "Booked",
        accessor: "job_date",
        disableFilters: true,
        Cell: (props) => new Date(props.value).toLocaleDateString(),
      },
      {
        Header: "Delivery Date",
        accessor: "job_start_time",
        disableFilters: true,
        Cell: (props) => new Date(props.value).toLocaleString(),
      },
      {
        Header: "Site Contact",
        accessor: (d) =>
          d.site_contact_number !== null
            ? d.site_contact_number
            : d.mobile_number,
        id: "site contact",
        disableFilters: true,
        Cell: props => {
          return (<span>{props.value || 'n/a' }</span>); 
        },
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
        accessor: "booked_by",
        disableFilters: true,
        Cell: props => {
          return (<span>{props.value || 'n/a' }</span>); 
        },
      },
      {
        Header: "PO",
        accessor: "purchase_order",
        disableFilters: true,
        Cell: props => {
          return (<span>{props.value || 'n/a' }</span>); 
        },
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
  console.log("job", jobs);
  return (
    <div>
      <TableContainer columns={columns} data={jobs} name={"jobs"} />
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

export default SiteManagerTable;
