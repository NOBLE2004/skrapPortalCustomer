import React from "react";
import { searchIcon } from "../../../assets/images";
import "./commonSearch.scss";

const CommonSearch = () => {
  return (
    <div className="search-bar-container">
      <img src={searchIcon} alt="search-icon" />
      <input placeholder="Search Sites" />
    </div>
  );
};

export default CommonSearch;
