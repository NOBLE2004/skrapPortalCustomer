import React from "react";
import "./jobDetailHeader.scss";

const JobDetailHeader = ({job, redirectBack}) => {
  return (
    <div className="jobdetail-header-main">
      <div className="sites-header-title">Job: <span>SK{job?.job_id}</span></div>
      <div className="common-header-links-main">
        <div className="header-link" onClick={redirectBack}>{"Back to all Jobs"}</div>
        <button className="header-btn">{"Cancel Job"}</button>
      </div>
    </div>
  );
};

export default JobDetailHeader;
