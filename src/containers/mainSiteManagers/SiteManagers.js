import React from "react";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import NewManagerDetail from "../../components/siteManager/newManagerDetail/NewManagerDetail";
import { Grid } from "@material-ui/core";
import { viewMoreBtn, RightArrowBtn } from "../../assets/images";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import "./sitemanager.scss";
const SiteManagers = () => {
  const handleViewMore = () => {
    console.log("handle view more ");
  };
  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        <DashboardFilter />
      </div>
      <Grid container spacing={5}>
        <Grid item md={5}>
          <ManagerDetail />
        </Grid>
        <Grid item md={5}>
          <ManagerDetail />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item md={5}>
          <ManagerDetail />
        </Grid>
        <Grid item md={5}>
          <ManagerDetail />
        </Grid>
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
      </Grid>
      <Grid container spacing={5}>
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
      </Grid>
      <Grid container spacing={5}>
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
      </Grid>
      <Grid container spacing={5}>
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
      <Grid container spacing={5}>
        <Grid item md={12} className="view-more-btn">
          <img src={viewMoreBtn} alt="view-more-btn" onClick={handleViewMore} />
        </Grid>
      </Grid>
    </div>
  );
};

export default SiteManagers;
