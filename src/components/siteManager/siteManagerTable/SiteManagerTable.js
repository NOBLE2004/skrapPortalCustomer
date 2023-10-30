import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../reactTable/TableContainer";
import { SelectColumnFilter } from "../../reactTable/filters";
import CommonStatus from "../../commonComponent/commonStatus/CommonStatus";
import { Menu, MenuItem } from "@mui/material";
import Pagination from "../../reactTable/pagination";
import "../../reactTable/jobs-react-table.scss";
import {
  getUserDataFromLocalStorage,
  payment,
  status,
} from "../../../services/utils";
 
import TrackDriverModal from "../../modals/trackDriver/TrackDriverModal";
import JobService from "../../../services/job.service";
import LoadingModal from "../../modals/LoadingModal/LoadingModal";
import CreateExchange from "../../modals/createExchange/CreateExchange";
import RequestCollection from "../../modals/requestCollection/RequestCollection";
import ExtendModal from "../../modals/extendModal/ExtendModal";
import { downloadSite } from "../../../assets/images";
import ImageIcon from '@mui/icons-material/Image';
import ViewJobDocumentsModal from "../../modals/ViewJobDocumentsModal/ViewJobDocumentsModal";

const SiteManagerTable = ({
  managerData,
  pagination,
  handlePagination,
  siteDetail,
  reload, limit, setLimit
}) => {
  const [row, setRow] = useState({});
  const [reorder, setReorder] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [exchange, setExchange] = useState(false);
  const [collection, setCollection] = useState(false);
  const [userData, setUserData] = useState({});

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
    const currency = localStorage.getItem("currency");
  const [isViewDocument, setViewDocument] = useState(false);
  const [jobId, setJobId] = React.useState(null);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    setJobs(pagination?.data);
    const user = getUserDataFromLocalStorage();
    setUserData(user);
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
    props.postcode = managerData.address.postcode;
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
    const toDataURL = (url) => {
        return fetch(url)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                return URL.createObjectURL(blob);
            });
    };
    const handleShowReport = async (e, url) => {
        e.stopPropagation();
        var element = document.createElement("a");
        element.href = await toDataURL(url);
        element.download = url.substring(url.lastIndexOf("/") + 1, url.length);
        element.click();
        handleClose();
    };
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

  const handleIconClick = (e, props) => {
    e.stopPropagation();
    setJobId(props.job_id)
    setViewDocument(true);
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
            Cell: (cell) => {
                return <span>
            {cell.value}<br />
                    {(cell.row.original.parent_id == 2 || cell.row.original.parent_id == 602 || cell.row.original.parent_id == 101) && <span style={{color: 'red'}}>{cell.row.original.exchanged_by > 0 && `Exchange`}</span>}
                    {cell.row.original.parent_id != 2 && <span style={{color: 'red'}}>{cell.row.original.extended_job_id > 0 && `Extension`}</span>}
          </span>
            }
        },,

      {
        Header: "Cost",
        accessor: "transaction_cost",
        disableSortBy: true,
        show: userData?.hide_price,
        disableFilters: true,
        filter: "equals",
        Cell: (props) => {
          return `${currency}${props?.value}`;
        },
      },
      {
        Header: "Status",
        accessor: "appointment_status",
        disableFilters: true,
          Cell: (cell) => {
              return (
                  <CommonStatus
                      status={status(cell.value)}
                  />
              );
          },
      },
      // {
      //   Header: "Ewc Code",
      //   accessor: "ewc_code",
      //   disableFilters: true,
      //   Cell: (props) => {
      //     return <span>{props.value || "n/a"}</span>;
      //   },
      // },
        {
            Header: "Lead Time",
            disableFilters: true,
            show: userData?.company?.includes('Amazon') ? 0 : 1,
            Cell: (props) => {
                return (
                    <>
                        {props.cell.row.original?.lead_time
                            ? `${props.cell.row.original?.lead_time}`
                            : ""}
                    </>
                );
            },
        },
        {
            Header: "Reuse",
            disableFilters: true,
            show: userData?.company?.includes('Amazon') ? 0 : 1,
            Cell: (props) => {
                return (
                    <>
                        {props.cell.row.original?.reuse
                            ? `${props.cell.row.original?.reuse}%`
                            : ""}
                    </>
                );
            },
        },
        {
            Header: "Pallets",
            show: (userData.role_id == 13 || userData.role_id == 12) ? 1 : 0,
            disableFilters: true,
            Cell: (props) => {
                return <>{props.cell.row.original?.pallets  ?`${Number(props.cell.row.original?.pallets).toFixed(2)}kg`
                    : ''}</>;
            },
        },
        {
            Header: "Rebate",
            show: (userData.role_id == 13 || userData.role_id == 12) ? 1 : 0,
            disableFilters: true,
            Cell: (props) => {
                return <>{props.cell.row.original?.rebate  ?`${currency}${Number(props.cell.row.original?.rebate).toFixed(2)}`
                    : ''}</>;
            },
        },
      {
        Header: "Utilisation",
          show: (userData.role_id == 13 || userData.role_id == 12) ? 1 : 0,
        disableFilters: true,
        Cell: (props) => {
          return <span style={{color: props?.cell?.row?.original?.utilization >= 50 ? '#00B25D' : 'red'}}>{
               props?.cell?.row?.original?.utilization ?`${Number(props?.cell?.row?.original?.utilization)?.toFixed()}%` : ''
          }</span>;
        },
      },
      {
        Header: "CO2",
        accessor: "order_job_status",
        disableFilters: true,
        Cell: (props) => {
          return <>{props.cell.row.original?.co2  ?`${Number(props.cell.row.original?.co2).toFixed(2)}kg`
             : ''}</>;
        },
      },
      {
        Header: "Weight",
        disableFilters: true,
        Cell: (props) => {
          return <>{props?.cell?.row?.original?.weight > 0 ?`${props?.cell?.row?.original?.weight}T`  : ''}</>;
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
      //   Header: "PO",
      //   accessor: "purchase_order",
      //   disableFilters: true,
      //   Cell: (props) => {
      //     return <span>{props.value || "n/a"}</span>;
      //   },
      // },
      {
        Header: "Invoice",
        accessor: "job_id",
          show: userData?.company?.includes('Amazon') ? 1 : 0,
        id: "invoice",
        Cell: (props) => {
          return props?.row?.original?.appointment_status == 3 ? (
            <>
           
              {/* {userData?.country_currency?.country_code === "+49" &&
              props.cell.row.original.appointment.appointment_status===3 ? ( */}
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
              {/* ) : (
                ""
              )} */}
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
                    {(props.value !== "" && props.value !== null) ? (
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
    [userData]
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
            Cell: (cell) => {
                return <span>
            {cell.row.original.service.service_name}<br />
                    {(cell.row.original.parent_id == 2 || cell.row.original.parent_id == 602 || cell.row.original.parent_id == 101) && <span style={{color: 'red'}}>{cell.row.original.exchanged_by > 0 && `Exchange`}</span>}
                    {cell.row.original.service.parent_id != 2 && <span style={{color: 'red'}}>{cell.row.original.extended_job_id > 0 && `Extension`}</span>}
          </span>
            }
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
        show: userData?.hide_price,
        disableFilters: true,
        filter: "equals",
        Cell: (props) => {
          return `${currency}${props?.value}`;
        },
      },
      {
        Header: "Status",
        accessor: "appointment_status",
        disableFilters: true,
          Cell: (props) => {
              return (
                  <CommonStatus
                      status={status(props?.row?.original?.appointment?.appointment_status)}
                  />
              );
          },
      },
      // {
      //   Header: "Payment",
      //   accessor: "payment_type",
      //   disableFilters: true,
      // },
      // {
      //   Header: "Booked By",
      //   accessor: "booked_by",
      //   disableFilters: true,
      //   Cell: (props) => {
      //     return <span>{props.value || "n/a"}</span>;
      //   },
      // },
      // {
      //   Header: "PO",
      //   accessor: "purchase_order",
      //   disableFilters: true,
      //   Cell: (props) => {
      //     return <span>{props.value || "n/a"}</span>;
      //   },
      // },
      //   {
      //       Header: "Utilisation rating",
      //       disableFilters: true,
      //       show: userData?.country_currency?.country_code === "+49" ? 0 : 1,
      //       Cell: (props) => {
      //           return <span>{props.row.original.appointment_status == 'Completed' ? '6/10' : '--'}</span>;
      //       },
      //   },
        {
            Header: "Lead Time",
            disableFilters: true,
            show: userData?.company?.includes('Amazon') ? 0 : 1,
            Cell: (props) => {
                return (
                    <>
                        {props.cell.row.original?.lead_time
                            ? `${props.cell.row.original?.lead_time}`
                            : ""}
                    </>
                );
            },
        },
        {
            Header: "Reuse",
            disableFilters: true,
            show: userData?.company?.includes('Amazon') ? 0 : 1,
            Cell: (props) => {
                return (
                    <>
                        {props.cell.row.original?.reuse
                            ? `${props.cell.row.original?.reuse}%`
                            : ""}
                    </>
                );
            },
        },
        {
            Header: "Pallets",
            show: (userData.role_id == 13 || userData.role_id == 12) ? 1 : 0,
            disableFilters: true,
            Cell: (props) => {
                return <>{props.cell.row.original?.pallets  ?`${Number(props.cell.row.original?.pallets).toFixed(2)}kg`
                    : ''}</>;
            },
        },
        {
            Header: "Rebate",
            show: (userData.role_id == 13 || userData.role_id == 12) ? 1 : 0,
            disableFilters: true,
            Cell: (props) => {
                return <>{props.cell.row.original?.rebate  ?`${currency}${Number(props.cell.row.original?.rebate).toFixed(2)}`
                    : ''}</>;
            },
        },
      {
        Header: "Utilisation",
          show: (userData.role_id == 13 || userData.role_id == 12) ? 1 : 0,
        disableFilters: true,
        Cell: (props) => {
          return <span style={{color: props?.cell?.row?.original?.utilization >= 50 ? '#00B25D' : 'red'}}>{
               props?.cell?.row?.original?.utilization ?`${Number(props?.cell?.row?.original?.utilization)?.toFixed()}%` : ''
          }</span>;
        },
      },
      {
        Header: "CO2",
        accessor: "order_job_status",
        disableFilters: true,
        Cell: (props) => {
          return <>{props.cell.row.original?.co2  ?`${Number(props.cell.row.original?.co2).toFixed(2)}kg`
             : ''}</>;
        },
      },
      {
        Header: "Weight",
        disableFilters: true,
        Cell: (props) => {
          return <>{props?.cell?.row?.original?.weight > 0 ?`${props?.cell?.row?.original?.weight}T`  : ''}</>;
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
      //   Header: "PO",
      //   accessor: "purchase_order",
      //   disableFilters: true,
      //   Cell: (props) => {
      //     return <span>{props.value || "n/a"}</span>;
      //   },
      // },
      {
        Header: "Invoice",
        accessor: "job_id",
          show: userData?.company?.includes('Amazon') ? 1 : 0,
        id: "invoice",
        Cell: (props) => {
           return props?.row?.original?.appointment?.appointment_status == 3 ? (
            <>
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
              {/* ) : (
                ""
              )} */}
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
                    {(props.value !== "" && props.value !== null) ? (
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
    [userData]
  );
  const handleExtend = () => {
    setExtends(true);
  };

  return (
    <div className={jobs && jobs.length > 0 ? "w-100" : "main-jobs-table"}>
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
      {isViewDocument && (
            <ViewJobDocumentsModal
              handleClose={() => setViewDocument(false)}
              jobId={jobId}
            />
          )}
      <TableContainer
        columns={siteDetail ? sitesDetailColumns : columns}
        data={jobs}
         name={"jobs"}
      />
      <div className="site-pagination">
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
        {((row.appointment_status === 4 || userData.account_type == 3) && (row.parent_id == 2 || row.parent_id == 602)) && (
          <MenuItem onClick={handleShowExchangeDialog}>Exchange</MenuItem>
        )}
        {row.service_id === 43 && row.appointment_status === 4 && (
          <MenuItem onClick={handleExtend}>Extend</MenuItem>
        )}
        <MenuItem onClick={handlereorder1}>Reorder</MenuItem>
        {((row.appointment_status === 4 || userData.account_type == 3) && (row.parent_id == 2 || row.parent_id == 602)) && (
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
