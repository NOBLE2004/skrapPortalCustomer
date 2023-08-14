import React, { useCallback, useEffect, useState } from "react";
import CommonHeader from "../../components/commonComponent/CommonHeader";
import CommonJobStatus from "../../components/commonComponent/commonJobStatus/CommonJobStatus";
import JobsTable from "../../components/reactTable/JobsTable";
import { Card, CardContent, Grid, Paper } from "@mui/material";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import LoadingButton from "@mui/lab/LoadingButton";

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
import CreateSite from "../../components/modals/createSite/CreateSite";
import "./mainjobs.scss";
import {
  getUserDataFromLocalStorage,
  payment,
  status,
} from "../../services/utils";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDashboardsData } from "../../store/actions/dashboard.action";
import {
  changeJobsFilter,
  getJobList,
  jobListFailure,
  jobListSuccess,
} from "../../store/actions/jobs.action";
import FadeLoader from "react-spinners/FadeLoader";
import * as Excel from "exceljs";
import { saveAs } from "file-saver";
import JobService from "../../services/job.service";

const MainJobsNew = (props) => {
  const dispatch = useDispatch();
  const jobsFilter = useSelector((state) => state?.jobsFilter);
  const [showInfoIndex, setShowInfoIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isMapView, setMapView] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isJobBooked, setIsJobBooked] = useState(false);
  const [createSite, setCreateSite] = useState(false);
  const [isJobCreated, setIsJobCreated] = useState(false);
  const currency = localStorage.getItem("currency");
  const [csvDownload, setCsvDownload] = useState(false);

  const [limit, setLimit] = useState(10);
  const { info, loading } = props.dashboard;
  const history = useHistory();
  const { jobData, isLoading, error } = props.jobs;
  const [filters, setFilters] = useState({
    status: "",
    date: "",
    service: "",
    page: 1,
    address: "",
    search: "",
    show_on_app: [0, 1],
    currency: currency,
  });
  let userData = getUserDataFromLocalStorage();

  const handleJobCreated = useCallback(() => {
    setIsJobCreated(!isJobCreated);
  }, [isJobCreated]);

  const handleCreateSite = useCallback(() => {
    setCreateSite(true);
  }, [createSite]);

  const getData = () => {
    dispatch(
      getJobList(
        { user_id: userData.user_id, limit, orders_type: 4 },
        jobsFilter
      )
    );

    dispatch(getDashboardsData(jobsFilter));
  };

  useEffect(() => {
    getData();
  }, [filters, isJobCreated]);

  const handleShowMap = useCallback(() => {
    if (isMapView === true) {
      setLimit(10000);
    } else {
      setLimit(10);
    }
    setMapView(!isMapView);
  }, [isMapView]);

  const handleBookJob = useCallback(() => {
    setIsJobBooked(true);
  }, [isJobBooked]);

  const handleMarkerClick = () => {
    setShowInfo(true);
  };
  const dumyplaces = [
    { latitude: 51.55063, longitude: -0.0461 },
    { latitude: 51.56078, longitude: -0.25256 },
  ];
  const handleChangeFilters = (filtersList) => {
    dispatch(changeJobsFilter({ ...jobsFilter, ...filtersList }));
    filtersList.show_on_app = [0, 1];
    filtersList.currency = currency;
    setFilters(filtersList);
  };
  const handleChangeSearch = (search) => {
     const duplicate = { ...jobsFilter };
    duplicate.search = search;
    dispatch(changeJobsFilter({ ...jobsFilter, ...duplicate }));
    setFilters({ ...filters, search: search });
  };

  const handlePagination = (page) => {
    const duplicate = { ...jobsFilter };
    duplicate.page = page;
    dispatch(changeJobsFilter({ ...jobsFilter, ...duplicate }));
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
  const [csvData, setCsvData] = useState([]);

  async function exTest() {
    var workbook = new Excel.Workbook();
    var worksheet = workbook.addWorksheet("Main sheet");
    worksheet.columns = [
      { header: "Order #", key: "job_id", width: 20 },
      { header: "Booked", key: "job_time", width: 20 },
      { header: "Delivery Date", key: "job_start_time", width: 20 },
      { header: "Address", key: "job_address", width: 20 },
      { header: "Postcode", key: "postcode", width: 20 },
      { header: "Site Contact", key: "mobile_number", width: 20 },
      { header: "Service", key: "service_name", width: 20 },
      { header: "Cost", key: "transaction_cost", width: 20 },
      { header: "Status", key: "appointment_status", width: 20 },
      { header: "Rebate", key: "rebate", width: 20 },
      { header: "Pallets", key: "pallets", width: 20 },
      { header: "Utilisation (%)", key: "utilization", width: 20 },
      { header: "CO2 (Kg)", key: "co2", width: 20 },
      { header: "Weight (Ton)", key: "weight", width: 20 },
    ];
    worksheet.addRows(csvData);
    workbook.xlsx
      .writeBuffer()
      .then(function (buffer) {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `Orders-${new Date().toLocaleDateString()}.xlsx`
        );
        //setShowMore(false);
        setCsvData([]);
      })
      .catch(() => {
        //setShowMore(false);
      });
  }
  useEffect(() => {
    if (csvData.length > 0) {
      exTest();
    }
  }, [csvData]);
  const downloadExcel = () => {
    setCsvDownload(true);
    const params = Object.entries(jobsFilter).reduce(
      (a, [k, v]) => (v ? ((a[k] = v), a) : a),
      {}
    );
    JobService.list(
      { user_id: userData.user_id, noPaginate: 1, orders_type: 4, all: true },
      params
    )
      .then((res) => {
        setCsvData(
          res?.data?.result?.data.map((obj) => {
            obj.job_id = `SK${obj?.job_id}`;
            obj.transaction_cost = `${currency}${obj?.transaction_cost}`;
            obj.job_time = new Date(obj?.job_time).toLocaleDateString();
            obj.job_start_time = new Date(obj.job_start_time)
              .toLocaleString()
              .substring(0, 17);
            obj.utilization =
              obj?.utilization > 0 ? `${obj?.utilization?.toFixed(2)}%` : `0%`;
            obj.co2 = obj?.co2 > 0 ? `${obj?.co2?.toFixed(2)}kg` : `0kg`;
            obj.rebate =
              obj?.rebate > 0
                ? `${currency}${obj?.rebate?.toFixed(2)}`
                : `${currency}0`;
            if (obj.parent_id == 2) {
              obj.service_name = `${obj?.service_name} ${
                obj?.exchanged_by > 0 ? `(Exchange)` : ``
              }`;
            } else if (obj.parent_id != 2) {
              obj.service_name = `${obj?.service_name} ${
                obj?.extended_job_id > 0 ? `(Extension)` : ``
              }`;
            }
            obj.appointment_status = status(obj?.appointment_status);
            return obj;
          })
        );
        setCsvDownload(false);
      })
      .catch((err) => {
        console.log(err);
        setCsvDownload(false);
      });
  };

  return (
    <div>
      <CommonHeader
        bookSite={"Create Job"}
        handleShowMap={handleShowMap}
        isMap={isMapView}
        handleBookJob={handleBookJob}
        handleCreateSite={handleCreateSite}
        downloadCSV={false}
        showButton={true}
      >
        <Grid item container spacing={1}>
          {userData?.hide_price === 0 && (
            <CommonJobStatus
              jobStatus={{
                status: "Spend",
                price: `${currency ? currency : "£"}${
                  info ? parseFloat(info.TotalSpend).toLocaleString() : 0
                }`,
                statusName: "primary",
              }}
            />
          )}
          <CommonJobStatus
            jobStatus={{
              status: "Jobs",
              price: `${
                info ? parseFloat(info.NumberOfJobs).toLocaleString() : 0
              }`,
              statusName: "primary",
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Pending",
              price: `${info ? info.Pending : 0}`,
              statusName: "pending",
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Completed",
              price: `${
                info ? parseFloat(info.Completed).toLocaleString() : 0
              }`,
              statusName: "completed",
            }}
          />
          <CommonJobStatus
            jobStatus={{
              status: "Delivered",
              price: `${info ? info.Delivered : 0}`,
              statusName: "delivered",
            }}
          />
        </Grid>
      </CommonHeader>
      <div className="jobs-search-header">
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CommonSearch
              handleChangeSearch={handleChangeSearch}
              cname="jobs"
              jobsFilter={jobsFilter}
            />
          </Grid>
          <Grid item xs={8}>
            <JobFilters handleChangeFilters={handleChangeFilters} />
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: "10px",
            cursor: "pointer",
          }}
        >
          <LoadingButton
            color="primary"
            variant="contained"
            sx={{
              background: "rgb(81, 142, 248)",
              borderRadius: "64px",
              color: "#fff",
              fontFamily: "DM Sans",
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "12px",
              "&:hover": {
                background: "rgb(81, 142, 248)",
              },
            }}
            loading={csvDownload}
            onClick={downloadExcel}
          >
            Download CSV
          </LoadingButton>
        </div>
      </div>
      {isMapView ? (
        <>
          {isLoading ? (
            <div className="loader">
              <FadeLoader color={"#518ef8"} loading={isLoading} width={4} />
            </div>
          ) : props.jobs.error ? (
            <div className="jobs-not-found">{props.jobs.error}</div>
          ) : (
            jobData && (
              <JobsTable
                data={jobData?.data ? jobData?.data : []}
                pagination={jobData}
                handleUpdateJobs={handleJobCreated}
                handlePagination={handlePagination}
              />
            )
          )}
          {jobData?.data?.length &&
            userData.personal_detail.first_name.includes("Amazon") && (
                <>
                    {currency == '$' ? (<Paper className="box" style={{ width: "15%", padding: "1%" }}>
                        <span>*</span>
                        <span>100% skip utilisation</span>
                        <span>Wood = 2.5 Tonnes</span>
                        <span>General = 2 Tonnes</span>
                        <span>Plastic = 1.5 Tonnes</span>
                        <span>Cardboard = 1 Tonnes</span>
                    </Paper>) : (<Paper className="box" style={{ width: "15%", padding: "1%" }}>
                            <span>*</span>
                            <span>100% skip utilisation</span>
                            <span>Wood = 3.5 Tonnes</span>
                            <span>General = 3 Tonnes</span>
                            <span>Plastic = 2.5 Tonnes</span>
                            <span>Cardboard = 2 Tonnes</span>
                        </Paper>)}
                </>
            )}
        </>
      ) : (
        <>
          {isLoading ? (
            <div className="loader">
              <FadeLoader color={"#518ef8"} loading={isLoading} width={4} />
            </div>
          ) : (
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
                        color={"#518ef8"}
                        loading={isLoading}
                        width={4}
                      />
                    </div>
                  ) : (
                    jobData && (
                      <>
                        {jobData?.data?.map((job, index) => {
                          return (
                            <Marker
                              position={{
                                lat: Number(job.latitude),
                                lng: Number(job.longitude),
                              }}
                              icon={
                                status(job.appointment_status) === "Pending"
                                  ? pendingMarker
                                  : status(job.appointment_status) ===
                                    "Completed"
                                  ? completeMarker
                                  : status(job.appointment_status) === "Heading"
                                  ? cancelMarker
                                  : status(job.appointment_status) ===
                                    "Delivered"
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
                            >
                              {showInfo && showInfoIndex === index && (
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
                                        selectedItem.site_contact_number !==
                                        null
                                          ? selectedItem.site_contact_number
                                          : selectedItem.mobile_number,
                                    }}
                                    gotoJobDetail={() =>
                                      gotoJobDetail(selectedItem.job_id)
                                    }
                                  />
                                </InfoWindow>
                              )}
                            </Marker>
                          );
                        })}

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
          )}
        </>
      )}

      {isJobBooked && (
        <CreateJob
          closeModal={() => setIsJobBooked(!isJobBooked)}
          handleJobCreated={handleJobCreated}
        />
      )}
      {createSite && (
        <CreateSite
          closeModal={() => setCreateSite(!createSite)}
          sites={true}
        />
      )}
    </div>
  );
};
const mapStateToProps = ({ dashboard, jobs }) => {
  return { dashboard, jobs };
};

export default connect(mapStateToProps)(MainJobsNew);
