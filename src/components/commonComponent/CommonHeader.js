import React, { useState, useEffect, memo } from "react";
import { location } from "../../assets/images";
import { getUserDataFromLocalStorage } from "../../services/utils";
import "./commonHeader.scss";
import {connect} from "react-redux";

const CommonHeader = ({
  downloadCSV,
  mapView,
  showButton,
  bookSite,
  children,
  handleShowMap,
  isMap,
  handleBookJob,
  isJob,
  isSite,
  handleCreateJob,handleCreateSite, siteManager
}) => {
  const [userData, setUserData] = useState(0);
  useEffect(() => {
    const userdata = getUserDataFromLocalStorage();
    setUserData(userdata.user_count);
  }, []);
  return (
    <div className="common-header-main">
      <div className="header-children">{children}</div>
      <div className="common-header-links-main">
        <div className="header-link">{downloadCSV ? "Download CSV" : ""}</div>
        <div className="view-container" onClick={handleShowMap}>
          {isMap && (
            <img src={location} alt="location-icon" className="view-icon" />
          )}
          <div className="header-link">{isMap ? "Map View" : "Table View"}</div>
        </div>

        {showButton && (
          <button className="header-btn" onClick={handleBookJob}>
            {bookSite ? bookSite : ""}
          </button>
        )}
        {isJob && (
          <button className="header-btn" onClick={handleCreateJob}>
            Create Job
          </button>
        )}
        {isSite && (userData > 0 || (siteManager.sites && siteManager.sites.length > 0)) && (
            <>
              <button className="header-btn" onClick={handleBookJob}>
                Assign to Manager
              </button>
            </>
        )}
        <button className="header-btn" onClick={handleCreateSite}>
          Create Site
        </button>

      </div>
    </div>
  );
};
const mapStateToProps = ({ siteManager }) => {
  return { siteManager };
};
export default connect(mapStateToProps)(CommonHeader);
