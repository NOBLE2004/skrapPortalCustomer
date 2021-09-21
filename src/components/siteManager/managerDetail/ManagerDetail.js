import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import sitesService from "../../../services/sites.service";
import { useHistory } from "react-router";
import "./managerdetail.scss";
const ManagerDetail = ({ title, siteData }) => {
  const history = useHistory();
  const {
    manager_name,
    job_address,
    mobile_number,
    site_assigned,
    email,
    site_manager_id,
  } = siteData;

  const handleManagerDetail = (id) => {
    history.push("site-managers/" + id);
  };

  const handleViewJob = () => {
    // history.push({ pathname: "/jobs" , state:"siteManager" });
  };

  return (
    <Card
      className="manager-detail-main"
      onClick={() => handleManagerDetail(site_manager_id)}
    >
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
              <div className="edit-title" onClick={handleViewJob}>
                View Jobs
              </div>
            </div>
          </Grid>
          <Grid item md={8} className="personal-info">
            <div className="info">
              <div className="designation">Manager</div>
              <div className="personal-title">{manager_name}</div>
            </div>
            <div className="info">
              <div className="designation">Site Assigned</div>
              <div className="personal-title">{site_assigned}</div>
            </div>
            <div className="info">
              <div className="designation">Address</div>
              <div className="personal-title">{job_address}</div>
            </div>
            <div className="info">
              <div className="designation">Email</div>
              <div className="personal-title">{email}</div>
            </div>
            <div className="info">
              <div className="designation">Phone</div>
              <div className="personal-title">{mobile_number}</div>
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ManagerDetail;
