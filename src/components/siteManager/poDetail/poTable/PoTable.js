import React, { useMemo } from "react";
import TableContainer from "../../../reactTable/TableContainer";
const PoTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "User Id",
        accessor: "user_id",
        disableSortBy: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Service Id",
        accessor: "service_id",
        disableSortBy: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Services Order",
        accessor: "uses",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "0"}</span>;
        },
      },
      {
        Header: "PO Allocate",
        accessor: "max",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Remaining",
        accessor: (d) => d.max - d.uses,
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Purcahse Order",
        accessor: "purchase_order",
        disableFilters: true,
        Cell: (props) => {
          return (
            <span>
              {"PO-" + props.value || "n/a"}
            </span>
          );
        },
      },
      {
        Header: "Created At",
        accessor: "created_at",
        disableFilters: true,
        Cell: (props) => {
          return (
            <span>
              { props.value || "n/a"}
            </span>
          );
        },
      },
    ],
    []
  );
  return (
    <div>
      <TableContainer columns={columns} name={"po-order"} data={data} />
    </div>
  );
};

export default PoTable;
