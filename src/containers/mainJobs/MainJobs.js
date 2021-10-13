import React, { useEffect, useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import JobsTable from "../../components/reactTable/JobsTable";
import { Card, CardContent } from "@material-ui/core";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import TipingCard from "../../components/tiping/TipingCard";
import {
  enRouteMarker,
  pendingMarker,
  completeMarker,
  deliveredMarker,
  cancelMarker,
} from "../../assets/images";
import NewMapDirectionsRenderer from "../../components/map/NewMapDirectionsRenderer";
import CommonSearch from "../../components/commonComponent/commonSearch/CommonSearch";
import JobFilters from "../../components/filters/jobFilters";
import CreateJob from "../../components/modals/createJob/CreateJob";
import "./mainjobs.scss";
import {
  getUserDataFromLocalStorage,
  payment,
  status,
} from "../../services/utils";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDashboardsData } from "../../store/actions/dashboard.action";
import { getJobList } from "../../store/actions/jobs.action";
import FadeLoader from "react-spinners/FadeLoader";

const MainJobs = (props) => {
  const [showInfoIndex, setShowInfoIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMapView, setMapView] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isJobBooked, setIsJobBooked] = useState(false);
  const [isJobCreated, setIsJobCreated] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [updateJobs, setUpdateJobs] = useState(false);
  const [limit, setLimit] = useState(10);
  const { info, loading } = props.dashboard;
  const history = useHistory();
  const { jobData, isLoading, error } = props.jobs;
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    service: "",
    address: "",
    search: "",
    page: 1,
  });
    let userData = getUserDataFromLocalStorage();
    const handleJobCreated = () => {
      setIsJobCreated(true)
    }
    useEffect(() => {
        async function fetchData() {
            await props.getJobList({user_id: userData.user_id, limit, orders_type: 4}, filters);
            await props.getDashboardsData('');
        }
        fetchData();
    }, [filters, updateJobs, limit, isJobCreated]);
  const handleShowMap = () => {
    if (isMapView === true) {
      setLimit(10000);
    } else {
      setLimit(10);
    }
    setMapView(!isMapView);
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
  const gotoJobDetail = (id) => {
    history.push({ pathname: `job-detail/${id}` });
  };

  const places = [
    {
      latitude: Number(selectedItem?.latitude),
      longitude: Number(selectedItem?.longitude),
    },
    {
      latitude: Number(selectedItem?.destination_lat),
      longitude: Number(selectedItem?.destination_lng),
    },
  ];
  return (
    <div>
      <CommonHeader
        bookSite={"Create Job"}
        handleShowMap={handleShowMap}
        isMap={isMapView}
        handleBookJob={handleBookJob}
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
            price: `${info ? info.NumberOfJobs : 0}`,
            statusName: "primary",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Pending",
            price: `${info ? info.Pending : 0}`,
            statusName: "pending",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Completed",
            price: `${info ? info.Completed : 0}`,
            statusName: "completed",
            width: "115px",
            height: "84px",
          }}
        />
        <CommonJobStatus
          jobStatus={{
            status: "Delivered",
            price: `${info ? info.Delivered : 0}`,
            statusName: "delivered",
            width: "115px",
            height: "84px",
          }}
        />
      </CommonHeader>
      <div className="jobs-search-header">
        <CommonSearch handleChangeSearch={handleChangeSearch} cname="jobs" />
        <JobFilters handleChangeFilters={handleChangeFilters} />
      </div>
      {isMapView ? (
        <>
          {isLoading ? (
            <div className="loader">
              <FadeLoader color={"#29a7df"} loading={isLoading} width={4} />
            </div>
          ) : props.jobs.error ? (
            <div className="jobs-not-found">{props.jobs.error}</div>
          ) : (
            jobData && (
              <JobsTable
                data={jobData?.data ? jobData?.data : []}
                pagination={jobData}
                handleUpdateJobs={handleUpdateJobs}
                handlePagination={handlePagination}
              />
            )
          )}
        </>
      ) : (
        <>
          {/* <div className="live-job-title">
            <img src={mapMarker} alt="map-marker" />
            <h1>Orders On Map</h1>
          </div> */}
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
                {isLoading ? (
                  <div className="loader">
                    <FadeLoader
                      color={"#29a7df"}
                      loading={isLoading}
                      width={4}
                    />
                  </div>
                ) : (
                  jobData && (
                    <>
                      {jobData?.data.map((job, index) => {
                        return (
                          <Marker
                            position={{
                              lat: Number(job.latitude),
                              lng: Number(job.longitude)
                            }}
                            icon={
                              status(job.appointment_status) === "Pending"
                                ? pendingMarker
                                : status(job.appointment_status) === "Completed"
                                ? completeMarker
                                : status(job.appointment_status) === "Heading"
                                ? cancelMarker
                                : status(job.appointment_status) === "Delivered"
                                ? deliveredMarker
                                : status(job.appointment_status) === "Ongoing"
                                ? enRouteMarker
                                : cancelMarker
                            }
                            onClick={() => {
                              setSelectedItem(job);
                              setShowInfo(true);
                              setShowInfoIndex(index);
                            }}
                          ></Marker>
                        );
                      })}

                      {showInfo && (
                        <InfoWindow
                          position={{
                            lat:
                              selectedItem.destination_lat === 0
                                ? selectedItem.latitude
                                : Number(selectedItem.destination_lat),
                            lng:
                              selectedItem.destination_lng === 0
                                ? selectedItem.longitude
                                : Number(selectedItem.destination_lng),
                          }}
                        >
                          <TipingCard
                            jobInfo={{
                              job_address: selectedItem.job_address,
                              jobStatus: status(
                                selectedItem.appointment_status
                              ),
                              site_manager_mobile_number:
                                selectedItem.site_contact_number !== null
                                  ? selectedItem.site_contact_number
                                  : selectedItem.mobile_number,
                            }}
                            gotoJobDetail={() =>
                              gotoJobDetail(selectedItem.job_id)
                            }
                          />
                        </InfoWindow>
                      )}

                      {selectedItem &&
                        selectedItem.appointment_status === 2 && (
                          <NewMapDirectionsRenderer
                            places={places}
                            travelMode={window.google.maps.TravelMode.DRIVING}
                            onMarkerClick={handleMarkerClick}
                          />
                        )}
                    </>
                  )
                )}
              </MainMap>
            </CardContent>
          </Card>
        </>
      )}

      {isJobBooked && (
        <CreateJob
          closeModal={() => setIsJobBooked(!isJobBooked)}
          handleJobCreated={handleJobCreated}
        />
      )}
    </div>
  );
};
const mapStateToProps = ({ dashboard, jobs }) => {
  return { dashboard, jobs };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getDashboardsData: (year) => dispatch(getDashboardsData(year)),
    getJobList: (data, filters) => dispatch(getJobList(data, filters)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainJobs);
