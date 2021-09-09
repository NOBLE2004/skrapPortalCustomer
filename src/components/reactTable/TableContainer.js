import React, { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { Table, TextField } from "@material-ui/core";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import { Filter, DefaultColumnFilter } from "./filters";
import { jobsUseStyles } from "../../assets/styles/muiStyles/MuiStyles";
import Paper from "@material-ui/core/Paper";
import CommonSearch from "../commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../commonComponent/commonfilter/CommonFilter";

const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    preGlobalFilteredRows,
    state,
    setGlobalFilter,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
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
  const classes = jobsUseStyles();
  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Fragment>
      <div className="common-search-for-tables">
        <CommonSearch
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <CommonFilter />
      </div>
      <Table className="table-main">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            // <Paper elevation={0} className="table-header">
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...column.getHeaderProps()}
                  className="table-headings"
                >
                  <div {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </TableCell>
              ))}
            </TableRow>
            // </Paper>
          ))}
        </TableHead>

        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <TableRow className="table-body">
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        className="table-body-cell"
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </Fragment>
  );
};

export default TableContainer;
