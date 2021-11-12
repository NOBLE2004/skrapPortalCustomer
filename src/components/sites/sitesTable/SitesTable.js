import React, { useMemo , useState } from "react";
import TableContainer from "../../reactTable/TableContainer";
import Pagination from "../../reactTable/pagination";
import "./sites-table.scss";
import SiteAssignToManager from "../../modals/siteAssignToManager/SiteAssignToManager";

const SitesTable = ({
  data,
  pagination,
  handlePagination,
  reload
}) => {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [siteData, setSiteData] = useState(null);

  const handleButtonClick = (e, props) => {
    e.stopPropagation();   
    setIsManagerOpen(true)
    setSiteData(props)
  };
  const columns = useMemo(
    () => [
      {
        Header: "SiteName",
        accessor: (d) => d.job_address.slice(0,22),
        id:"site_name",
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
          return <span>{ "£" + parseFloat(props.value).toLocaleString() || "n/a"}</span>;
        },
      },
      {
        Header: "Manager",
        accessor: "manager_name",
        disableFilters: true,
        Cell: (props) => {
          return <span>{"n/a"}</span>;
        },
      },
      {
        Header: "",
        id: "edit-id",
        Cell: ({ cell }) => (
          <span style={{ padding: "0px", cursor: "pointer" }}><button className="header-btn" onClick={(e) => handleButtonClick(e, cell?.row?.original)}>Assign</button></span>
        ),
      },
    ],
    []
  );
  
  return (
    <>
      <TableContainer columns={columns} data={data} name={"sites"} />
      <Pagination
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
      />
      {
        isManagerOpen && 
      <SiteAssignToManager handleClose={()=> setIsManagerOpen(false)} siteData={siteData} setReload={() => reload()}/>
      }
    </>
  );
};

export default SitesTable;
