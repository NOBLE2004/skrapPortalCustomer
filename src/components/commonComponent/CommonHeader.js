import React, { useState, useEffect, memo } from "react";
import { location } from "../../assets/images";
import { getUserDataFromLocalStorage } from "../../services/utils";
import "./commonHeader.scss";

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
  handleCreateJob,
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
        {isSite && userData > 0 && (
          <>
            <button className="header-btn" onClick={handleBookJob}>
              Assign to Manager
            </button>
            <button className="header-btn" onClick={handleCreateJob}>
              Create Site
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(CommonHeader);
