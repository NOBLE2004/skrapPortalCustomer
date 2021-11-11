import React, { useState, useEffect } from "react";
import NewManagerDetail from "../newManagerDetail/NewManagerDetail";
import SiteManagerTable from "../siteManagerTable/SiteManagerTable";
import CommonSearch from "../../commonComponent/commonSearch/CommonSearch";
import { Grid } from "@material-ui/core";
import sitesService from "../../../services/sites.service";
import FadeLoader from "react-spinners/FadeLoader";
import JobFilters from "../../filters/jobFilters";
import { useParams } from "react-router";
import "./siteManagerDetailPage.scss";

const SiteManagerDetailPage = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    service: "",
    address: "",
    search: "",
    page: 1,
  });

  const [state, setState] = useState({
    isLoading: false,
    managerData: [],
    isCreateManager: false,
  });
  const [reload, setReload] = useState(false);

  const { isLoading, managerData, isCreateManager } = state;
  const handleCreateManager = () => {
    setState({ ...state, isCreateManager: true });
  };

  const handleChangeSearch = (search) => {
    setFilters({ ...filters, search: search });
  };

  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };
  useEffect(() => {
    setState({ ...state, isLoading: true });
    sitesService
      .showManagerDetail(id)
      .then((res) => {
        setState({ ...state, managerData: res.data, isLoading: false });
      })
      .catch((error) => {
        setState({ ...state, isLoading: false });
      });
  }, [reload]);

  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };

  return (
    <div className="site-manager-detail-page-main">
      <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        <button className="header-btn" onClick={handleCreateManager}>
          Create Manager
        </button>
      </div>
      <Grid container className="manager-detail-page">
        {isLoading ? (
          <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
        ) : (
          <>
            <Grid item md={12}>
              <NewManagerDetail managerData={managerData} setReload={() => setReload(!reload)} />
            </Grid>
            <Grid item md={12} className="site-manager-filter">
              <div className="jobs-search-header">
                <CommonSearch
                  handleChangeSearch={handleChangeSearch}
                  cname="jobs"
                />
                <JobFilters handleChangeFilters={handleChangeFilters} />
              </div>
            </Grid>
            {managerData && (
              <SiteManagerTable
                managerData={managerData}
                pagination={managerData.jobs}
                handlePagination={handlePagination}
              />
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default SiteManagerDetailPage;
