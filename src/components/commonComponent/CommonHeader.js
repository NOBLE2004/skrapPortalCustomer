import React from "react";
import { location } from "../../assets/images";
import "./commonHeader.scss";

const CommonHeader = ({ downloadCSV, mapView, showButton, bookSite, children , handleShowMap, isMap, handleBookJob , isJob , isSite , handleCreateJob }) => {
  return (
    <div className="common-header-main">
      <div className="header-children">{children}</div>
      <div className="common-header-links-main">
        <div className="header-link">{downloadCSV ? "Download CSV" : ""}</div>
        <div className="view-container" onClick={handleShowMap}>
          { isMap && <img src={location} alt="location-icon" className="view-icon" />}
          <div className="header-link">{isMap ? "Map View" : "Table View"}</div>
        </div>
        
          {showButton && <button className="header-btn" onClick={handleBookJob}>
          {bookSite ? bookSite : "Assign to manager"}
        </button>}
        {isJob && <button className="header-btn" onClick={handleCreateJob}>
          Create Job
        </button>}
        {isSite && <button className="header-btn" onClick={handleCreateJob}>
          Create Site
        </button>}

      </div>
    </div>
  );
};

export default CommonHeader;
