import React, {useEffect, useMemo, useState} from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@material-ui/core";
import "./jobs-react-table.scss";
import { payment, status } from "../../services/utils";
import CreateExchange from "../modals/createExchange/CreateExchange";
import RequestCollection from "../modals/requestCollection/RequestCollection";
import JobService from '../../services/job.service';
import LoadingModal from "../modals/LoadingModal/LoadingModal";
import Pagination from "./pagination";

const JobsTable = ({data, pagination, handleUpdateJobs, handlePagination}) => {
  const [state, setState] = useState({
    openMenu: false,
    mouseX: null,
    mouseY: null,
    contextRow: null,
  });
  const [exchange, setExchange] = useState(false);
  const [collection, setCollection] = useState(false);

  const { openMenu, mouseX, mouseY, contextRow } = state;
  const [row, setRow] = useState({});
  const [reorder, setReorder] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setLoading] = useState(false);
  const [notice, setNotice] = React.useState(null);

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
  const handleShowExchangeDialog = () =>{
      setExchange(true);
      handleClose();
  };
  const handleShowCollectionDialog = () =>{
      setCollection(true);
      handleClose();
  };
    const handlereorder1 = () => {
        setReorder(true);
        setAnchorEl(null);
    };

    const handleReorderResponse = (id) => {
        JobService.copy({ job_id: id })
            .then((response) => {
                setNotice({
                    type: "success",
                    text: "Job Successfully reorder",
                });
                setTimeout(() => {
                    handleUpdateJobs();
                    setReorder(false);
                }, 2000);
            })
            .catch((err) => {
                setLoading(false);
                setNotice({
                    type: "error",
                    text: "Job Reorder failed",
                });
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
          Cell: (props) => {
              return `£${props.value.toFixed(2)}`;
          },
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
          Cell: (props) => {
              return props.value == null ? 'Skrap' : props.value;
          },
      },
      {
        Header: "PO",
        accessor: "purchase_order",
        disableFilters: true,
          Cell: (props) => {
              return props.value == null ? '---' : props.value;
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
        {
            collection && <RequestCollection
                closeModal={() => setCollection(!collection)}
                updateJobs={handleUpdateJobs}
                row={row}
                isfromJob={true}
            />
        }
        {reorder && (
            <LoadingModal
                handleClose={() => setReorder(false)}
                show={reorder}
                handleRes={() => handleReorderResponse(row.job_id)}
                noticeData={notice}
                isLoading={isLoading}
            >
                Please wait while we reordring the data
            </LoadingModal>
        )}
      <TableContainer
        columns={columns}
        data={data}
        name={"jobs"}
      />
      <Pagination
          last={pagination.last_page}
          current={pagination.current_page}
          from={pagination.from}
          to={pagination.to}
          total={pagination.total}
          handleNext={(page)=>{handlePagination(page)}}
          handlePrevious={(page)=>{handlePagination(page)}}
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
          <MenuItem onClick={handlereorder1}>Reorder</MenuItem>
          {(row.parent_id === 2 && row.appointment_status === 4) && <MenuItem onClick={handleShowCollectionDialog}>Collection</MenuItem>}
        <MenuItem onClick={handleClose}>Waste Report</MenuItem>
        <MenuItem onClick={handleClose}>Track Driver</MenuItem>
      </Menu>{" "}
    </div>
  );
};

export default JobsTable;
