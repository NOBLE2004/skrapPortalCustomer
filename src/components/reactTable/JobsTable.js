import React, {useEffect, useMemo, useState} from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@material-ui/core";
import "./jobs-react-table.scss";
import { payment, status } from "../../services/utils";
import CreateJob from "../modals/createJob/CreateJob";
import CreateExchange from "../modals/createExchange/CreateExchange";

const JobsTable = ({data, handleUpdateJobs}) => {
  const [state, setState] = useState({
    openMenu: false,
    mouseX: null,
    mouseY: null,
    contextRow: null,
  });
  const [exchange, setExchange] = useState(false);
  const [updateJobs, setUpdateJobs] = useState();

  const { openMenu, mouseX, mouseY, contextRow } = state;
  const [row, setRow] = useState({});

  const handleButtonClick = (e, props) => {
    e.stopPropagation();   
      // if (contextRow === null) {
        setState({...state,
          openMenu: true,
          mouseX: e.clientX - 2,
          mouseY: e.clientY - 4
        });
      // }
      console.log(props);
    setRow(props);
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
  const handleShowExchangeDialog = () =>{
      setExchange(true);
      handleClose();
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
        {
            exchange && <CreateExchange
                closeModal={() => setExchange(!exchange)}
                updateJobs={handleUpdateJobs}
                row={row}
                isfromJob={true}
            />
        }
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
          {(row.parent_id === 2 && row.appointment_status === 4) && <MenuItem onClick={handleShowExchangeDialog}>Exchange</MenuItem>}
        <MenuItem onClick={handleClose}>Reorder</MenuItem>
        <MenuItem onClick={handleClose}>Collection</MenuItem>
        <MenuItem onClick={handleClose}>Waste Report</MenuItem>
        <MenuItem onClick={handleClose}>Track Driver</MenuItem>
      </Menu>{" "}
    </div>
  );
};

export default JobsTable;
