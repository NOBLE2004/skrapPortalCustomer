import React, { useState, useEffect } from "react";
import NewManagerDetail from "../../siteManager/newManagerDetail/NewManagerDetail";
import SiteManagerTable from "../../siteManager/siteManagerTable/SiteManagerTable";
import CommonSearch from "../../commonComponent/commonSearch/CommonSearch";
import { Grid } from "@mui/material";
import sitesService from "../../../services/sites.service";
import FadeLoader from "react-spinners/FadeLoader";
import JobFilters from "../../filters/jobFilters";
import { useParams } from "react-router";
import "./sitesDetailPage.scss";
import PoDetail from "../../siteManager/poDetail/PoDetail";
import CreateJob from "../../modals/createJob/CreateJob";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import { getLandfillDiversion } from "../../../store/actions/action.landfillDiversion";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../../hooks/useWindowDimension";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  width: "100%",
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    // backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    backgroundColor: "#A4ADBC",
    height: "15px",
    borderRadius: 40,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 40,
    height: "15px",
    backgroundImage: "linear-gradient(to right,#fa8c14 80%,#00b25d )",
    // "linear-gradient(90deg,red 50%,#fa8c14 25%,#00b25d 25%)",
  },
}));

const SitesDetailPage = (props) => {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const dispatch = useDispatch();
  const stateLandFill = useSelector((state) => state?.landfillDiversion);
  const [isReload, setIsReload] = useState(false);
  const [reload, setReload] = useState(false);
  const [userInfo, setUserInfo] = useState(0);
  const [jobsData, setJobsData] = useState({});
  const [isJobLoading, setJobLoading] = useState(false);
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
    addressData: "",
    postCode: "",
  });

  const { isLoadings, managerData, isJobCreated, addressData, postCode } =
    state;

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
          addressData: res.data?.address?.address,
          postCode: res.data?.address?.postcode,
          isLoadings: false,
        });
      } catch (err) {
        setState({ ...state, isLoadings: false });
      }
    };
    dispatch(getLandfillDiversion({ sites: [id] }));
    getData();
  }, [reload, isReload]);

  useEffect(() => {
    const getJobData = async () => {
      try {
        setJobLoading(true);
        const params = Object.entries(filters).reduce(
          (a, [k, v]) => (v ? ((a[k] = v), a) : a),
          {}
        );
        const res = await sitesService.showSitesDetail(id, params);
        setJobsData(res.data);
        setJobLoading(false);
      } catch (err) {
        setJobLoading(false);
      }
    };

    getJobData();
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
            ? addressData
              ? addressData.slice(0, 16)
              : "n/a"
            : addressData
            ? addressData
            : ""}
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
          siteAddress={addressData ? addressData : ""}
          postCode={postCode ? postCode : ""}
        />
      )}
      <Grid container className="manager-detail-page">
        {isLoadings || stateLandFill?.isLoading ? (
          <FadeLoader
            color={"#518ef8"}
            loading={isLoadings || stateLandFill?.isLoading}
            width={4}
          />
        ) : (
          <>
            <Grid item md={12} xs={12}>
              <div className="landfill">Landfill Diversion Rate</div>
              <div className="progress-bar">
                <label
                  style={
                    stateLandFill?.data?.result?.land_fill < 6
                      ? {
                          left: `${1}%`,
                        }
                      : {
                          left: `${
                            stateLandFill?.data?.result?.land_fill > 95
                              ? 95
                              : stateLandFill?.data?.result?.land_fill-5
                          }%`,
                        }
                  }
                >
                  {stateLandFill?.data?.result?.land_fill}%
                </label>
                <BorderLinearProgress
                  value={stateLandFill?.data?.result?.land_fill}
                  variant="determinate"
                />
              </div>
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
            <div className="site-tabel-detail">
              {isJobLoading ? (
                <FadeLoader
                  color={"#518ef8"}
                  loading={isJobLoading}
                  width={4}
                />
              ) : jobsData && jobsData.jobs?.data?.length ? (
                <SiteManagerTable
                  managerData={jobsData}
                  pagination={jobsData.jobs}
                  handlePagination={handlePagination}
                  siteDetail={true}
                  reload={() => setIsReload(!isReload)}
                />
              ) : (
                <div>No active jobs found</div>
              )}
            </div>
          </>
        )}
      </Grid>
    </div>
  );
};

export default SitesDetailPage;
