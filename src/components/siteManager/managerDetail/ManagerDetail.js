import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import "./managerdetail.scss";
const ManagerDetail = ({ title }) => {
  return (
    <Card className="manager-detail-main">
      <CardContent>
        <div className="title">{title ? title : "Managers Details"}</div>
        <Grid container spacing={3} className="manager-sub-detail">
          <Grid item md={4} className="profile-info">
            <img src={personImage} alt="person-img" />
            <div className="p-title">Action</div>
            <div className="profile-action">
              <img src={editIcon} alt="person-img" />
              <div className="edit-title">Edit</div>
            </div>
            <div className="profile-action">
              <img src={showIcon} alt="person-img" />
              <div className="edit-title">View Jobs</div>
            </div>
          </Grid>
          <Grid item md={8} className="personal-info">
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
      </CardContent>
    </Card>
  );
};

export default ManagerDetail;
