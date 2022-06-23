import React, { useEffect, useState } from "react";
import { search } from "../../../assets/images";
import "./dashboardfilter.scss";
import { makeStyles, TextField } from "@material-ui/core";
const useStyle = makeStyles((theme) => ({
  titleHide: {
    fontFamily: "BasierCircleBold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    lineHeight: "17px",
    display: "flex",
    alignItems: "center",
    color: "#0d0d39",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));
const DashboardFilter = ({ title, handelSearch }) => {
  const [value, setValue] = useState("");
  const classes = useStyle();
  useEffect(() => {
    handelSearch(value);
  }, [value]);
  return (
    <div className="dashboard-filter-main">
      <div className={classes.titleHide}>
        {title ? `Filter By ${title}` : "Filter By Site"}
      </div>
      <div className="filter-main">
        
        <TextField
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={`Search ${title}`}
          InputProps={{
            startAdornment: <img src={search} alt="search-icon" className="icon-search"/>,
          }}
          className="searh-dashboard"
        />
      </div>
    </div>
  );
};

export default DashboardFilter;
