import React from "react";
import { location } from "../../assets/images";
import "./commonHeader.scss";

const CommonHeader = ({ downloadCSV, mapView, bookSite, children , handleShowMap, isMap, handleBookJob }) => {
console.log('isMap' , isMap)
  return (
    <div className="common-header-main">
      <div className="header-children">{children}</div>
      <div className="common-header-links-main">
        <div className="header-link">{downloadCSV ? downloadCSV : "Download CSV"}</div>
        <div className="view-container" onClick={handleShowMap}>
          { isMap && <img src={location} alt="location-icon" className="view-icon" />}
          <div className="header-link">{isMap ? "Map View" : "Job View"}</div>
        </div>
        <button className="header-btn" onClick={handleBookJob}>
          {bookSite ? bookSite : "Book Site"}
        </button>
      </div>
    </div>
  );
};

export default CommonHeader;
