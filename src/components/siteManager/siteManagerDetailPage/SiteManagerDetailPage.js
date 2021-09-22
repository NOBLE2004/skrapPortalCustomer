import React, { useState, useEffect } from "react";
import CommonHeader from "../../commonComponent/CommonHeader";
import NewManagerDetail from "../newManagerDetail/NewManagerDetail";
import SiteManagerTable from "../siteManagerTable/SiteManagerTable";
import { Card, CardContent, Grid } from "@material-ui/core";
import MainMap from "../../map/MainMap";
import CommonSearch from "../../commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../../commonComponent/commonfilter/CommonFilter";
import TipingCard from "../../tiping/TipingCard";
import { Marker, InfoWindow } from "react-google-maps";
import { enRouteMarker } from "../../../assets/images";
import sitesService from "../../../services/sites.service";
import NewMapDirectionsRenderer from "../../map/NewMapDirectionsRenderer";
import FadeLoader from "react-spinners/FadeLoader";
import JobFilters from "../../filters/jobFilters";
import { useParams } from "react-router";
import "./siteManagerDetailPage.scss";
const SiteManagerDetailPage = () => {
  const { id } = useParams();
  const [isMapView, setMapView] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isJobBooked, setIsJobBooked] = useState(false);
  const [updateJobs, setUpdateJobs] = useState(false);
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
    managerData: [],
    isCreateManager:false
  });

  const { isLoading, managerData , isCreateManager } = state;
  const handleShowMap = () => {
    setMapView(!isMapView);
  };
  const handleCreateManager = () => {
    setState({...state , isCreateManager : true})
  };
  const handleBookJob = () => {
    setIsJobBooked(true);
  };
  const handleMarkerClick = () => {
    setShowInfo(true);
  };

  const dumyplaces = [
    { latitude: 51.55063, longitude: -0.0461 },
    { latitude: 51.56078, longitude: -0.25256 },
  ];

  const handleChangeSearch = (search) => {
    setFilters({ ...filters, search: search });
  };
  const handleUpdateJobs = () => {
    setUpdateJobs(true);
  };
  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };
  useEffect(() => {
    setState({ ...state, isLoading: true });
    sitesService
      .showManagerDetail(id)
      .then((res) => {
        setState({ ...state, managerData: res.data, isLoading: false });
      })
      .catch((error) => {
        setState({ ...state, isLoading: false });
      });
  }, []);
  return (
    <div className="site-manager-detail-page-main">
     <div className="header-main">
        <div className="sites-header-title">Site Managers </div>
        <button className="header-btn" onClick={handleCreateManager}>
          Create Manager
        </button>
      </div>
      <Grid container className="manager-detail-page">
        {isLoading ? (
          <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
        ) : (
          <>
            <Grid item md={12}>
              <NewManagerDetail managerData={managerData} />
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

            {isMapView ? (
              <SiteManagerTable managerData={managerData} />
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
                      <Marker
                        position={{
                          lat: 51.55063,
                          lng: -0.0461,
                        }}
                        icon={enRouteMarker}
                        onClick={() => {
                          setShowInfo(!showInfo);
                        }}
                      />
                      {showInfo && (
                        <InfoWindow
                          position={{
                            lat: 51.56078,
                            lng: -0.25256,
                          }}
                        >
                          <TipingCard />
                        </InfoWindow>
                      )}

                      {showInfo && (
                        <NewMapDirectionsRenderer
                          places={dumyplaces}
                          onMarkerClick={handleMarkerClick}
                          info={showInfo}
                        />
                      )}
                    </MainMap>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default SiteManagerDetailPage;
