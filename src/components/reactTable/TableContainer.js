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
import "./jobs-react-table.scss"

const TableContainer = ({ columns, data, name }) => {
  const history = useHistory();
  const [cellWidth, setCellWidth] = useState(100);
  const [cellPadding, setCellPadding] = useState("10px");

  useEffect(() => {
    if (name === "jobs") {
      setCellWidth(100);
      setCellPadding("10px");
    } else {
      setCellWidth(172);
      setCellPadding("16px");
    }
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state: { pageIndex, pageSize },
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
                  className={name === "sites" ? "sites-table-headings" : "table-headings"}
                  style={{ width: column.id === 'status' ? '160px' : column.id === 'id-edit' ? '50px': cellWidth, padding: cellPadding }}
                >
                  {column.render("Header")}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "table-body" }} {...getTableBodyProps()}>
          {
            rows.map((row, i) => {
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
                  className="table-body-row"
                  {...row.getRowProps()}
                  onClick={() => handleRowClick(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <div
                        className={name === "sites" ? "sites-table-body-cell" : "table-body-cell" }
                        style={{ width: cell.column.id === 'status' ? '160px' : cell.column.id === 'id-edit' ? '50px': cellWidth, padding: cellPadding}}
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
