import React from "react";
import { Grid, Card, CardContent } from "@material-ui/core";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import sitesService from "../../../services/sites.service";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { getPoOrders } from "../../../store/actions/poOrder.action";
import "./managerdetail.scss";
const ManagerDetail = (props) => {
  const { title, siteData } = props
  const history = useHistory();
  const {
    manager_name,
    job_address,
    mobile_number,
    site_assigned,
    email,
    user_id,
    name,
  } = siteData;
  const handleManagerDetail = (id, data) => {
    props.getPo(data.purchase_orders)
    history.push("site-managers/" + id);
  };

  const handleViewJob = () => {
    // history.push({ pathname: "/jobs" , state:"siteManager" });
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
              <div className="personal-title">{name ? name : "n/a"}</div>
            </div>
            <div className="info">
              <div className="designation">Site Assigned</div>
              <div className="personal-title">
                {manager_name ? manager_name : "n/a"}
              </div>
            </div>
            <div className="info">
              <div className="designation">Address</div>
              <div className="personal-title">
                {job_address ? job_address : "n/a"}
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

const mapStateToProps = ({ sites }) => {
  return { sites };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPo: (data) => dispatch(getPoOrders(data)),
  };
};



export default connect(mapStateToProps , mapDispatchToProps)(ManagerDetail);
