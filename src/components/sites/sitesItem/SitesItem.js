import React, { useMemo } from "react";
import { sitesTableData } from "../../utlils/jobListing";
import TableContainer from "../../reactTable/TableContainer";
import "./sites-item.scss";

const SitesItem = () => {
  const columns = useMemo(
    () => [
      {
        Header: "SiteName",
        accessor: "siteName",
        disableSortBy: true,
        filter: "equals",
      },
      {
        Header: "Address",
        accessor: "siteAddress",
        disableFilters: true,
      },
      {
        Header: "Site Contact",
        accessor: "siteContact",
        disableFilters: true,
      },
      {
        Header: "Number of Jobs",
        accessor: "siteJobs",
        disableFilters: true,
      },
      {
        Header: "Sales By Site",
        accessor: "sales",
        disableFilters: true,
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
    <TableContainer columns={columns} data={sitesTableData} name={"sites"} />
  );
};

export default SitesItem;
