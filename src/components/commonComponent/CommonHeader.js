import React from "react";
import { location } from "../../assets/images";
import "./commonHeader.scss";
const CommonHeader = ({ downloadCSV, mapView, bookSite, children }) => {
  return (
    <div className="common-header-main">
      <div className="header-children">{children}</div>
      <div className="common-header-links-main">
        <div className="header-link">{downloadCSV ? downloadCSV : "Download CSV"}</div>
        <div className="view-container">
          <img src={location} alt="location-icon" className="view-icon"/>
          <div className="header-link">{mapView ? mapView : "Map View"}</div>
        </div>
        <button className="header-btn">
          {bookSite ? bookSite : "Book Site"}
        </button>
      </div>
    </div>
  );
};

export default CommonHeader;
