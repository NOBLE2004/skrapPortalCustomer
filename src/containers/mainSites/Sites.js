import React, { useCallback, useEffect, useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import SitesTable from "../../components/sites/sitesTable/SitesTable";
import {Grid, Card, CardContent, Box, Stack, Skeleton} from "@mui/material";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import MainMap from "../../components/map/MainMap";
import TipingCard from "../../components/tiping/TipingCard";
import { Marker, InfoWindow } from "react-google-maps";
import { enRouteMarker } from "../../assets/images/index";
import FadeLoader from "react-spinners/FadeLoader";
import { connect, useDispatch, useSelector } from "react-redux";
import AssignToManager from "../../components/modals/assignToManager/AssignToManager";
import {
  changeSiteFilter,
  getSites,
  getSitesList,
} from "../../store/actions/sites.action";
import "./sites.scss";
import { getDashboardsData } from "../../store/actions/dashboard.action";
import CreateSite from "../../components/modals/createSite/CreateSite";
import SiteFilters from "../../components/filters/SiteFilters";
import { getUserDataFromLocalStorage } from "../../services/utils";
import TableLoader from "../../components/commonComponent/tableLoader";

const Sites = (props) => {
  const { siteData, isLoading, error } = props.sites;
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(false);
  const [isJobCreated, setIsJobCreated] = useState(false);
  const [isMapView, setIsMapView] = useState(true);
  const [isReload, setIsReload] = useState(false);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const currency = localStorage.getItem("currency");
  const { info, loading } = props.dashboard;
  const siteFilter = useSelector((state) => state?.sitesFilter);
  const [filters, setFilters] = useState(
    siteFilter);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setUserData(getUserDataFromLocalStorage());
  }, []);

  const getData = () => {
    console.log(siteFilter);
    dispatch(getSitesList(siteFilter));
    dispatch(getDashboardsData(siteFilter));
  };

  useEffect(() => {
    getData();
  }, [filters, isReload]);

  const compare = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

  const handlePagination = (page) => {
    const duplicate = { ...siteFilter };
    duplicate.page = page;
    dispatch(changeSiteFilter({ ...siteFilter, ...duplicate }));
    setFilters({ ...filters, page: page });
  };

  const handleChangeSearch = (search) => {
    const duplicate = { ...siteFilter };
    duplicate.search = search;
    dispatch(changeSiteFilter({ ...siteFilter, ...duplicate }));
    setFilters({ ...filters, search: search });
  };

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
    dispatch(changeSiteFilter({ ...siteFilter, ...filtersList }));
    filtersList.show_on_app = [0, 1];
    filtersList.currency = currency;
    setFilters(filtersList);
  };

  console.log({ filters })

  const handleReset = () => {
    setFilters({
      page: 1,
      search: "",
      date: "",
      currency: currency,
      site: "",
      address: ""
    });
    dispatch(changeSiteFilter({
      page: 1,
      search: "",
      date: "",
      currency: currency,
      site: "",
      address: ""
    }));
  };
  const setLimit = (limit) => {
    console.log(limit);
    const duplicate = { ...siteFilter };
    duplicate.limit = limit;
    dispatch(changeSiteFilter({ ...siteFilter, ...duplicate }));
    setFilters({ ...filters, limit: limit });
  }

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
        {loading ? (
            <Grid container spacing={1} px={2} gap={2}>
              <Grid item xs={1.5}>
                <Skeleton variant='rounded' sx={{ fontSize: '5rem', borderRadius: "8px" }} />
              </Grid>
              <Grid item xs={1.5}>
                <Skeleton variant='rounded' sx={{ fontSize: '5rem', borderRadius: "8px" }} />
              </Grid>
              <Grid item xs={1.5}>
                <Skeleton variant='rounded' sx={{ fontSize: '5rem', borderRadius: "8px" }} />
              </Grid>
            </Grid >
        ) : (
            <Grid item container spacing={1}>
              {userData?.hide_price === 0 && (
                  <CommonJobStatus
                      jobStatus={{
                        status: "Spend",
                        price: `${currency ? currency : "£"}${info ? parseFloat(info.TotalSpend).toLocaleString() : 0
                        }`,
                        statusName: "primary",
                      }}
                  />
              )}
              <CommonJobStatus
                  jobStatus={{
                    status: "Jobs",
                    price: info ? parseFloat(info.NumberOfJobs).toLocaleString() : 0,

                    statusName: "primary",
                  }}
              />
              <CommonJobStatus
                  jobStatus={{
                    status: "Sites",
                    price: `${siteData ? siteData.total : 0}`,
                    statusName: "primary",
                  }}
              />
            </Grid>
        )
        }
      </CommonHeader>

      <div className="common-search-for-tables">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={4}>
            <CommonSearch
              cname=""
              handleChangeSearch={handleChangeSearch}
              jobsFilter={siteFilter}
            />
          </Grid>
          <Grid item xs={8}>
            <SiteFilters
              name="site"
              handleReset={handleReset}
              filters={filters}
              setFilters={setFilters}
              handleChangeFilters={handleChangeFilters}

            />
          </Grid>
        </Grid>
      </div>

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
              <Box padding={2}
                sx={{
                  background: "#fff",
                  boxShadow: "0px 17px 24px rgb(58 58 58 / 5%) !important",
                  borderRadius: "11.6836px",
                  width: "100%"
                }}
              >
                <Stack spacing={1}>
                  <Grid container spacing={2}>
                    <TableLoader />
                  </Grid>
                </Stack>
              </Box>) : siteData && siteData.data.length > 0 ? (
                <>
                  <Grid item md={12} sm={12}>
                    <SitesTable
                      data={siteData ? siteData?.data : []}
                      pagination={siteData}
                      handlePagination={handlePagination}
                      limit={siteFilter?.limit}
                      reload={() => setIsReload(!isReload)}
                      searchData={search}
                      setLimit={setLimit}
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
    getSitesList: (filters) => dispatch(getSitesList(filters)),
    getDashboardsData: (year) => dispatch(getDashboardsData(year)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
