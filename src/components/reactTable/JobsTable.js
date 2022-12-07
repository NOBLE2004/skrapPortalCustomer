import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@mui/material";
import "./jobs-react-table.scss";
import { payment, status } from "../../services/utils";
import CreateExchange from "../modals/createExchange/CreateExchange";
import RequestCollection from "../modals/requestCollection/RequestCollection";
import JobService from "../../services/job.service";
import LoadingModal from "../modals/LoadingModal/LoadingModal";
import Pagination from "./pagination";
import { downloadSite } from "../../assets/images";
import FadeLoader from "react-spinners/FadeLoader";
import TrackDriverModal from "../modals/trackDriver/TrackDriverModal";
import AcceptJobModal from "../modals/acceptJobModal/AcceptJobModal";
import RejectJobModal from "../modals/rejectJobModal/RejectJobModal";
import JobReorderModal from "../modals/reorderModal/JobReorderModal";
import ExtendModal from "../modals/extendModal/ExtendModal";
import { getUserDataFromLocalStorage } from "../../services/utils";
import ViewJobDocumentsModal from "../modals/ViewJobDocumentsModal/ViewJobDocumentsModal";
import ImageIcon from '@mui/icons-material/Image';


const JobsTable = ({
  data,
  pagination,
  handleUpdateJobs,
  handlePagination,
}) => {
  const [state, setState] = useState({
    openMenu: false,
    mouseX: null,
    mouseY: null,
    contextRow: null,
  });

  const [jobIds, setJobIds] = useState([]);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [exchange, setExchange] = useState(false);
  const [collection, setCollection] = useState(false);
  const [isJobAccepted, setIsJobAccepted] = useState(false);
  const [isJobRejected, setIsJobRejected] = useState(false);
  const [jobData, setJobData] = useState({});

  const { openMenu, mouseX, mouseY, contextRow } = state;
  const [row, setRow] = useState({});
  const [reorder, setReorder] = useState(false);
  const [extend, setExtends] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setLoading] = useState(false);
  const [notice, setNotice] = React.useState(null);
  const [isTrackDriver, setTrackDriver] = useState(false);
  const [rowData, setRowDate] = useState("");
  const [isViewDocument, setViewDocument] = useState(false);
  const [jobId, setJobId] = React.useState(null);
  const handleButtonClick = (e, props) => {
    e.stopPropagation();
    // if (contextRow === null) {
    setState({
      ...state,
      openMenu: true,
      mouseX: e.clientX - 2,
      mouseY: e.clientY - 4,
    });
    // }
    setRowDate(props);
    setRow(props);
  };
  const handleIconClick = (e, props) => {
    e.stopPropagation();
    setJobId(props.job_id)
    setViewDocument(true);
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
  const handleShowExchangeDialog = () => {
    setExchange(true);
    handleClose();
  };
  const handleShowCollectionDialog = () => {
    setCollection(true);
    handleClose();
  };
  const handlereorder1 = () => {
    setReorder(true);
    setAnchorEl(null);
  };
  const toDataURL = (url) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };
  const handleReject = (e, data) => {
    e.stopPropagation();
    setJobData(data);
    setIsJobRejected(true);
  };
  const handleAccept = (e, data) => {
    e.stopPropagation();
    setJobData(data);
    setIsJobAccepted(true);
  };
  const handleShowReport = async (e, url) => {
    e.stopPropagation();
    var element = document.createElement("a");
    element.href = await toDataURL(url);
    element.download = url.substring(url.lastIndexOf("/") + 1, url.length);
    element.click();
    handleClose();
  };

  const handleViewJobDocuments = (event, row) => {
    setJobId(row.job_id);
    setViewDocument(true);
  };

  useEffect(() => {
    const userdata = getUserDataFromLocalStorage();
    setUser(userdata.personal_detail);
    setUserData(userdata);
  }, []);
  // const handleInvoice = () => {
  //   if (jobIds.length > 0) {
  //     JobService.xeroInvoice({ jobs: jobIds })
  //       .then((response) => {
  //         if (response.data.status === 0) {
  //           window.open(response.data?.url);
  //         } else {
  //           Swal.fire("Info!", response.data.message, "info");
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };
  const downloadInvoice = (e, job_id) => {
    e.stopPropagation();
    setLoading(true);
    JobService.invoice({ job_id })
      .then((response) => {
        if (response.data?.code === 0) {
          handleShowReport(e, response.data?.result?.Url);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleReorderResponse = (id) => {
    JobService.copy({ job_id: id, payment_type: row.payment_type })
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
  const selectJob = (event, job_id) => {
    const ids = jobIds;
    if (event.target.checked === true) {
      ids.push(job_id);
      setJobIds();
    } else {
      const index = ids.indexOf(job_id);
      ids.splice(index, 1);
    }
    setJobIds(ids);
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
        accessor: "save_date",
        disableFilters: true,
        Cell: (props) => new Date(props.value).toLocaleDateString(),
      },
      {
        Header: "Delivery Date",
        accessor: "job_start_time",
        disableFilters: true,
        Cell: (props) =>
          new Date(props.value).toLocaleString().substring(0, 17),
      },
      {
        Header: "Site Contact",
        accessor: (d) =>
          d.site_contact_number !== null
            ? d.site_contact_number
            : d.mobile_number,
        id: "site contact",
        disableFilters: true,
      },
      {
        Header: "Service",
        accessor: "service_name",
        disableFilters: true,
        // Cell: (cell) => {
        //   return <span>
        //     {cell.value} <br />
        //     {cell.row.original.exchanged_by && `Exchange by (${cell.row.original.exchanged_by})` }
        //   </span>
        // }
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
        show: userData?.hide_price,
        filter: "equals",
        Cell: (props) => {
          return `${
            userData?.country_currency?.currency_symbol
              ? userData?.country_currency?.currency_symbol
              : "£"
          }${props.value.toFixed(2)}`;
        },
      },
      {
        Header: "Status",
        accessor: "appointment_status",
        id: "status",
        disableFilters: true,
        Cell: (cell) => {
          return (
              <CommonStatus
                status={status(
                  cell.row.original.order_job_status === 1 &&
                    (localStorage.getItem("role_id") == 12 ||
                      localStorage.getItem("role_id") == 13 ||
                      localStorage.getItem("role_id") == 4)
                    ? 14
                    : cell.value
                )}
              />
          );
        },
      },
      {
        Header: "Utilisation",
        disableFilters: true,
        show: userData?.country_currency?.country_code === "+49" ? 0 : 1,
        Cell: (props) => {
          return <span>{
               props?.cell?.row?.original?.utilization ?`${Number(props?.cell?.row?.original?.utilization).toFixed()}%` : ''
          }</span>;
        },
      },
      {
        Header: "CO2",
        accessor: "order_job_status",
        disableFilters: true,
        show: userData?.country_currency?.country_code === "+49"? 0 : 1,
        Cell: (props) => {
          return <>{props.cell.row.original?.co2  ?`${props.cell.row.original?.co2}kg`
             : ''}</>;
        },
      },
      {
        Header: "Weight",
        disableFilters: true,
        show: userData?.country_currency?.country_code === "+49"? 0 : 1,
        Cell: (props) => {
          return <>{props?.cell?.row?.original?.weight?`${props?.cell?.row?.original?.weight}T`  : ''}</>;
        },
      },
      {
        Header: "Image",
        accessor: "job_images_count",
        disableFilters: true,
        Cell: (props) => {
          return props.value > 0 && <ImageIcon onClick={(e) => handleIconClick(e, props?.row?.original)} sx={{color: '#518ef8'}} />;
        },
      },

      // {
      //   Header: "Payment",
      //   accessor: "payment_type",
      //   disableFilters: true,
      //   Cell: (props) => {
      //     return payment(props.value);
      //   },
      // },
      // {
      //   Header: "PO",
      //   accessor: "purchase_order",
      //   disableFilters: true,
      //   Cell: (props) => {
      //     return props.value == null ? "---" : props.value;
      //   },
      // },
      {
        Header: "Invoice",
        accessor: "job_id",
        id: "invoice",
        Cell: (props) => {
          return props.row.original.appointment_status === 4 ||
            props.row.original.appointment_status == 3 ? (
            <>
              {userData?.country_currency?.country_code === "+49" &&
              props.cell.row.original.appointment_status===3 ? (
                <span
                  className="normal-dsans-10-primary"
                  onClick={(e) => downloadInvoice(e, props.value)}
                >
                  Invoice
                  <img
                    src={downloadSite}
                    alt="download-icon"
                    style={{ marginLeft: "5px" }}
                  />
                </span>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          );
        },
      },
      {
        Header: "Ticket",
        accessor: "waste_transfer_document",
        id: "ticket",
        Cell: (props) => (
          <>
            {props.value !== "" ? (
              <span
                className="normal-dsans-10-primary"
                onClick={(e) => handleShowReport(e, props.value)}
              >
                Ticket
                <img
                  src={downloadSite}
                  alt="download-icon"
                  style={{ marginLeft: "5px" }}
                />
              </span>
            ) : (
              <span
                className="normal-dsans-10-primary"
                style={{ color: "lightgrey" }}
                onClick={(e) => e.stopPropagation()}
              >
                Ticket
              </span>
            )}
          </>
        ),
      },
      {
        Header: "",
        id: "accept-id",
        Cell: (cell) => {
          return (
            <>
              {cell.row.original.order_job_status === 1 &&
              localStorage.getItem("role_id") != 12 ? (
                <div className="accept-reject">
                  <button
                    className="sites-header-btn"
                    onClick={(e) => handleAccept(e, cell?.row?.original)}
                  >
                    Accept
                  </button>
                  <button
                    className="sites-header-btn-error"
                    style={{ marginTop: "2px" }}
                    onClick={(e) => handleReject(e, cell?.row?.original)}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                ""
              )}
            </>
          );
        },
      },
      {
        Header: "",
        id: "id-edit",
        Cell: ({ cell }) => (
          <>
            <span
              onClick={(e) => handleButtonClick(e, cell?.row?.original)}
              style={{
                padding: "0px",
                cursor: "pointer",
                height: "30px",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                width: "100%",
              }}
              id="simple-menu"
            >
              ooo
            </span>
          </>
        ),
      },
      // {
      //   Header: "",
      //   id: "select",
      //   Cell: ({ cell }) => (
      //     <>
      //       <span
      //         onClick={(e) => e.stopPropagation()}
      //         style={{
      //           padding: "0px",
      //           cursor: "pointer",
      //           height: "30px",
      //           justifyContent: "center",
      //           display: "flex",
      //           alignItems: "center",
      //           width: "100%",
      //         }}
      //         className="normal-dsans-10-primary"
      //       >
      //         <input
      //           style={{ cursor: "pointer", width: "100%", height: "15px" }}
      //           onChange={(e) => selectJob(e, cell?.row?.original.job_id)}
      //           type="checkbox"
      //           id="job"
      //           name="job"
      //         />
      //       </span>
      //     </>
      //   ),
      // },
    ],
    [userData]
  );
  const handleExtend = () => {
    setExtends(true);
  };
  return (
    <div className={data && data.length > 0 ? "" : "main-jobs-table"}>
      {exchange && (
        <CreateExchange
          closeModal={() => setExchange(!exchange)}
          updateJobs={handleUpdateJobs}
          row={row}
          isfromJob={true}
        />
      )}
      {collection && (
        <RequestCollection
          closeModal={() => setCollection(!collection)}
          updateJobs={handleUpdateJobs}
          row={row}
          isfromJob={true}
        />
      )}
      {reorder && (
        // <LoadingModal
        //   handleClose={() => setReorder(false)}
        //   show={reorder}
        //   handleRes={() => handleReorderResponse(row.job_id)}
        //   noticeData={notice}
        //   isLoading={isLoading}
        // ></LoadingModal>
        <JobReorderModal
          closeModal={() => setReorder(!reorder)}
          updateJobs={handleUpdateJobs}
          row={row}
          isfromJob={true}
        />
      )}
      {isJobAccepted && (
        <AcceptJobModal
          jobdata={jobData}
          handleClose={() => setIsJobAccepted(false)}
        />
      )}
      {isJobRejected && (
        <RejectJobModal
          handleClose={() => setIsJobRejected(false)}
          jobdata={jobData}
        />
      )}
      {extend && (
        <ExtendModal
          row={row}
          closeModal={() => setExtends(false)}
          updateJobs={handleUpdateJobs}
        />
      )}
      {/* <div className="xero-btn">
        <button
          className="header-btn"
          onClick={() => handleInvoice()}
        >
          Create Xero Invoices
        </button>
      </div> */}
      {isLoading && (
        <div
          className="loader"
          style={{
            padding: "5%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            height: "100%",
          }}
        >
          <FadeLoader color={"#518ef8"} loading={isLoading} width={4} />
        </div>
      )}
      {data && data.length > 0 ? (
        <>
          <TableContainer
            columns={columns}
            data={data}
            name={"jobs"}
            className="-striped -highlight"
          />
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
            {row.appointment_status === 4 && (
              <MenuItem onClick={handleShowExchangeDialog}>Exchange</MenuItem>
            )}
            {row.service_id === 44 && row.appointment_status === 4 && (
              <MenuItem onClick={handleExtend}>Extend</MenuItem>
            )}
            <MenuItem onClick={handlereorder1}>Reorder</MenuItem>
            {(row.appointment_status === 4 ||
              (row.service_id === 44 && row.appointment_status === 4)) && (
              <MenuItem onClick={handleShowCollectionDialog}>
                Collection
              </MenuItem>
            )}
            {row?.waste_transfer_document != "" && (
              <MenuItem
                onClick={(e) =>
                  handleShowReport(e, row?.waste_transfer_document)
                }
              >
                Waste Report
              </MenuItem>
            )}
            <MenuItem onClick={handleTrackDriver}>Track Driver</MenuItem>
            {/*<MenuItem onClick={() => handleInvoice()}> Xero Invoice </MenuItem>*/}
            <MenuItem onClick={(e) => handleViewJobDocuments(e, row)}>
              View Documents
            </MenuItem>
          </Menu>{" "}
          {isTrackDriver && (
            <TrackDriverModal
              handleClose={() => setTrackDriver(false)}
              trackData={rowData}
            />
          )}
          {isViewDocument && (
            <ViewJobDocumentsModal
              handleClose={() => setViewDocument(false)}
              jobId={jobId}
            />
          )}
        </>
      ) : (
        <div className="jobs-not-found">
          {`You don’t have any active bookings.`}
        </div>
      )}
    </div>
  );
};

export default JobsTable;
