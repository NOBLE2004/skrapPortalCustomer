import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import SitesTable from "../../components/sites/sitesTable/SitesTable";
import { Grid, Card, CardContent } from "@material-ui/core";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import CommonFilter from "../../components/commonComponent/commonfilter/CommonFilter";
import sitesService from "../../services/sites.service";
import JobFilters from "../../components/filters/jobFilters";
import Pagination from "../../components/reactTable/pagination";
import MainMap from "../../components/map/MainMap";
import TipingCard from "../../components/tiping/TipingCard";
import { Marker, InfoWindow } from "react-google-maps";
import { enRouteMarker } from "../../assets/images/index";
import NewMapDirectionsRenderer from "../../components/map/NewMapDirectionsRenderer";
import FadeLoader from "react-spinners/FadeLoader";
import "./sites.scss";

const Sites = () => {
  const [siteData, setSiteData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [updateJobs, setUpdateJobs] = useState(false);
  const [pagination, setPagination] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [isMapView, setIsMapView] = useState(true);

  const [filters, setFilters] = useState({
    status: "",
    date: "",
    service: "",
    address: "",
    search: "",
    page: 1,
  });


  useEffect(() => {
    setIsLoading(true);
    sitesService
      .getSitesList(limit, filters)
      .then((res) => {
        setSiteData(res.data.data.data);
        delete res.data.data;
        setPagination(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

  const handleChangeFilters = (filtersList) => {
    setFilters(filtersList);
  };
  const handleChangeSearch = (search) => {
    setFilters({ ...filters, search: search });
  };

  const handleUpdateJobs = () => {
    setUpdateJobs(true);
  };
  const handlePagination = (page) => {
    setFilters({ ...filters, page: page });
  };
  const handleMarkerClick = () => {
    setShowInfo(true);
  };
  const handleShowMap = () => {
    setIsMapView(!isMapView);
  };

  console.log("siteData", siteData);
  return (
    <>
      <CommonHeader handleShowMap={handleShowMap} isMap={isMapView}>
        <CommonJobStatus
          jobStatus={{
            status: "Sales",
            price: "£7,142.00",
            statusName: "primary",
            width: "184px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Jobs",
            price: "10",
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Sites",
            price: "8",
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
            {/* <JobFilters handleChangeFilters={handleChangeFilters} /> */}
          </div>
        </Grid>
      </Grid>
      {isMapView ? (
        <Grid container className="sites-table-loader">
          {isLoading ? (
            <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
          ) : (
            <>
              <Grid item md={10}>
                <SitesTable
                  data={siteData}
                  pagination={pagination}
                  handleUpdateJobs={handleUpdateJobs}
                  handlePagination={handlePagination}
                />
              </Grid>
              <Grid item md={2} style={{ marginTop: "47px" }}>
                {siteData &&
                  siteData.map((site, index) => (
                    <CommonJobStatus
                      key={index}
                      jobStatus={{
                        status: "Sales By Site",
                        price: site ? "£" + site.sales_by_site : "£7,142.00",
                        statusName: "primary",
                        width: "194px",
                        height: "62px",
                        fontSize: "sales",
                        marginBottom: "16px",
                      }}
                    />
                  ))}
              </Grid>
            </>
          )}
        </Grid>
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
                {siteData.map((job, index) => {
                  return (
                    <Marker
                      position={{
                        lat: job.latitude ? parseFloat(job.latitude) : 51.55063,
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

export default Sites;
