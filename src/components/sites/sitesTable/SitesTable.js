import React, { useEffect, useMemo, useState } from "react";
import TableContainer from "../../reactTable/TableContainer";
import Pagination from "../../reactTable/pagination";
import "./sites-table.scss";
import SiteAssignToManager from "../../modals/siteAssignToManager/SiteAssignToManager";
import AllocatePoModal from "../../modals/allocatePo/AllocatePoModal";
import { getUserDataFromLocalStorage } from "../../../services/utils";

const SitesTable = ({ data, pagination, handlePagination, reload }) => {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isAllocate, setIsAllocate] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [addressId, setAddressId] = useState("");
  const [roleId, setRollId] = useState(0);
  const [user, setUser] = useState("");

  const handleButtonClick = (e, props) => {
    e.stopPropagation();
    setIsManagerOpen(true);
    setSiteData(props);
  };

  const handleAllocate = (e, props) => {
    e.stopPropagation();
    setUserId(props.site_manager_user_id);
    setIsAllocate(true);
    setAddressId(props.address_id);
  };

  useEffect(() => {
    const data = getUserDataFromLocalStorage();
    setUser(data.user_count);
    setRollId(data.role_id);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Site Name",
        accessor: (d) =>
          d.job_address
            ? d.job_address.slice(0, 22)
            : d.address_from_address_data
            ? d.address_from_address_data.slice(0, 22)
            : "",
        id: "site_name",
        disableSortBy: true,
        filter: "equals",
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "Address",
        accessor: (d) =>
          d.job_address
            ? d.job_address
            : d.address_from_address_data
            ? d.address_from_address_data
            : "",
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
        Header: "Spend By Site",
        accessor: "sales_by_site",
        disableFilters: true,
        Cell: (props) => {
          return (
            <span>
              {props.value
                ? `${
                    localStorage.getItem("currency")
                      ? localStorage.getItem("currency")
                      : "£"
                  }` + parseFloat(props.value).toLocaleString()
                : "n/a"}
            </span>
          );
        },
      },
      {
        Header: "Manager",
        accessor: "site_concat_name",
        disableFilters: true,
        Cell: (props) => {
          return <span>{props.value || "n/a"}</span>;
        },
      },
      {
        Header: "",
        id: "edit-id",

        Cell: ({ cell }) => (
          <>
            {roleId === 13 || roleId === 12 ? (
              ""
            ) : (
              <div className="action-for-site">
                {localStorage.getItem("user_count") > 0 && (
                  <button
                    className="sites-header-btn"
                    onClick={(e) => handleButtonClick(e, cell?.row?.original)}
                  >
                    Assign
                  </button>
                )}

                <button
                  className="sites-header-btn"
                  style={{ marginLeft: "8px" }}
                  onClick={(e) => handleAllocate(e, cell?.row?.original)}
                >
                  Allocate PO
                </button>
              </div>
            )}
          </>
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
      {isManagerOpen && (
        <SiteAssignToManager
          handleClose={() => setIsManagerOpen(false)}
          siteData={siteData}
          setReload={() => reload()}
        />
      )}

      {isAllocate && (
        <AllocatePoModal
          handleClose={() => setIsAllocate(false)}
          userId={userId}
          addressId={addressId}
        />
      )}
    </>
  );
};

export default SitesTable;
