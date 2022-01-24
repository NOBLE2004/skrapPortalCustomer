import React, { useMemo } from "react";
import TableContainer from "../../../reactTable/TableContainer";
import Moment from "moment";
const PoTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        Header: "Service Name",
        accessor: 'service_name',
        disableSortBy: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "PO Allocated",
        accessor: "max",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Services Ordered",
        accessor: "uses",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "0"}</span>;
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
          return <span>{"PO-" + props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Created At",
        accessor: (d) =>
          d.created_at
            ? Moment(d.created_at).local().format("DD-MM-YYYY")
            : "n/a",
        disableFilters: true,
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
