import React, { useEffect, useState, useRef } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { DefaultColumnFilter } from "./filters";
import { useHistory } from "react-router";
import usePagePosition from "../../hooks/usePagePosition";
import "./jobs-react-table.scss";

const TableContainer = ({ columns, data, name }) => {
  const history = useHistory();
  const [cellWidth, setCellWidth] = useState(100);
  const [cellPadding, setCellPadding] = useState("10px");
  const [yPosition, setYposition] = useState(0);
  const scrollPosition = usePagePosition();
  const inputRef = useRef();

  const scrollHandler = (_) => {
    if (inputRef.current) {
      setYposition(inputRef.current.getBoundingClientRect().y);
    }
  };

  useEffect(() => {
    if (name === "jobs") {
      setCellWidth(100);
      setCellPadding("10px");
    } else {
      setCellWidth(172);
      setCellPadding("16px");
    }

    window.addEventListener("scroll", scrollHandler, true);
    return () => {
      window.removeEventListener("scroll", scrollHandler, true);
    };
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
    if (name === "sites") {
      history.push({
        pathname: `sites/${row.address_id}`,
        state: { site_address: row.job_address },
      });
    }
  };
  return (
    <div className="table-container-main" style={{
      background: 'white',
      borderRadius: 11.6836,
      boxShadow: '0px 17px 24px rgba(58, 58, 58, 0.05)'
    }} ref={inputRef}>
      <div {...getTableProps()} className="table-main">
        {headerGroups.map((headerGroup) => (
          <div
            style={{ display: "flex" }}
            className={
              name === "reports"
                ? ""
                : yPosition && yPosition < 20
                ? "header-top"
                : ""
            }
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <div
                {...column.getHeaderProps()}
                className={
                  name === "sites" ? "sites-table-headings" : "table-headings"
                }
                style={{
                  width:
                    column.id === "status"
                      ? "100px"
                      : (column.id === "id-edit") | (column.id === "select")
                      ? "50px"
                      : cellWidth,
                  padding: cellPadding,
                }}
              >
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
        <div style={{ display: "table-body" }} {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <div
                style={{
                  display: "flex",
                  //borderBottom: "1px solid #ECECEC",
                  borderRadius: 11,
                }}
                className={
                  name === "tickets" ? "table-body-row1" : "table-body-row"
                }
                {...row.getRowProps()}
                onClick={() => handleRowClick(row.original)}
              >
                {row.cells.map((cell) => {
                  return (
                    <div
                      className={
                        name === "sites"
                          ? "sites-table-body-cell"
                          : "table-body-cell"
                      }
                      style={{
                        width:
                          cell.column.id === "accept-id"
                            ? "120px"
                            : (cell.column.id === "id-edit") |
                              (cell.column.id === "select")
                            ? "50px"
                            : cellWidth,
                        padding: cellPadding,
                      }}
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
    </div>
  );
};

export default TableContainer;
