import React, { useState } from "react";
import { searchIcon } from "../../../assets/images";
import { useAsyncDebounce } from "react-table";
import "./commonSearch.scss";

const CommonSearch = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  // const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);

  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value);
  }, 200);

  return (
    <div className="search-bar-container">
      <img src={searchIcon} alt="search-icon" />
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`Search...`}
      />
    </div>
  );
};

export default CommonSearch;
