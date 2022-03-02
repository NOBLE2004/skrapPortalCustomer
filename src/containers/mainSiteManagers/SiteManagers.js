import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import { viewMoreBtn } from "../../assets/images";
import FadeLoader from "react-spinners/FadeLoader";
import { getSiteManager } from "../../store/actions/siteManager.action";
import CreateManager from "../../components/modals/createManager/CreateManager";
import "./sitemanager.scss";

const SiteManagers = (props) => {
  const [isSiteBooked, setSiteBooked] = useState(false);
  const { sites } = props.siteManager;
  const handleBookSite = () => {
    setSiteBooked(true);
  };

  useEffect(() => {
    async function fetchData() {
      !sites && (await props.getSiteManager());
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (isSiteBooked) {
      props.getSiteManager();
    }
  }, [isSiteBooked]);

  return (
    <div className="site-manager-margin">
      <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        {props.siteManager.sites && props.siteManager.sites.length <= 0 && (
          <button className="header-btn" onClick={handleBookSite}>
            Create Manager
          </button>
        )}
      </div>
      <Grid container className="main-site-manager" spacing={5}>
        {props.siteManager.loading ? (
          <FadeLoader
            color={"#29a7df"}
            loading={props.siteManager.loading}
            width={4}
          />
        ) : props.siteManager.sites && props.siteManager.sites.length > 0 ? (
          props.siteManager.sites.map((site, index) => (
            <Grid item xm={12} sm={8} md={6} key={index}>
              <ManagerDetail siteData={site} key={index} />
            </Grid>
          ))
        ) : (
          <div className="site-error">Managers not found yet</div>
        )}
      </Grid>
      {isSiteBooked && (
        <CreateManager handleClose={() => setSiteBooked(!isSiteBooked)} />
      )}
      <Grid container spacing={5}>
        {props.siteManager.sites && props.siteManager.sites.length > 10 && (
          <Grid item md={12} className="view-more-btn">
            <img src={viewMoreBtn} alt="view-more-btn" />
          </Grid>
        )}
      </Grid>
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
