import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../reactTable/TableContainer";
import { SelectColumnFilter } from "../../reactTable/filters";
import CommonStatus from "../../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@material-ui/core";
import Pagination from "../../reactTable/pagination";
import "../../reactTable/jobs-react-table.scss";
import { payment, status } from "../../../services/utils";
import TrackDriverModal from "../../modals/trackDriver/TrackDriverModal";
import JobService from "../../../services/job.service";
import LoadingModal from "../../modals/LoadingModal/LoadingModal";
import CreateExchange from "../../modals/createExchange/CreateExchange";
import RequestCollection from "../../modals/requestCollection/RequestCollection";
import ExtendModal from "../../modals/extendModal/ExtendModal";

const SiteManagerTable = ({
  managerData,
  pagination,
  handlePagination,
  siteDetail,
  reload,
}) => {
  const [row, setRow] = useState({});
  const [reorder, setReorder] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [exchange, setExchange] = useState(false);
  const [collection, setCollection] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [notice, setNotice] = React.useState(null);
  const [isTrackDriver, setTrackDriver] = useState(false);
  const [extend, setExtends] = useState(false);
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
    setRow(props);
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

  const handleTrackDriver = () => {
    setTrackDriver(true);
    handleClose();
  };

  const handlereorder1 = () => {
    setReorder(true);
    setAnchorEl(null);
  };

  const handleShowExchangeDialog = () => {
    setExchange(true);
    handleClose();
  };
  const handleShowCollectionDialog = () => {
    setCollection(true);
    handleClose();
  };

  const handleReorderResponse = (id) => {
    JobService.copy({ job_id: id, payment_type: row.payment_type })
      .then((response) => {
        setNotice({
          type: "success",
          text: "Job Successfully reorder",
        });
        setTimeout(() => {
          reload();
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

  const sitesDetailColumns = useMemo(
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
        Cell: (props) => {
          return props.value;
        },
      },
      {
        Header: "Delivery Date",
        accessor: "job_start_time",
        disableFilters: true,
        Cell: (props) => new Date(props.value).toLocaleString(),
      },
      {
        Header: "Service",
        accessor: "service_name",
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
        Header: "Ewc Code",
        accessor: "ewc_code",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "PO",
        accessor: "purchase_order",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "",
        id: "ticket",
        Cell: (props) => (
          <span
            className="normal-dsans-10-primary"
            style={{ color: "lightgrey" }}
            onClick={(e) => e.stopPropagation()}
          >
            Ticket
          </span>
        ),
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
        Cell: (props) => {
          return props.value;
        },
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
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
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
        Cell: (props) => <CommonStatus status={props.value} />,
      },
      {
        Header: "Payment",
        accessor: "payment_type",
        disableFilters: true,
      },
      {
        Header: "Booked By",
        accessor: "booked_by",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "PO",
        accessor: "purchase_order",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
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
  const handleExtend = () => {
    setExtends(true);
  };
  return (
    <div className={"main-jobs-table"}>
      {exchange && (
        <CreateExchange
          closeModal={() => setExchange(!exchange)}
          updateJobs={reload}
          row={row}
          isfromJob={false}
        />
      )}
      {collection && (
        <RequestCollection
          closeModal={() => setCollection(!collection)}
          updateJobs={reload}
          row={row}
          isfromJob={false}
        />
      )}
      {reorder && (
        <LoadingModal
          handleClose={() => setReorder(false)}
          show={reorder}
          handleRes={() => handleReorderResponse(row.job_id)}
          noticeData={notice}
          isLoading={isLoading}
        ></LoadingModal>
      )}
      {extend && (
        <ExtendModal
          row={row}
          closeModal={() => setExtends(false)}
          updateJobs={reload}
        />
      )}
      <TableContainer
        columns={siteDetail ? sitesDetailColumns : columns}
        data={jobs}
        // name={"jobs"}
      />
      <div className="site-pagination">
        <Pagination
          last={pagination?.last_page}
          current={pagination?.current_page}
          from={pagination?.from}
          to={pagination?.to}
          total={pagination?.total}
          handleNext={(page) => {
            handlePagination(page);
          }}
          handlePrevious={(page) => {
            handlePagination(page);
          }}
        />
      </div>
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
        {row.parent_id === 2 && row.appointment_status === 4 && (
          <MenuItem onClick={handleShowExchangeDialog}>Exchange</MenuItem>
        )}
        {row.parent_id === 43 &&
          row.service_id === 44 &&
          row.appointment_status === 4 && (
            <MenuItem onClick={handleExtend}>Extend</MenuItem>
          )}
        <MenuItem onClick={handlereorder1}>Reorder</MenuItem>
        {((row.parent_id === 2 && row.appointment_status === 4) ||
          (row.parent_id === 43 &&
            row.service_id === 44 &&
            row.appointment_status === 4)) && (
          <MenuItem onClick={handleShowCollectionDialog}>Collection</MenuItem>
        )}
        <MenuItem onClick={handleTrackDriver}>Track Driver</MenuItem>
      </Menu>{" "}
      {isTrackDriver && (
        <TrackDriverModal
          handleClose={() => setTrackDriver(false)}
          trackData={row}
        />
      )}
    </div>
  );
};

export default SiteManagerTable;
