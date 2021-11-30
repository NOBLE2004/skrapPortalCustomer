import React, { useState, useEffect } from "react";
import NewManagerDetail from "../../siteManager/newManagerDetail/NewManagerDetail";
import SiteManagerTable from "../../siteManager/siteManagerTable/SiteManagerTable";
import CommonSearch from "../../commonComponent/commonSearch/CommonSearch";
import { Grid } from "@material-ui/core";
import sitesService from "../../../services/sites.service";
import FadeLoader from "react-spinners/FadeLoader";
import JobFilters from "../../filters/jobFilters";
import { useParams, useLocation } from "react-router";
import "./sitesDetailPage.scss";
import PoDetail from "../../siteManager/poDetail/PoDetail";
import { connect } from "react-redux";

const SitesDetailPage = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const { site_address } = location.state;
  console.log("site_address", site_address);
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

  const { isLoading, managerData } = state;
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
      .showSitesDetail(id)
      .then((res) => {
        console.log("res", res.data);
        setState({
          ...state,
          managerData: res.data,
          isLoading: false,
        });
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
        <div className="sites-header-title">
          {site_address ? site_address : "n/a"}{" "}
        </div>
      </div>

      <Grid container className="manager-detail-page">
        {isLoading ? (
          <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
        ) : (
          <>
            <Grid item md={12}>
              <div className="landfill">Landfill Diversion Rate</div>
              <hr />
            </Grid>
            <Grid item md={12}>
              <NewManagerDetail
                managerData={managerData}
                setReload={() => setReload(!reload)}
              />
            </Grid>
            <Grid className="po-detail-page">
              <PoDetail managerData={managerData} />
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
            {managerData && managerData.jobs?.data?.length ? (
              <SiteManagerTable
                managerData={managerData}
                pagination={managerData.jobs}
                handlePagination={handlePagination}
                siteDetail={true}
              />
            ) : (
              "Jobs Not Found Yet !"
            )}
          </>
        )}
      </Grid>
    </div>
  );
};
const mapStateToProps = ({ sites, po }) => {
  return { sites, po };
};
export default connect(mapStateToProps, "")(SitesDetailPage);
