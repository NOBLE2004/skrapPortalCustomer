import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import SitesTable from "../../components/sites/sitesTable/SitesTable";
import { Grid } from "@material-ui/core";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";
import sitesService from "../../services/sites.service";
import JobFilters from "../../components/filters/jobFilters";
import Pagination from "../../components/reactTable/pagination";
import FadeLoader from "react-spinners/FadeLoader";
import "./sites.scss";

const Sites = () => {
  const [siteData, setSiteData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [updateJobs, setUpdateJobs] = useState(false);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    service: "",
    address: "",
    search: "",
    page: 1,
  });

  useEffect(() => {
    setIsLoading(true);
    sitesService
      .getSitesList(limit, filters)
      .then((res) => {
        setSiteData(res.data.data.data);
        console.log("sites res", res.data.data);
        delete res.data.data;
        setPagination(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("sites error", err.message);
        setIsLoading(false);
      });
  }, []);

  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };
  const handleChangeSearch = (search) => {
    setFilters({ ...filters, search: search });
  };

  const handleUpdateJobs = () => {
    setUpdateJobs(true);
  };
  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };

  console.log("search", filters.search);
  return (
    <>
      <CommonHeader isMap={true}>
        <CommonJobStatus
          jobStatus={{
            status: "Sales",
            price: "£7,142.00",
            statusName: "primary",
            width: "184px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Jobs",
            price: "10",
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Sites",
            price: "8",
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
      </CommonHeader>
      <Grid container>
        <Grid item md={10}>
          <div className="common-search-for-tables">
            <CommonSearch
              cname="sites"
              handleChangeSearch={handleChangeSearch}
            />
            <JobFilters handleChangeFilters={handleChangeFilters} />
          </div>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>

      <Grid container className="sites-table-loader">
        {isLoading ? (
          <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
        ) : (
          <>
            <Grid item md={10}>
              <SitesTable
                data={siteData}
                pagination={pagination}
                handleUpdateJobs={handleUpdateJobs}
                handlePagination={handlePagination}
              />
            </Grid>
            <Grid item md={2} style={{ marginTop: "49px" }}>
              {siteData &&
                siteData.map((site, index) => (
                  <CommonJobStatus
                    key={index}
                    jobStatus={{
                      status: "Sales By Site",
                      price: site ? "£" + site.sales_by_site : "£7,142.00",
                      statusName: "primary",
                      width: "194px",
                      height: "62px",
                      fontSize: "sales",
                      marginBottom: "16px",
                    }}
                  />
                ))}
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

export default Sites;
