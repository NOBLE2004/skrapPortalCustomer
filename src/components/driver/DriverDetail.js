import React from "react";
import Rating from "@material-ui/lab/Rating";
import { Grid, Card, CardContent } from "@material-ui/core";
import MainMap from "../map/MainMap";
import { Marker } from "react-google-maps";
import {
  personImage,
  emailIcon,
  refreshIcon,
  phoneCall,
  showIcon,
  locationOval
} from "../../assets/images";
import "./driverDetail.scss";
const DriverDetail = ({job}) => {
  const [value, setValue] = React.useState(2);
  return (
    <Card className="manager-detail-main">
      <CardContent>
        <div className="title">{"Drivers Details"}</div>
        <Grid container spacing={3} className="manager-sub-detail">
          <Grid item md={4} className="profile-info">
            <img src={personImage} alt="person-img" />
            {/*<div className="p-title">Action</div>
            <div className="profile-action">
              <img src={phoneCall} alt="person-img" />
              <div className="edit-title">Call</div>
            </div>*/}
          </Grid>
          <Grid item md={8} className="personal-info">
            <Grid container>
              <Grid item md={6} className="personal-info">
                <div className="info">
                  <div className="designation">Driver</div>
                  <div className="personal-title">{job?.driver_first_name ? job?.driver_first_name : '-------------'}</div>
                </div>
                <div className="info">
                  <div className="designation">Phone</div>
                  <div className="personal-title">{job?.driver_number ? job?.driver_number : '-------------'}</div>
                </div>
              </Grid>
              {/*<Grid item md={6} className="personal-info">
                <div className="info">
                  <div className="designation">Manager</div>
                  <div className="personal-title">{job?.manager_first_name ? job?.manager_first_name : '-------------'}</div>
                </div>
                <div className="info">
                  <div className="designation">Phone</div>
                  <div className="personal-title">{job?.manager_number ? job?.manager_number : '-------------'}</div>
                </div>
              </Grid>*/}
            </Grid>
          </Grid>
        </Grid>
        <Grid container style={{marginTop: '5px'}}>
          <Grid item md={12}>
            {/*<div className="rating">
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
              <div
                className="normal-dsans-10-dark"
                style={{ paddingLeft: "7px" }}
              >
                Rate Driver <span className="bold-dsans-12-primary">Here</span>
              </div>
            </div>*/}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Card className="driver-mapCard">
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
                      lat: job?.driver_location ? parseFloat(job?.driver_location?.lat) : 51.55063,
                      lng: job?.driver_location ? parseFloat(job?.driver_location?.lng) : -0.0461,
                    }}
                    icon={locationOval}
                  ></Marker>
                </MainMap>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DriverDetail;
