import React, { useState } from "react";
import { Grid, Card, CardContent } from "@mui/material";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import AssignToManager from "../../../components/modals/assignToManager/AssignToManager";
import "./newmanagerdetail.scss";

const NewManagerDetail = ({ managerData, setReload }) => {
  const { data, site, address } = managerData;
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  return (
    <div>
      {data ? (
        <Card className="new-manager-detail-main">
          <CardContent>
            <div className="title">Manager's Details</div>
            <Grid container spacing={3} className="manager-sub-detail">
              <Grid item md={2}>
                <img src={personImage} alt="person-img" />
              </Grid>
              <Grid item md={3} className="new-personal-info">
                <div className="info">
                  <div className="designation">Manager</div>
                  <div className="personal-title">
                    {data ? data.first_name + " " + data.last_name : "n/a"}
                  </div>
                </div>
                <div className="change-info">
                  <div className="info">
                    <div className="designation">Site Assigned</div>
                    <div className="personal-title">{`${
                      site && site.line_1 ? site.line_1 : "n/a"
                    }`}</div>
                  </div>
                  <div
                    className="change-title"
                    onClick={() => setIsManagerOpen(true)}
                  >
                    Change
                  </div>
                </div>
              </Grid>
              <Grid item md={3} className="new-personal-info">
                <div className="info">
                  <div className="designation">Address</div>
                  <div className="personal-title">
                    {`${address ? address.address : "n/a"}`}
                  </div>
                </div>
                <div className="info">
                  <div className="designation">Email</div>
                  <div className="personal-title">
                    {data ? data.email : "n/a"}
                  </div>
                </div>
              </Grid>

              <Grid item md={2} className="new-personal-info">
                <div className="info">
                  <div className="designation">Phone</div>
                  <div className="personal-title">
                    {data ? data.mobile_number : "n/a"}
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
      <>
        {isManagerOpen && (
          <AssignToManager
            handleClose={() => setIsManagerOpen(false)}
            setReload={() => setReload()}
            managerId={data && data?.user_id}
          />
        )}
      </>
    </div>
  );
};

export default NewManagerDetail;
