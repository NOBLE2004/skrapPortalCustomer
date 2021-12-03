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
import { getSitesDetailList } from "../../../store/actions/sites.action";

const SitesDetailPage = (props) => {
  const { id } = useParams();
  const location = useLocation();
  const { site_address } = location.state;
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
  });

  const { isLoadings, managerData } = state;

  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };
  useEffect(() => {
    const getData = async () => {
      try{
        setState({ ...state, isLoadings: true });
        const params = Object.entries(filters).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
        setState({...state , managerData:{}})
        const res = await sitesService.showSitesDetail(id , params)
        setState({
          ...state,
          managerData: res.data,
          isLoadings: false,
        });
      }catch(err){
        setState({ ...state, isLoadings: false });
      }
    };

    getData()
  }, [filters]);

  

  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };

  const handleChangeSearch = (search) => {
    setFilters({ ...filters, search: search });
  };
  
  return (
    <div className="site-manager-detail-page-main">
      <div className="header-main">
        <div className="sites-header-title">
          {site_address ? site_address : "n/a"}{" "}
        </div>
      </div>

      <Grid container className="manager-detail-page">
        {isLoadings ? (
          <FadeLoader color={"#29a7df"} loading={isLoadings} width={4} />
        ) : (
          <>
            <Grid item md={12}>
              <div className="landfill">Landfill Diversion Rate</div>
              <hr />
            </Grid>
            <Grid item md={12}>
              <NewManagerDetail managerData={ managerData } />
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
                <JobFilters handleChangeFilters={handleChangeFilters} sites="sites"/>
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
const mapStateToProps = ({ sites, po , siteDetail }) => {
  return { sites, po , siteDetail };
};

const mapDispatchToProps = (dispatch) =>{
  return {
    getSiteDetailList : (ids , filter) => dispatch(getSitesDetailList(ids, filter))
  }
  
}
export default connect(mapStateToProps, mapDispatchToProps)(SitesDetailPage);
