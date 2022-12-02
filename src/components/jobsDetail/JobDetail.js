import React, {useState, useEffect} from "react";
import { Card } from "@mui/material";
import CommonStatus from "../commonComponent/commonStatus/CommonStatus";
import "./jobDetail.scss";
import {getUserDataFromLocalStorage, status} from "../../services/utils";

const JobDetail = ({ job }) => {
  const [userData, setUserData] = useState({});

  useEffect(()=>{
    const user = getUserDataFromLocalStorage();
    setUserData(user);
  }, [])
  return (
    <Card className="job-detail-main">
      <div className="personal-info">
        <div className="info">
          <div className="designation">Status</div>
          <CommonStatus status={status(job?.appointment_status)} />
        </div>
        <div className="info">
          <div className="designation">Booked</div>
          <div className="personal-title">
            {new Date(job?.save_date).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="personal-info">
        <div className="info">
          <div className="designation">Order #</div>
          <div className="personal-title">SK{job?.job_id}</div>
        </div>
        <div className="info">
          <div className="designation">Delivery Date</div>
          <div className="personal-title">
            {new Date(job?.job_start_time).toLocaleString()}
          </div>
        </div>
      </div>

      <div className="personal-info">
        <div className="info">
          <div className="designation">Purchase Order</div>
          <div className="personal-title">
            {job?.purchase_order ? job?.purchase_order : "-----"}
          </div>
        </div>
        <div className="info">
          <div className="designation">Service</div>
          <div className="personal-title">{job?.service_name}</div>
        </div>
      </div>

      <div className="personal-info">
        {/*<div className="info">*/}
        {/*  <div className="designation">Booked By</div>*/}
        {/*  <div className="personal-title">*/}
        {/*    {job?.bookedby*/}
        {/*      ? `${job?.bookedby.first_name} ${job?.bookedby.last_name}`*/}
        {/*      : "Skarp"}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="info">
          <div className="designation">Waste Tonnes</div>
          <div className="personal-title">
            {job?.job_waste?.length === 0 && <p className="item-value">n/a</p>}
            {(job?.job_waste || []).map((waste, index) => {
              if (index === 0) {
                return (
                  <p className="item-value">
                    {waste.waste_type.name.substr(0, 24)} &nbsp;&nbsp;&nbsp;&nbsp; {waste.percentage} T
                  </p>
                );
              }
            })}
          </div>
        </div>
        {userData?.country_currency?.country_code === "+49" && <div className="info">
          <div className="designation">Distance</div>
          <div className="personal-title">22.99 km</div>
        </div>}
      </div>
      <div className="personal-info">
        <div className="info">
          <div className="designation">Site Address</div>
          <div className="personal-title">{job?.job_address}</div>
        </div>
        {userData?.country_currency?.country_code === "+49" && <div className="info">
          <div className="designation">CO2 kg</div>
          <div className="personal-title">{ job?.job_id == '58683' ? '16.897' : job?.job_id == '58486' ? '12.254' : job?.job_id == '58487' ? '13.113' : job?.job_id == '58488' ? '15.176' : '---'}</div>
        </div>}
      </div>
    </Card>
  );
};

export default JobDetail;
