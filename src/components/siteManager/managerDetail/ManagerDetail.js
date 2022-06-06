import React from "react";
import { Grid, Card, CardContent } from "@mui/material";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import { useHistory } from "react-router";
import "./managerdetail.scss";

const ManagerDetail = (props) => {
  const { title, siteData } = props;
  const history = useHistory();
  const { address_data, mobile_number, site_assigned, email, user_id, name } =
    siteData;
  const handleManagerDetail = (id, data) => {
    history.push("site-managers/" + id);
  };

  const handleViewJob = (e) => {
    e.stopPropagation();
    // history.push({ pathname: "/jobs" , state:"siteManager" });
  };
  const handleEdit = (e) => {
    e.stopPropagation();
  };

  return (
    <Card
      className="manager-detail-main"
      onClick={() => handleManagerDetail(user_id, siteData)}
    >
      <CardContent>
        <div className="title">{title ? title : "Managers Details"}</div>
        <Grid container spacing={3} className="manager-sub-detail">
          <Grid item md={4} className="profile-info">
            <img src={personImage} alt="person-img" />
            <div className="p-title">Action</div>
            <div className="profile-action">
              <img src={editIcon} alt="person-img" onClick={handleEdit} />
              <div className="edit-title" onClick={handleEdit}>
                Edit
              </div>
            </div>
            <div className="profile-action">
              <img src={showIcon} alt="person-img" onClick={handleViewJob} />
              <div className="edit-title" onClick={handleViewJob}>
                View Jobs
              </div>
            </div>
          </Grid>
          <Grid item md={8} className="personal-info">
            <div className="info">
              <div className="designation">Manager</div>
              <div className="personal-title">{name ? name : "n/a"}</div>
            </div>
            <div className="info">
              <div className="designation">Site Assigned</div>
              <div className="personal-title">
                {site_assigned ? site_assigned : "n/a"}
              </div>
            </div>
            <div className="info">
              <div className="designation">Address</div>
              <div className="personal-title">
                {address_data ? address_data : "n/a"}
              </div>
            </div>
            <div className="info">
              <div className="designation">Email</div>
              <div className="personal-title">{email ? email : "n/a"}</div>
            </div>
            <div className="info">
              <div className="designation">Phone</div>
              <div className="personal-title">
                {mobile_number ? mobile_number : "n/a"}
              </div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ManagerDetail;
