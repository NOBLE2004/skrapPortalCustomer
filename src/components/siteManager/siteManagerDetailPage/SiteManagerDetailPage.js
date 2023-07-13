import React, { useState, useEffect } from "react";
import NewManagerDetail from "../newManagerDetail/NewManagerDetail";
import SiteManagerTable from "../siteManagerTable/SiteManagerTable";
import CommonSearch from "../../commonComponent/commonSearch/CommonSearch";
import { Grid } from "@mui/material";
import sitesService from "../../../services/sites.service";
import FadeLoader from "react-spinners/FadeLoader";
import JobFilters from "../../filters/jobFilters";
import { useParams } from "react-router";
import "./siteManagerDetailPage.scss";
import PoDetail from "../poDetail/PoDetail";
import { connect, useDispatch, useSelector } from "react-redux";
import { changeJobsFilter } from "../../../store/actions/jobs.action";

const SiteManagerDetailPage = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const jobsFilter = useSelector((state) => state?.jobsFilter);
  const [jobsData, setJobsData] = useState({});
  const [isJobLoading, setJobLoading] = useState(false);
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
    managerData: {},
    isCreateManager: false,
  });
  const [reload, setReload] = useState(false);

  const { isLoading, managerData } = state;
  const handleCreateManager = () => {
    setState({ ...state, isCreateManager: true });
  };

  const handleChangeSearch = (search) => {
    const duplicate = { ...jobsFilter };
    duplicate.search = search;
    dispatch(changeJobsFilter({ ...jobsFilter, ...duplicate }));
    setFilters({ ...filters, search: search });
  };

  const handleChangeFilters = (filtersList) => {
    dispatch(changeJobsFilter({ ...jobsFilter, ...filtersList }));
    setFilters(filtersList);
  };
  useEffect(() => {
    setState({ ...state, isLoading: true });
    const params = Object.entries(jobsFilter).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    setState({ ...state, managerData: {} });
    sitesService
      .showManagerDetail(id, params)
      .then((res) => {
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

  useEffect(() => {
    const getJobData = async () => {
      try {
        setJobLoading(true);
        const params = Object.entries(jobsFilter).reduce(
          (a, [k, v]) => (v ? ((a[k] = v), a) : a),
          {}
        );
        const res = await sitesService.showManagerDetail(id, params);
        setJobsData(res.data);
        setJobLoading(false);
      } catch (err) {
        setJobLoading(false);
      }
    };

    getJobData();
  }, [filters, reload]);

  const handlePagination = (page) => {
    const duplicate = { ...jobsFilter };
    duplicate.page = page;
    dispatch(changeJobsFilter({ ...jobsFilter, ...duplicate }));
    setFilters({ ...filters, page: page });
  };
  return (
    <div className="site-manager-detail-page-main">
      <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        {/* <button className="header-btn" onClick={handleCreateManager}>
          Create Manager
        </button> */}
      </div>
      <Grid container className="manager-detail-page">
        {isLoading ? (
          <FadeLoader color={"#518ef8"} loading={isLoading} width={4} />
        ) : (
          <>
            <Grid item md={12}>
              <NewManagerDetail
                managerData={managerData}
                setReload={() => setReload(!reload)}
              />
            </Grid>
            { managerData && <Grid className="po-detail-page">
              <PoDetail managerData={managerData} isManager={true} />
            </Grid>}
            <Grid item md={12} className="site-manager-filter">
              <div className="jobs-search-header">
              <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CommonSearch
                      handleChangeSearch={handleChangeSearch}
                      cname="jobs"
                      jobsFilter={jobsFilter}

                    />
                  </Grid>
                  <Grid item xs={8}>
                    <JobFilters handleChangeFilters={handleChangeFilters} />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            {isJobLoading ? (
              <FadeLoader color={"#518ef8"} loading={isJobLoading} width={4} />
            ) : jobsData && jobsData.jobs?.data?.length ? (
              <SiteManagerTable
                managerData={jobsData}
                pagination={jobsData.jobs}
                handlePagination={handlePagination}
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
export default connect(mapStateToProps, "")(SiteManagerDetailPage);
