import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import ManagerDetail from "../../components/siteManager/managerDetail/ManagerDetail";
import { viewMoreBtn } from "../../assets/images";
import FadeLoader from "react-spinners/FadeLoader";
import { getSiteManager } from "../../store/actions/siteManager.action";
import CreateManager from "../../components/modals/createManager/CreateManager";
import "./sitemanager.scss";
import UpdateManager from "../../components/modals/updateManager";

const SiteManagers = (props) => {
  const [isSiteBooked, setSiteBooked] = useState(false);
  const [updateManager, setUpdateManager] = useState({
    show: false,
    data: "",
  });
  const currency = localStorage.getItem("currency");
  const { sites } = props.siteManager;
  const handleBookSite = () => {
    setSiteBooked(true);
  };

  const getManagerList = () => {
    props.getSiteManager({ currency });
  };

  useEffect(() => {
    getManagerList();
  }, []);

  const handleManagerCreated = useCallback(() => {
    setSiteBooked(!isSiteBooked);
    props.getSiteManager({ currency });
  }, [isSiteBooked]);

  return (
    <div className="site-manager-margin">
      <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        {props.siteManager.sites && (
          <button className="header-btn" onClick={handleBookSite}>
            Create Manager
          </button>
        )}
      </div>
      <Grid container className="main-site-manager" spacing={5}>
        {props.siteManager.loading ? (
          <Box
             display="flex"
            my={2}
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "90%",
              background: "#fff",
              boxShadow: "0px 17px 24px rgb(58 58 58 / 5%) !important",
              borderRadius: "11.6836px",
              padding: "12px 12px",
             }}
          >
            <Stack spacing={1} px={2} width={'100%'}>
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
              <Skeleton variant='rounded' height={20} />
              <Skeleton variant='rectangular' width={'100%'} height={200} />
              <Skeleton variant='rounded' height={20} />
              <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
            </Stack>        </Box>
        ) : props.siteManager.sites && props.siteManager.sites.length > 0 ? (
          props.siteManager.sites.map((site, index) => (
            <Grid item xm={12} sm={8} md={6} key={index}>
              <ManagerDetail
                siteData={site}
                key={index}
                setUpdateManager={setUpdateManager}
              />
            </Grid>
          ))
        ) : (
          <div className="site-error">No manager's are available</div>
        )}
      </Grid>
      {isSiteBooked && (
        <CreateManager
          handleClose={() => setSiteBooked(!isSiteBooked)}
          updateManager={handleManagerCreated}
        />
      )}
      {updateManager?.show && (
        <UpdateManager
          handleClose={() => {
            setUpdateManager((st) => ({
              ...st,
              show: false,
              data: "",
            }));
          }}
          updateManager={updateManager}
          getManagerList={getManagerList}
        />
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
