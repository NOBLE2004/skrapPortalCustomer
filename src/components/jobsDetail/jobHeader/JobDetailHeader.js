import React from "react";
import "./jobDetailHeader.scss";

const JobDetailHeader = () => {
  return (
    <div className="jobdetail-header-main">
      <div className="sites-header-title">Job: <span>SN14662</span></div>
      <div className="common-header-links-main">
        <div className="header-link">{"Back to all Jobs"}</div>
        <div className="header-link">{"Update Details"}</div>
        <div className="header-link">{"Add/Change Driver"}</div>
        <button className="header-btn">{"Cancel Job"}</button>
      </div>
    </div>
  );
};

export default JobDetailHeader;
