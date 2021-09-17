import React, {useEffect, useState} from "react";
import { searchIcon } from "../../../assets/images";
import "./commonSearch.scss";

const CommonSearch = ({ globalFilter, cname, handleChangeSearch }) => {
  const [value, setValue] = useState(globalFilter);
  useEffect(()=>{
      handleChangeSearch(value);
  }, [value]);
  return (
    <div className="search-bar-container">
      <img src={searchIcon} alt="search-icon" />
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={`Search ${cname}`}
      />
    </div>
  );
};

export default CommonSearch;
