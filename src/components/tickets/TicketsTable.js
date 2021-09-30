import React, { useMemo } from "react";
import { downloadSite } from "../../assets/images";
import TableContainer from "../reactTable/TableContainer";
import "../reactTable/jobs-react-table.scss";
import Pagination from "../reactTable/pagination";

const TicketsTable = ({data, pagination, handlePagination}) => {
  const toDataURL = (url) => {
    return fetch(url).then((response) => {
      return response.blob();
    }).then(blob => {
      return URL.createObjectURL(blob);
    });
  }
  const download = async (url) => {
    var element = document.createElement("a");
    element.href = await toDataURL(url);
    element.download = url.split('ticket_attachment')[1];
    element.click();
  };
  const columns = useMemo(
    () => [
      {
        Header: "Order #",
        accessor: "job_id",
        Cell: (props) => (
            <span>SK{props.value}</span>
        ),
        disableFilters: true,
      },
      {
        Header: "Booked",
        accessor: "save_date",
        Cell: (props) => new Date(props.value).toLocaleDateString(),
        disableFilters: true,
      },
      {
        Header: "Customer",
        Cell: ({ cell }) => (
            <span>{cell?.row?.original?.first_name} {cell?.row?.original?.last_name} - {cell?.row?.original?.mobile_number}</span>
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
            <span>{cell?.row?.original?.job?.driver?.first_name} {cell?.row?.original?.job?.driver?.last_name}</span>
        ),
        disableFilters: true,
      },
      {
        Header: "",
        accessor: "ticket_file",
        id: "download_id",
        Cell: (props) => (
          <span className="normal-dsans-10-primary" onClick={() => download(props.value)}>
            Download Ticket
            <img
              src={downloadSite}
              alt="download-icon"
              style={{ marginLeft: "5px" }}
            />
          </span>
        ),
        disableFilters: true,
      },
      {
        Header: "",
        id: "submenu_id",
        Cell: ({ rows }) => (
          <span className="normal-dsans-10-primary">ooo</span>
        ),
        disableFilters: true,
      },
    ],
    []
  );
  return (
    <div>
      <TableContainer
          columns={columns}
          data={data}
          name={"tickets"}
      />
      <Pagination
          last={pagination?.last_page}
          current={pagination?.current_page}
          from={pagination?.from}
          to={pagination?.to}
          total={pagination?.total}
          handleNext={(page)=>{handlePagination(page)}}
          handlePrevious={(page)=>{handlePagination(page)}}
      />
    </div>
  );
};

export default TicketsTable;
