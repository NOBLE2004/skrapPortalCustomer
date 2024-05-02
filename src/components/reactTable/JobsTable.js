import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "./TableContainer";
import { SelectColumnFilter } from "./filters";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import {
  Box,
  Button,
  Divider,
  Drawer,
  LinearProgress,
  Menu,
  MenuItem,
  Tab,
  Typography,
} from "@mui/material";
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
import ImageIcon from "@mui/icons-material/Image";
import {
  Close,
  LineWeightOutlined,
  LocationCityOutlined,
  LocationSearchingOutlined,
  SocialDistanceOutlined,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const JobsTable = ({
  data,
  pagination,
  handleUpdateJobs,
  handlePagination,
  limit,
  setLimit,
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
  const [showDrawer, setShowDrawer] = useState({ show: false });

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
  const currency = localStorage.getItem("currency");
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
    setJobId(props.job_id);
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

  useEffect(async () => {
    const userdata = await getUserDataFromLocalStorage();
    setUser(userdata.personal_detail);
    setUserData(userdata);
  }, []);
  console.log(userData?.company?.includes("Amazon"));
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
        accessor: "job_time",
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
      // {
      //   Header: "Site Contact",
      //   accessor: (d) =>
      //     d.site_contact_number !== null
      //       ? d.site_contact_number
      //       : d.mobile_number,
      //   id: "site contact",
      //   disableFilters: true,
      // },
      {
        Header: "Service",
        accessor: "service_name",
        disableFilters: true,
        Cell: (cell) => {
          return (
            <span>
              {cell.value}
              <br />
              {(cell.row.original.parent_id == 2 ||
                cell.row.original.parent_id == 602 ||
                cell.row.original.parent_id == 101) && (
                <span style={{ color: "red" }}>
                  {cell.row.original.exchanged_by > 0 && `Exchange`}
                </span>
              )}
              {cell.row.original.parent_id != 2 && (
                <span style={{ color: "red" }}>
                  {cell.row.original.extended_job_id > 0 && `Extension`}
                </span>
              )}
            </span>
          );
        },
      },
      {
        Header: "Address",
        accessor: "job_address",
        disableSortBy: true,
        disableFilters: true,
        maxWidth: 400,
        minWidth: 160,
      },
      {
        Header: "Cost",
        accessor: "transaction_cost",
        disableSortBy: true,
        disableFilters: true,
        show: userData?.hide_price,
        filter: "equals",
        Cell: (props) => {
          return `${currency}${props.value.toFixed(2)}`;
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
        Header: "Lead Time",
        disableFilters: true,
        show: getUserDataFromLocalStorage()?.company?.includes("Amazon")
          ? 0
          : 1,
        Cell: (props) => {
          const regex = /-\d+/;
          const negativeValue = regex.test(props.cell.row.original?.lead_time);
          return (
            <>
              {props.cell.row.original?.lead_time
                ? `${negativeValue ? "" : props.cell.row.original?.lead_time}`
                : ""}
            </>
          );
        },
      },
      // {
      //   Header: "Reuse",
      //   disableFilters: true,
      //   show: getUserDataFromLocalStorage()?.company?.includes('Amazon') ? 0 : 1,
      //   Cell: (props) => {
      //     return (
      //         <>
      //           {props.cell.row.original?.reuse
      //               ? `${props.cell.row.original?.reuse}%`
      //               : ""}
      //         </>
      //     );
      //   },
      // },
      {
        Header: "Pallets",
        disableFilters: true,
        show: user.role_id == 13 || user.role_id == 12 ? 1 : 0,
        Cell: (props) => {
          return (
            <>
              {props.cell.row.original?.pallets
                ? `${Number(props.cell.row.original?.pallets).toFixed(2)}kg`
                : ""}
            </>
          );
        },
      },
      {
        Header: "Rebate",
        disableFilters: true,
        show: user.role_id == 13 || user.role_id == 12 ? 1 : 0,
        Cell: (props) => {
          return (
            <>
              {props.cell.row.original?.rebate
                ? `${currency}${Number(props.cell.row.original?.rebate).toFixed(
                    2
                  )}`
                : ""}
            </>
          );
        },
      },
      {
        Header: "Utilisation*",
        disableFilters: true,
        show: user.role_id == 13 || user.role_id == 12 ? 1 : 0,
        Cell: (props) => {
          return (
            <span
              style={{
                color:
                  props?.cell?.row?.original?.utilization >= 50
                    ? "#00B25D"
                    : "red",
              }}
            >
              {props?.cell?.row?.original?.utilization
                ? `${Number(
                    props?.cell?.row?.original?.utilization
                  ).toFixed()}%`
                : ""}
            </span>
          );
        },
      },
      {
        Header: "CO2",
        accessor: "order_job_status",
        disableFilters: true,
        Cell: (props) => {
          return (
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShowDrawer({ show: true });
                console.log("clicked");
              }}
            >
              {props.cell.row.original?.co2
                ? `${Number(props.cell.row.original?.co2).toFixed(2)}kg`
                : ""}
            </span>
          );
        },
      },
      {
        Header: "Weight",
        disableFilters: true,
        Cell: (props) => {
          return (
            <>
              {props?.cell?.row?.original?.weight > 0
                ? `${props?.cell?.row?.original?.weight}T`
                : ""}
            </>
          );
        },
      },
      {
        Header: "Image",
        accessor: "job_images_count",
        disableFilters: true,
        Cell: (props) => {
          return (
            props.value > 0 && (
              <ImageIcon
                onClick={(e) => handleIconClick(e, props?.row?.original)}
                sx={{ color: "#518ef8" }}
              />
            )
          );
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
        show:
          getUserDataFromLocalStorage()?.company?.includes("Amazon") &&
          currency == "$"
            ? 1
            : 0,
        id: "invoice",
        Cell: (props) => (
          <>
            {props.row.original.appointment_status == 3 ? (
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
        ),
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
    [userData, currency]
  );
  const handleExtend = () => {
    setExtends(true);
  };

  const [filterColumn, setFilterColumn] = useState(columns);

  const handleColumnClick = (column, index) => {
    const lastIndex = filterColumn[filterColumn?.length - 1];
    filterColumn.pop();
    const duplicate = { ...column };
    duplicate.show = 1;
    if (filterColumn?.find((x, index) => x.Header == column?.Header)) {
      const filter = filterColumn?.filter(
        (row) => row?.Header != column?.Header
      );
      filter.push(lastIndex);
      setFilterColumn(filter);
    } else {
      const newFormValues = [...filterColumn];
      newFormValues.splice(index, 0, column);
      newFormValues.push(lastIndex);
      setFilterColumn(newFormValues);
    }
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <div
            style={{
              margin: "10px 0px",
            }}
          >
            {/*{columns?.map((single, index) => {*/}
            {/*  if (single?.Header != "") {*/}
            {/*    return (*/}
            {/*      <Button*/}
            {/*        variant="contained"*/}
            {/*        style={{*/}
            {/*          marginRight: "8px",*/}
            {/*          background: filterColumn?.find(*/}
            {/*            (row) => row?.Header == single?.Header*/}
            {/*          )*/}
            {/*            ? "#518ef8"*/}
            {/*            : "#84878c",*/}
            {/*        }}*/}
            {/*        onClick={() => {*/}
            {/*          handleColumnClick(single, index);*/}
            {/*        }}*/}
            {/*      >*/}
            {/*        {single?.Header}*/}
            {/*      </Button>*/}
            {/*    );*/}
            {/*  }*/}
            {/*})}*/}
          </div>
          <TableContainer
            columns={filterColumn ? filterColumn : columns}
            data={data}
            name={"jobs"}
            className="-striped -highlight"
          />
          <Pagination
            limit={limit}
            setLimit={setLimit}
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
            {(row.appointment_status === 4 || userData.account_type == 3) &&
              (row.parent_id == 2 || row.parent_id == 602) && (
                <MenuItem onClick={handleShowExchangeDialog}>Exchange</MenuItem>
              )}
            {row.service_id === 44 && row.appointment_status === 4 && (
              <MenuItem onClick={handleExtend}>Extend</MenuItem>
            )}
            <MenuItem onClick={handlereorder1}>Reorder</MenuItem>
            {(row.appointment_status === 4 || userData.account_type == 3) &&
              (row.parent_id == 2 || row.parent_id == 602) && (
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
      <Drawer
        anchor={"right"}
        open={showDrawer.show}
        sx={{
          "& .MuiPaper-root": {
            width: "450px",
            borderRadius: "0px",
          },
        }}
        onClose={() => setShowDrawer({ show: false })}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px",
              borderBottom: "1px solid #8080803b",
            }}
            gap={2}
          >
            <Typography variant="subtitle1">Title</Typography>
            <Close />
          </Box>
          <Box sx={{ padding: "12px" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: "600", mb: 1 }}>
              Overview
            </Typography>
            <Box
              sx={{
                padding: "12px",
                border: "1px solid #8080803b",
                borderRadius: "8px",
              }}
            >
              <Typography variant="caption">ID: 1563</Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "600", mt: 1, lineHeight: "2rem" }}
              >
                <span
                  style={{
                    background: "#80008026",
                    padding: "4px 6px",
                    borderRadius: "4px",
                  }}
                >
                  0.43 kg co2
                </span>{" "}
                from{" "}
                <span
                  style={{
                    background: "#80008026",
                    padding: "4px 6px",
                    borderRadius: "4px",
                  }}
                >
                  2.89 t-km
                </span>{" "}
                of activity with the emissions intensity of{" "}
                <span
                  style={{
                    background: "#80008026",
                    padding: "4px 6px",
                    borderRadius: "4px",
                  }}
                >
                  0.14 kg co2e/t-km
                </span>
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                  Lifecycle analysis
                </Typography>
                <Box sx={{ mt: 1, display: "flex", gap: 6 }}>
                  <Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                      <div
                        style={{
                          background: "#1976d2",
                          width: "10px",
                          height: "10px",
                          borderRadius: "2px",
                        }}
                      ></div>
                      <Typography variant="caption">Well to tank</Typography>
                    </Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "600", mt: 0.5, lineHeight: "2rem" }}
                    >
                      0.38 kg
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Box>
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <div
                          style={{
                            background: "#a7caed",
                            width: "10px",
                            height: "10px",
                            borderRadius: "2px",
                          }}
                        ></div>
                        <Typography variant="caption">Tank to wheel</Typography>
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "600", mt: 0.5, lineHeight: "2rem" }}
                      >
                        0.38 kg
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{
                    height: "24px",
                    borderRadius: "4px",
                  }}
                />
              </Box>

              <Divider
                sx={{ background: "#8080803b", height: "unset", my: 2 }}
              />
              <Box>
                <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                  Details
                </Typography>
                <Divider
                  sx={{ background: "#8080803b", height: "unset", my: 2 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ lineHeight: "unset", display: "flex" }}
                  >
                    <LocationSearchingOutlined sx={{ mr: 1 }} fontSize="14px" />{" "}
                    Distance
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                    9.64 km
                  </Typography>
                </Box>
                <Divider
                  sx={{ background: "#8080803b", height: "unset", my: 2 }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ lineHeight: "unset", display: "flex" }}
                  >
                    <LineWeightOutlined sx={{ mr: 1 }} fontSize="14px" /> Weight
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }} variant="subtitle2">
                    300 kg
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ width: "100%", typography: "subtitle2", mt: 2 }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab
                      sx={{ fontSize: "12px", fontWeight: 600 }}
                      label="Details"
                      value="1"
                    />
                    <Tab
                      label="Emission"
                      value="2"
                      sx={{ fontSize: "12px", fontWeight: 600 }}
                    />
                    <Tab
                      label="Clarity"
                      value="3"
                      sx={{ fontSize: "12px", fontWeight: 600 }}
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">Details</TabPanel>
                <TabPanel value="2">Emission</TabPanel>
                <TabPanel value="3">Clearity</TabPanel>
              </TabContext>
            </Box>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default JobsTable;
