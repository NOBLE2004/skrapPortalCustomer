import React, { useCallback, useEffect, useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import SitesTable from "../../components/sites/sitesTable/SitesTable";
import { Grid, Card, CardContent } from "@mui/material";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import MainMap from "../../components/map/MainMap";
import TipingCard from "../../components/tiping/TipingCard";
import { Marker, InfoWindow } from "react-google-maps";
import { enRouteMarker } from "../../assets/images/index";
import FadeLoader from "react-spinners/FadeLoader";
import { connect } from "react-redux";
import AssignToManager from "../../components/modals/assignToManager/AssignToManager";
import { getSites, getSitesList } from "../../store/actions/sites.action";
import "./sites.scss";
import { getDashboardsData } from "../../store/actions/dashboard.action";
import CreateSite from "../../components/modals/createSite/CreateSite";
import SiteFilters from "../../components/filters/SiteFilters";
import { getUserDataFromLocalStorage } from "../../services/utils";

const Sites = (props) => {
  const { siteData, isLoading, error } = props.sites;
  const [showInfo, setShowInfo] = useState(false);
  const [isJobCreated, setIsJobCreated] = useState(false);
  const [isMapView, setIsMapView] = useState(true);
  const [isReload, setIsReload] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const currency = localStorage.getItem("currency");
  const { info, loading } = props.dashboard;
  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    date: "",
    address: "",
  });
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchData() {
      !siteData && (await props.getSitesList(filters));
      !info && (await props.getDashboardsData(""));
    }

    fetchData();
    setUserData(getUserDataFromLocalStorage());
  }, []);

  useEffect(() => {
    const newFilter = { page: null, search: "" };
    if (isReload || !compare(newFilter, filters)) {
      props.getSitesList(filters);
    }
  }, [filters, isReload]);

  const compare = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  const handlePagination = (page) => {
    setFilters({ ...filters, page });
  };
  const handleChangeSearch = useCallback(
    (postcode) => {
      setSearch(postcode);
      setFilters({ ...filters, search: postcode });
    },
    [search, filters]
  );

  const handleShowMap = useCallback(() => {
    setIsMapView(!isMapView);
  }, [isMapView]);

  const handleMangerModal = useCallback(() => {
    setIsManagerOpen(true);
  }, [isManagerOpen]);

  const handleCreateJob = useCallback(() => {
    setIsJobCreated(true);
  }, [isJobCreated]);
  const handleCreateSite = useCallback(() => {
    console.log("test");
    setIsJobCreated(true);
  }, [isJobCreated]);

  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };

  return (
    <>
      <CommonHeader
        bookSite={"Assign to Manager"}
        handleShowMap={handleShowMap}
        isMap={isMapView}
        handleBookJob={handleMangerModal}
        downloadCSV={false}
        showButton={false}
        isSite={true}
        handleCreateSite={handleCreateSite}
      >
        {userData?.hide_price === 0 && (
          <CommonJobStatus
            jobStatus={{
              status: "Spend",
              price: `${currency ? currency : "£"}${
                info ? parseFloat(info.TotalSpend).toLocaleString() : 0
              }`,
              statusName: "primary",
              width: "184px",
              height: "84px",
            }}
          />
        )}
        <CommonJobStatus
          jobStatus={{
            status: "Jobs",
            price: `${info ? info.NumberOfJobs : 0}`,
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Sites",
            price: `${siteData ? siteData.total : 0}`,
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
      </CommonHeader>
      <Grid container>
        <Grid item md={12}>
          <div className="common-search-for-tables">
            <CommonSearch
              cname="postcode"
              handleChangeSearch={handleChangeSearch}
            />
            <SiteFilters handleChangeFilters={handleChangeFilters} />
          </div>
        </Grid>
      </Grid>
      {isManagerOpen && (
        <AssignToManager
          handleClose={() => setIsManagerOpen(false)}
          reload={() => setIsReload(!isReload)}
        />
      )}
      {isJobCreated && (
        <CreateSite
          closeModal={() => setIsJobCreated(false)}
          sites={true}
          reload={() => setIsReload(!isReload)}
        />
      )}
      {isMapView ? (
        <>
          <Grid container className="sites-table-loader">
            {isLoading ? (
              <FadeLoader color={"#518ef8"} loading={isLoading} width={4} />
            ) : siteData && siteData.data.length > 0 ? (
              <>
                <Grid item md={12} sm={12}>
                  <SitesTable
                    data={siteData ? siteData?.data : []}
                    pagination={siteData}
                    handlePagination={handlePagination}
                    reload={() => setIsReload(!isReload)}
                    searchData={search}
                  />
                </Grid>
              </>
            ) : (
              <div className="sitenotfound">No active sites found</div>
            )}
          </Grid>
        </>
      ) : (
        <Grid item md={12} className="site-manager-map-view">
          <Card className="mapCard">
            <CardContent>
              <MainMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA6AYxz5ok7Wkt3SOsquumACIECcH933ws`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={
                  <div style={{ height: `100%`, borderRadius: "12px" }} />
                }
              >
                {siteData &&
                  siteData.data.map((job, index) => {
                    return (
                      <Marker
                        position={{
                          lat: job.latitude
                            ? parseFloat(job.latitude)
                            : 51.55063,
                          lng: job.longitude
                            ? parseFloat(job.longitude)
                            : -0.0461,
                        }}
                        icon={enRouteMarker}
                        onClick={() => {
                          setShowInfo(index);
                        }}
                      >
                        {showInfo === index && (
                          <InfoWindow>
                            <TipingCard
                              jobInfo={{
                                job_address: job.job_address,
                                jobStatus: "",
                                site_manager_mobile_number: "",
                              }}
                              site="sites"
                            />
                          </InfoWindow>
                        )}
                      </Marker>
                    );
                  })}
              </MainMap>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};

const mapStateToProps = ({ sites, dashboard }) => {
  return { sites, dashboard };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSites: () => dispatch(getSites()),
    getSitesList: (filters) => dispatch(getSitesList(filters)),
    getDashboardsData: (year) => dispatch(getDashboardsData(year)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
