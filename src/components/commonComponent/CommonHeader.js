import React from "react";
import { location } from "../../assets/images";
import "./commonHeader.scss";

const CommonHeader = ({ downloadCSV, mapView, bookSite, children , handleShowMap, isMap, handleBookJob }) => {

  return (
    <div className="common-header-main">
      <div className="header-children">{children}</div>
      <div className="common-header-links-main">
        <div className="header-link">{downloadCSV ? "Download CSV" : ""}</div>
        <div className="view-container" onClick={handleShowMap}>
          { isMap && <img src={location} alt="location-icon" className="view-icon" />}
          <div className="header-link">{isMap ? "Map View" : "Table View"}</div>
        </div>
        
        <button className="header-btn" onClick={handleBookJob}>
          {bookSite ? bookSite : "Assign to manager"}
        </button>
      </div>
    </div>
  );
};

export default CommonHeader;
