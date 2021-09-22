import React, { useMemo } from "react";
import TableContainer from "../../reactTable/TableContainer";
import Pagination from "../../reactTable/pagination";
import "./sites-table.scss";

const SitesTable = ({
  data,
  pagination,
  handleUpdateJobs,
  handlePagination,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "SiteName",
        accessor: "site_contact_name",
        disableSortBy: true,
        filter: "equals",
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Address",
        accessor: "job_address",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Site Contact",
        accessor: "site_contact_number",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Number of Jobs",
        accessor: "number_of_jobs",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Sales By Site",
        accessor: "sales_by_site",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "",
        id: "edit-id",
        Cell: ({ rows }) => (
          <span style={{ padding: "0px", cursor: "pointer" }}>ooo</span>
        ),
      },
    ],
    []
  );
  return (
    <>
      <TableContainer columns={columns} data={data} name={"sites"} />
      {/* <Pagination
        last={pagination.last_page}
        current={pagination.current_page}
        from={pagination.from}
        to={pagination.to}
        total={pagination.total}
        handleNext={(page) => {
          handlePagination(page);
        }}
        handlePrevious={(page) => {
          handlePagination(page);
        }}
      /> */}
    </>
  );
};

export default SitesTable;
