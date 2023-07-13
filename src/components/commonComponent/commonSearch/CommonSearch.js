import React, { useEffect, useState, memo } from "react";
import { searchIcon } from "../../../assets/images";
import "./commonSearch.scss";

const CommonSearch = ({ cname, handleChangeSearch, jobsFilter }) => {
  const [value, setValue] = useState("");
  return (
    <div className="search-bar-container">
      <img src={searchIcon} alt="search-icon" />
      <input
        value={jobsFilter?.search || value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          handleChangeSearch(e.target.value);
        }}
        placeholder={`Search ${cname}`}
      />
    </div>
  );
};

export default memo(CommonSearch);
