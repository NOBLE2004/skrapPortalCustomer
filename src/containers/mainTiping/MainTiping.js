import React, {useEffect, useState} from "react";
import DashboardFilter from "../../components/dashboard/filter/DashboardFilter";
import { Grid, Card, CardContent } from "@material-ui/core";
import {completeMarker, deliveredMarker, enRouteMarker, mapMarker, pendingMarker} from "../../assets/images";
import TipingCard from "../../components/tiping/TipingCard";
import MainMap from "../../components/map/MainMap";
import { Marker, InfoWindow } from "react-google-maps";
import { locationOval, craneIcon } from "../../assets/images";
import "./mainTiping.scss";
import TippingService from '../../services/tipping.service';
import {status} from "../../services/utils";
import Pagination from "../../components/reactTable/pagination";

const MainTiping = () => {
  const [card, setCard] = useState(false);
  const [tippingList, setTippingList] = useState([]);
  const [pagination, setPagination] = useState({});
    const [filters, setFilters] = useState({page: 1});

  const handleCard1 = (index) => {
    setCard(index);
  };
  useEffect(()=>{
      TippingService.list(filters).then((response) => {
          console.log(response.data?.data);
        if(response.data?.data) {
            setTippingList(response.data.data.data);
            delete response.data.data.data;
            setPagination(response.data.data)
        }
      }).catch((error)=>{
          console.log(error);
      })
  },[filters]);
    const handlePagination = (page) => {
        setFilters({...filters, page: page});
    };
  return (
    <div className="main-tiping">
      <div className="header-main">
        <div className="sites-header-title">Tiping Sites </div>
        <DashboardFilter title={"Tiping "} />
      </div>
      <Grid container>
        <Grid item xs={12} className="jobMpWp">
          <div className="live-job-title">
            <img src={mapMarker} alt="map-marker" />
            <h1>Sites On Map</h1>
          </div>
            <Pagination
                last={pagination.last_page}
                current={pagination.current_page}
                from={pagination.from}
                to={pagination.to}
                total={pagination.total}
                handleNext={(page)=>{handlePagination(page)}}
                handlePrevious={(page)=>{handlePagination(page)}}
            />
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
                  {tippingList?.map((tipping, index)=>{
                      return(<Marker
                          visible={true}
                          position={{
                              lat: tipping.lat ? parseFloat(tipping.lat) : 51.55063,
                              lng: tipping.lng ?  parseFloat(tipping.lng) : -0.0461,
                          }}
                          icon={craneIcon}
                          onClick={() => handleCard1(index)}
                      >

                          {card === index && (
                              <InfoWindow>
                                  <TipingCard
                                      jobInfo={{
                                          site: tipping.site_name,
                                          job_address: tipping.site_address,
                                          jobStatus: null,
                                          site_manager_mobile_number: null
                                      }}
                                      gotoJobDetail={()=>{}}
                                  />
                              </InfoWindow>
                          )}</Marker>)
                  })}
              </MainMap>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainTiping;
