import React, { useEffect, useState } from "react";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import NewManagerDetail from "../../components/siteManager/newManagerDetail/NewManagerDetail";
import { Grid } from "@material-ui/core";
import { viewMoreBtn, RightArrowBtn } from "../../assets/images";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import FadeLoader from "react-spinners/FadeLoader";
import "./sitemanager.scss";
import SitesService from "../../services/sites.service";
const SiteManagers = () => {
  const [state, setState] = useState({
    siteData: [],
    isLoading: false,
  });
  const handleViewMore = () => {
    console.log("handle view more ");
  };
  const { isLoading, siteData } = state;
  useEffect(() => {
    setState({ ...state, isLoading: true });
    SitesService.getSitesList()
      .then((res) => {
        setState({ ...state, siteData: res.data.data.data, isLoading: false });
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  }, []);

  return (
    <div>
      <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        <DashboardFilter />
      </div>
      <Grid container className="main-site-manager">
        {isLoading ? (
          <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
        ) : (
          siteData &&
          siteData.length > 0 &&
          siteData.map((site, index) => (
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

export default SiteManagers;
