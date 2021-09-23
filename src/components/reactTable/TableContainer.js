import React, { Fragment, useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { DefaultColumnFilter } from "./filters";
import { useHistory } from "react-router";
import GlobalFilter from "../filters/GlobalFilter";

const TableContainer = ({ columns, data, name }) => {
  const history = useHistory();
  const [cellWidth, setCellWidth] = useState(100);
  const [cellPadding, setCellPadding] = useState("10px");

  useEffect(() => {
    if (name === "jobs") {
      setCellWidth(100);
      setCellPadding("10px");
    } else {
      setCellWidth(152);
      setCellPadding("16px");
    }
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const handleRowClick = (row) => {
    if (name === "jobs") {
      history.push({ pathname: `job-detail/${row.job_id}` });
    }
  };

  return (
    <Fragment>
      {/* <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      /> */}
      <div {...getTableProps()} className="table-main">
        <div style={{ display: "table-head" }}>
          {headerGroups.map((headerGroup) => (
            <div
              style={{ display: "flex" }}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <div
                  {...column.getHeaderProps()}
                  className="table-headings"
                  style={{ width: cellWidth, padding: cellPadding }}
                >
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "table-body" }} {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div
                style={{
                  display: "flex",
                  border: "1px solid #ECECEC",
                  marginBottom: 18,
                  borderRadius: 11,
                  cursor: "pointer",
                }}
                {...row.getRowProps()}
                onClick={() => handleRowClick(row.original)}
              >
                {row.cells.map((cell) => {
                  return (
                    <div
                      className="table-body-cell"
                      style={{ width: cellWidth, padding: cellPadding }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default TableContainer;
