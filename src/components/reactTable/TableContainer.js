import React, { Fragment, useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { DefaultColumnFilter } from "./filters";
import CommonSearch from "../commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../commonComponent/commonfilter/CommonFilter";

const TableContainer = ({ columns, data, name }) => {
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
    preGlobalFilteredRows,
    state,
    setGlobalFilter,
    rows,
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

  return (
    <Fragment>
      <div className="common-search-for-tables">
        <CommonSearch
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          cname={name}
        />
        <CommonFilter cname={name} />
      </div>
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
                }}
                {...row.getRowProps()}
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
