import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import SitesTable from "../../components/sites/sitesTable/SitesTable";
import { Grid, Card, CardContent } from "@material-ui/core";
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
import {getDashboardsData} from "../../store/actions/dashboard.action";

const Sites = (props) => {
  const { siteData, isLoading, error } = props.sites;
  const [showInfo, setShowInfo] = useState(false);
  const [isMapView, setIsMapView] = useState(true);
  const [postcode, setPostcode] = useState("");
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const { info, loading } = props.dashboard;
  const [filters, setFilters] = useState({
    page: 1,
    geolocation: "",
  });

  useEffect(() => {
    async function fetchData() {
        !siteData && await props.getSitesList(filters);
        !info && await props.getDashboardsData('');
    }
    fetchData();
  }, []);

  // useEffect(() => {
  //   props.getSitesList(filters);
  // }, [filters]);

  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };
  const handleChangeSearch = (postcode) => {
    console.log('postcode', postcode)
    postcode.length > 4 && setPostcode(postcode);
  };
 
  const handleShowMap = () => {
    setIsMapView(!isMapView);
  };

  const handleMangerModal = () => {
    setIsManagerOpen(true);
  };

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode},+UK&sensor=false&&key=AIzaSyA6AYxz5ok7Wkt3SOsquumACIECcH933ws`,
      {
        method: "get",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0]?.geometry?.location;
          postcode.length > 4 &&
            setFilters({ ...filters, geolocation: `${lat},${lng}` });
        }
      });
  }, [postcode]);

  return (
    <>
      <CommonHeader
        bookSite={"Assign to manager"}
        handleShowMap={handleShowMap}
        isMap={isMapView}
        handleBookJob={handleMangerModal}
        downloadCSV={false}
        showButton={true}
      >
        <CommonJobStatus
          jobStatus={{
            status: "Sales",
            price: `£${info? parseFloat(info.TotalSpend).toLocaleString() : 0}`,
            statusName: "primary",
            width: "184px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Jobs",
            price: `${info? info.NumberOfJobs : 0}`,
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Sites",
            price: `${siteData? siteData.total : 0}`,
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
          </div>
        </Grid>
      </Grid>
      {isManagerOpen && (
        <AssignToManager handleClose={() => setIsManagerOpen(false)} />
      )}
      {isMapView ? (
        <>
          <Grid container className="sites-table-loader">
            {isLoading ? (
              <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
            ) : (
              siteData && (
                <>
                  <Grid item md={10}>
                    <SitesTable
                      data={siteData ? siteData.data : []}
                      pagination={siteData}
                      handlePagination={handlePagination}
                    />
                  </Grid>
                  {/* style={{ marginTop: "47px" }} */}
                  <Grid item md={2}>
                    {siteData ? (
                      siteData.data.map((site, index) => (
                        <CommonJobStatus
                          key={index}
                          jobStatus={{
                            status: "Sales By Site",
                            price: site
                              ? "£" + parseFloat(site.sales_by_site).toLocaleString()
                              : "£0",
                            statusName: "primary",
                            width: "194px",
                            height: "62px",
                            fontSize: "sales",
                            marginBottom: "16px",
                          }}
                        />
                      ))
                    ) : (
                      <div className="site-error">{error}</div>
                    )}
                  </Grid>{" "}
                </>
              )
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
