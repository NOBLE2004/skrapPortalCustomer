import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import "./newmanagerdetail.scss";
const NewManagerDetail = ({managerData}) => {
  console.log('manager' , managerData)
  const {data , site} = managerData
  return (
    <div>
      <Card className="new-manager-detail-main">
        <CardContent>
          <div className="title">Managers Details</div>
          <Grid container spacing={3} className="manager-sub-detail">
            <Grid item md={2}>
              <img src={personImage} alt="person-img" />
            </Grid>
            <Grid item md={3} className="new-personal-info">
              <div className="info">
                <div className="designation">Manager</div>
                <div className="personal-title">{data ? data.first_name + " " + data.last_name : ""}</div>
              </div>
              <div className="change-info">
                <div className="info">
                  <div className="designation">Site Assigned</div>
                  <div className="personal-title">{site ? site.name : ""}</div>
                </div>
                <div className="change-title">Change</div>
              </div>
            </Grid>
            <Grid item md={3} className="new-personal-info">
              <div className="info">
                <div className="designation">Address</div>
                <div className="personal-title">
                  {site ? site.address : ""}
                </div>
              </div>
              <div className="info">
                <div className="designation">Email</div>
                <div className="personal-title">{data ? data.email : ""}</div>
              </div>
            </Grid>

            <Grid item md={2} className="new-personal-info">
              <div className="info">
                <div className="designation">Phone</div>
                <div className="personal-title">{data ? data.mobile_number : ""}</div>
              </div>
            </Grid>
            <Grid item md={2} className="profile-info">
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
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewManagerDetail;
