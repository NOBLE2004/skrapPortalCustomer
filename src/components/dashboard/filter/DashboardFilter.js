import React from "react";
import { search } from "../../../assets/images";
import "./dashboardfilter.scss";

const DashboardFilter = ({ title }) => {
  return (
    <div className="dashboard-filter-main">
      <div className="title">{title ? `Filter By ${title}` : "Filter By Site"}</div>
      <div className="filter-main">
        <img src={search} alt="search-icon" />
        <span className="postcode">{title ? title : "Postcode"}</span>
      </div>
    </div>
  );
};

export default DashboardFilter;
