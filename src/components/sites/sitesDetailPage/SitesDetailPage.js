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
import CreateJob from "../../modals/createJob/CreateJob";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import useWindowDimensions from "../../../hooks/useWindowDimension";

const SitesDetailPage = (props) => {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const location = useLocation();
  const [isReload, setIsReload] = useState(false);
  const { site_address } = location.state;
  const [reload, setReload] = useState(false);
  const [userInfo, setUserInfo] = useState(0);
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    service: "",
    address: "",
    search: "",
  });

  const [state, setState] = useState({
    isLoadings: false,
    managerData: {},
    isCreateManager: false,
    isJobCreated: false,
  });

  const { isLoadings, managerData, isJobCreated } = state;

  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };
  useEffect(() => {
    const userData = getUserDataFromLocalStorage();
    setUserInfo(userData.role_id);
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        setState({ ...state, isLoadings: true });
        const params = Object.entries(filters).reduce(
          (a, [k, v]) => (v ? ((a[k] = v), a) : a),
          {}
        );
        setState({ ...state, managerData: {} });
        const res = await sitesService.showSitesDetail(id, params);
        setState({
          ...state,
          managerData: res.data,
          isLoadings: false,
        });
      } catch (err) {
        setState({ ...state, isLoadings: false });
      }
    };

    getData();
  }, [filters, reload, isReload]);

  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };

  const handleChangeSearch = (search) => {
    setFilters({ ...filters, search: search });
  };

  const handleCreateJob = () => {
    setState({ ...state, isJobCreated: true });
  };

  return (
    <div className="site-manager-detail-page-main">
      <div className="header-main">
        <div className="sites-header-title">
          {width < 600
            ? site_address
              ? site_address.slice(0, 16)
              : "n/a"
            : site_address}
        </div>
        <div>
          <button className="header-btn" onClick={handleCreateJob}>
            Create Job
          </button>
        </div>
      </div>
      {isJobCreated && (
        <CreateJob
          closeModal={() => setState({ ...state, isJobCreated: false })}
          sites={true}
          reload={() => setIsReload(!isReload)}
          siteId={id}
          managerData={managerData}
        />
      )}
      <Grid container className="manager-detail-page">
        {isLoadings ? (
          <FadeLoader color={"#29a7df"} loading={isLoadings} width={4} />
        ) : (
          <>
            <Grid item md={12} xs={12}>
              <div className="landfill">Landfill Diversion Rate</div>
              <hr />
            </Grid>
            <Grid item md={12} xs={12}>
              {userInfo === 12 || userInfo === 13 ? (
                ""
              ) : (
                <NewManagerDetail
                  managerData={managerData}
                  setReload={() => setReload(!reload)}
                />
              )}
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

export default SitesDetailPage;
