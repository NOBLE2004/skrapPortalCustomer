import React, { useEffect, useState } from "react";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import NewManagerDetail from "../../components/siteManager/newManagerDetail/NewManagerDetail";
import { Grid } from "@material-ui/core";
import { viewMoreBtn, RightArrowBtn } from "../../assets/images";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import FadeLoader from "react-spinners/FadeLoader";
import { connect } from "react-redux";
import "./sitemanager.scss";
import { getSiteManager } from "../../store/actions/site.action";
const SiteManagers = (props) => {
  
  const handleViewMore = () => {
    console.log("handle view more ");
  };

  useEffect(() => {
    async function fetchData() {
      if (!props.siteManager.sites) {
        await props.getSiteManager();
      }
    }

    fetchData()
  }, []);

  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        <DashboardFilter />
      </div>
      <Grid container className="main-site-manager">
        {props.siteManager.loading ? (
          <FadeLoader
            color={"#29a7df"}
            loading={props.siteManager.loading}
            width={4}
          />
        ) : (
          props.siteManager.sites &&
          props.siteManager.sites.length > 0 &&
          props.siteManager.sites.map((site, index) => (
            <ManagerDetail siteData={site} key={index} />
          ))
        )}
      </Grid>

      {/* <Grid container spacing={5}>
        <Grid item md={11}>
          <NewManagerDetail />
        </Grid>
        <Grid item md={1} className="view-more-btn">
          <img
            src={RightArrowBtn}
            alt="view-more-btn"
            onClick={handleViewMore}
          />
        </Grid>
          </Grid> */}
    </div>
  );
};

const mapStateToProps = ({ siteManager }) => {
  return { siteManager };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSiteManager: (year) => dispatch(getSiteManager(year)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteManagers);
