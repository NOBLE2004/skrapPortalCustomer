import React, { useMemo } from "react";
import { downloadSite } from "../../assets/images";
import TableContainer from "../reactTable/TableContainer";
import "../reactTable/jobs-react-table.scss";
import Pagination from "../reactTable/pagination";
import ReactTooltip from "react-tooltip";
import { DOWNLOAD_URL } from "../../environment";
import { Box } from "@mui/system";

const TicketsTable = ({ data, pagination, handlePagination }) => {
  const toDataURL = (url) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };
  const download = async (url) => {
    var element = document.createElement("a");
    element.href = await toDataURL(url);
    element.download = url.substring(url.lastIndexOf("/") + 1, url.length);
    element.click();
  };
  const columns = useMemo(
    () => [
      {
        Header: "Order #",
        accessor: "job_id",
        Cell: (props) => <span>SK{props.value}</span>,
        disableFilters: true,
      },
      {
        Header: "Booked",
        accessor: "job_date",
        Cell: (props) => new Date(props.value).toLocaleDateString(),
        disableFilters: true,
      },
      {
        Header: "Customer",
        Cell: ({ cell }) => (
          <span>
            {cell?.row?.original?.first_name} {cell?.row?.original?.last_name} -{" "}
            {cell?.row?.original?.mobile_number}
          </span>
        ),
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
        disableFilters: true,
      },
      {
        Header: "Driver",
        Cell: ({ cell }) => (
          <span>
            {cell?.row?.original?.job?.driver?.first_name}{" "}
            {cell?.row?.original?.job?.driver?.last_name}
          </span>
        ),
        disableFilters: true,
      },
        {
            Header: "",
            accessor: "attachments",
            id: "download_id",
            Cell: (props) => {
                return (
                    <>
                        {props.value?.length > 0 ? (
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                }}
                            >
                                <>
                                    {props.value.findIndex(
                                        (x) => x.ticket_type == "delivery"
                                    ) == -1 && (
                                        <span
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                            }}
                                            className="normal-dsans-10-primary1-disable"
                                        >
                        Delivery Ticket
                          <span
                              style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                              }}
                              className="normal-dsans-10-primary1"
                          >
                      <img
                          src={downloadSite}
                          alt="download-icon"
                          style={{
                              marginLeft: "5px",
                              filter:
                                  "invert(61%) sepia(71%) saturate(10%) hue-rotate(10deg) brightness(121%) contrast(67%)",
                          }}
                      />
                          </span>
                      </span>
                                    )}
                                </>
                                {props.value.map((ticket) => {
                                    return (
                                        <span
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                            }}
                                            className="normal-dsans-10-primary1"
                                            onClick={() =>
                                                download(DOWNLOAD_URL + ticket?.file?.name)
                                            }
                                        >
                        {ticket.ticket_type == "delivery"
                            ? "Delivery Ticket"
                            : "WTN"}
                                            <img
                                                src={downloadSite}
                                                alt="download-icon"
                                                style={{ marginLeft: "5px" }}
                                            />
                      </span>
                                    );
                                })}
                                <>
                                    {props.value.findIndex((x) => x.ticket_type == "wtn" ||  x.ticket_type == null) ==
                                        -1 && (
                                            <span
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "flex-start",
                                                    alignItems: "center",
                                                }}
                                                className="normal-dsans-10-primary1-disable"
                                            >
                        WTN
                          <span
                              style={{
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "center",
                              }}
                              className="normal-dsans-10-primary1"
                          >
                      <img
                          src={downloadSite}
                          alt="download-icon"
                          style={{
                              marginLeft: "5px",
                              filter:
                                  "invert(61%) sepia(71%) saturate(10%) hue-rotate(10deg) brightness(121%) contrast(67%)",
                          }}
                      />
                          </span>
                      </span>
                                        )}
                                </>
                            </div>
                        ) : (
                            <>
                  <span
                      className="normal-dsans-10-tooltip"
                      style={{ cursor: "not-allowed" }}
                      data-tip={true}
                      data-for={"ticket_file"}
                  >
                    ------
                  </span>
                                <ReactTooltip
                                    type="error"
                                    place="top"
                                    effect="solid"
                                    id={"ticket_file"}
                                >
                                    File not attached
                                </ReactTooltip>
                            </>
                        )}
                    </>
                );
            },
            disableFilters: true,
        },
        // {
      //     Header: "",
      //     id: "submenu_id",
      //     Cell: ({rows}) => (
      //         <span className="normal-dsans-10-primary">ooo</span>
      //     ),
      //     disableFilters: true,
      // },
    ],
    []
  );
  return (
    <>
      <TableContainer columns={columns} data={data} name={"tickets"} />
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
    </>
  );
};

export default TicketsTable;
