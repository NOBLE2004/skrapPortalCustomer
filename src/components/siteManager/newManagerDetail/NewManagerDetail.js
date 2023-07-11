import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent } from "@mui/material";
import { personImage, editIcon, showIcon } from "../../../assets/images";
import AssignToManager from "../../../components/modals/assignToManager/AssignToManager";
import "./newmanagerdetail.scss";
import { getUserDataFromLocalStorage } from "../../../services/utils";

const NewManagerDetail = ({ managerData, setReload }) => {
  const { data, site, address, utilization } = managerData;
  const [userData, setUserData] = useState({});
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  useEffect(() => {
    const user = getUserDataFromLocalStorage();
    setUserData(user);
  }, []);

  return (
    <Grid container spacing={1}>
      {data?.map((single,index) => (
        <Grid
          item
          xs={12}
          sm={12}
          md={data?.length > 1 ? 6 : 12}
          key={index}
        >
          <Card className="new-manager-detail-main">
            <CardContent>
              <div className="title">Manager Details</div>
              <Grid container spacing={3} className="manager-sub-detail">
                <Grid item md={2}>
                  <img src={personImage} alt="person-img" />
                </Grid>
                <Grid item md={3} className="new-personal-info">
                  <div className="info">
                    <div className="designation">Manager</div>
                    <div className="personal-title">
                      {single?.first_name
                        ? single?.first_name + " " + single?.last_name
                        : "n/a"}
                    </div>
                  </div>
                  <div className="change-info">
                    <div className="info">
                      <div className="designation">Site Name</div>
                      <div className="personal-title">{`${
                          single.site_name && single.site_name ? single.site_name : "n/a"
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
                <Grid item md={4} className="new-personal-info">
                  <div className="info">
                    <div className="designation">Address</div>
                    <div className="personal-title">
                      {`${address ? address.address : "n/a"}`}
                    </div>
                  </div>
                  <div className="info">
                    <div className="designation">Email</div>
                    <div className="personal-title">
                      {single?.email ? single?.email : "n/a"}
                    </div>
                  </div>
                </Grid>

                <Grid item md={3} className="new-personal-info">
                  <div className="info">
                    <div className="designation">Phone</div>
                    <div className="personal-title">
                      {single?.mobile_number ? single?.mobile_number : "n/a"}
                    </div>
                  </div>
                    <div className="info">
                      <div className="designation">Utilisation rating</div>
                      <div className="personal-title">
                        {single.utilization ? single.utilization : 0}/10
                      </div>
                    </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <>
        {isManagerOpen && (
          <AssignToManager
            handleClose={() => setIsManagerOpen(false)}
            setReload={() => setReload()}
            managerId={data && data?.user_id}
          />
        )}
      </>
    </Grid>
  );
};

export default NewManagerDetail;
