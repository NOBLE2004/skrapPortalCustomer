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
import Pagination from "../../components/reactTable/pagination";
import {getTippingList} from "../../store/actions/tipping.action";
import {connect} from "react-redux";

const MainTiping = (props) => {
  const [card, setCard] = useState(false);
  const [pagination, setPagination] = useState({});
  const [postcode, setPostcode] = useState('');
  const [filters, setFilters] = useState({page: 1, geolocation: ''});
  const {tippingList, isLoading, error} = props.tippings;
  const handleCard1 = (index) => {
    setCard(index);
  };
    useEffect(() => {
        async function fetchData() {
            if (!tippingList) {
                await props.getTippingList(filters);
            }
        }
        fetchData();
    }, []);
    useEffect(()=> {
        async function fetchData() {
            await props.getTippingList(filters);
        }
        fetchData();
    }, [filters])
    useEffect(()=>{
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${postcode},+UK&sensor=false&&key=AIzaSyA6AYxz5ok7Wkt3SOsquumACIECcH933ws`, {
            method: 'get',
        })
            .then(response => response.json())
            .then(data => {
                if(data.results.length > 0){
                    const {lat, lng} = data.results[0]?.geometry?.location;
                    postcode.length > 4 && setFilters({...filters, geolocation: `${lat},${lng}`});
                }
            });

    }, [postcode]);
    const handlePagination = (page) => {
        setFilters({...filters, page: page});
    };
    const handelSearch = postcode => {
        postcode.length > 4 && setPostcode(postcode);
    };
  return (
    <div className="main-tiping">
      <div className="header-main">
        <div className="sites-header-title">Tiping Sites </div>
        <DashboardFilter handelSearch={handelSearch} title={"Tiping "} />
      </div>
      <Grid container>
        <Grid item xs={12} className="jobMpWp">
          <div className="live-job-title">
            <img src={mapMarker} alt="map-marker" />
            <h1>Sites On Map</h1>
          </div>
            <Pagination
                last={tippingList?.last_page}
                current={tippingList?.current_page}
                from={tippingList?.from}
                to={tippingList?.to}
                total={tippingList?.total}
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
                  {tippingList?.data?.map((tipping, index)=>{
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
const mapStateToProps = ({ tippings }) => {
    return { tippings };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getTippingList: (filters) => dispatch(getTippingList(filters)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainTiping);
