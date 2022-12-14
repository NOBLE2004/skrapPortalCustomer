import React, { useMemo } from "react";
import TableContainer from "../reactTable/TableContainer";
import Pagination from "../reactTable/pagination";
import "./sites-table.scss";

const SupplierTable = ({ data, pagination, handlePagination, reload }) => {
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "first_name",
        disableFilters: true,
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        disableFilters: true,
      },
      {
        Header: "Email",
        accessor: "email",
        disableFilters: true,
      },
      {
        Header: "Phone Number",
        accessor: "mobile_number",
        disableFilters: true,
      },
    ],
    []
  );

  return (
    <>
      <TableContainer columns={columns} data={data} name={""} />
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

export default SupplierTable;
