import React from "react";
import { ploygonIcon } from "../../../assets/images/index";
import "./commonfilter.scss";
const CommonFilter = () => {
  return (
    <div className="filter-container">
      <div className="filter-title">Filters : </div>
      <div className="all-filters">
        <div className="filter-buttons">
          <button key={`filter_button`} className={"filter-option"}>
            Site
            <span>
              <img src={ploygonIcon} alt="polygon-icon" />
            </span>
          </button>
        </div>

        <div className="filter-buttons">
          <button key={`filter_button`} className={"filter-option"}>
            Address
            <span>
              <img src={ploygonIcon} alt="polygon-icon" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommonFilter;
