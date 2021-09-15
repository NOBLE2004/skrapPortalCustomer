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
const DriverDetail = () => {
  const [value, setValue] = React.useState(2);
  return (
    <Card className="manager-detail-main">
      <CardContent>
        <div className="title">{"Drivers Details"}</div>
        <Grid container spacing={3} className="manager-sub-detail">
          <Grid item md={4} className="profile-info">
            <img src={personImage} alt="person-img" />
            <div className="p-title">Action</div>
            <div className="profile-action">
              <img src={showIcon} alt="person-img" />
              <div className="edit-title">View</div>
            </div>
            <div className="profile-action">
              <img src={refreshIcon} alt="person-img" />
              <div className="edit-title">Update</div>
            </div>
            <div className="profile-action">
              <img src={emailIcon} alt="person-img" />
              <div className="edit-title">Message</div>
            </div>
            <div className="profile-action">
              <img src={phoneCall} alt="person-img" />
              <div className="edit-title">Call</div>
            </div>
          </Grid>
          <Grid item md={8} className="personal-info">
            <Grid container>
              <Grid item md={6} className="personal-info">
                <div className="info">
                  <div className="designation">Manager</div>
                  <div className="personal-title">Terri Ongolo</div>
                </div>
                <div className="info">
                  <div className="designation">Site Assigned</div>
                  <div className="personal-title">Hackney Site</div>
                </div>
                <div className="info">
                  <div className="designation">Address</div>
                  <div className="personal-title">
                    113 Ibsley, Gardens London, SW15 4NQ
                  </div>
                </div>
                <div className="info">
                  <div className="designation">Email</div>
                  <div className="personal-title">terriongolo@gmail.com</div>
                </div>
                <div className="info">
                  <div className="designation">Phone</div>
                  <div className="personal-title">0745678955</div>
                </div>
              </Grid>
              <Grid item md={6} className="personal-info">
                <div className="info">
                  <div className="designation">Manager</div>
                  <div className="personal-title">Terri Ongolo</div>
                </div>
                <div className="info">
                  <div className="designation">Site Assigned</div>
                  <div className="personal-title">Hackney Site</div>
                </div>
                <div className="info">
                  <div className="designation">Address</div>
                  <div className="personal-title">
                    113 Ibsley, Gardens London, SW15 4NQ
                  </div>
                </div>
                <div className="info">
                  <div className="designation">Email</div>
                  <div className="personal-title">terriongolo@gmail.com</div>
                </div>
                <div className="info">
                  <div className="designation">Phone</div>
                  <div className="personal-title">0745678955</div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={12}>
            <div className="rating">
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
            </div>
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
                      lat: 51.55063,
                      lng: -0.0461,
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
