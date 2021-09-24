import React, {useEffect, useState} from "react";
import { search } from "../../../assets/images";
import "./dashboardfilter.scss";

const DashboardFilter = ({ title, handelSearch }) => {
    const [value, setValue] = useState('');
    useEffect(()=>{
        handelSearch(value);
    }, [value]);
  return (
    <div className="dashboard-filter-main">
      <div className="title">{title ? `Filter By ${title}` : "Filter By Site"}</div>
      <div className="filter-main">
        <img src={search} alt="search-icon" />
          <input style={{border: 'none', borderBottom: '1px solid grey',marginLeft: '5%',outline:'none'}}
              value={value || ""}
              onChange={(e) => {
                  setValue(e.target.value);
              }}
              placeholder={`Search ${title}`}
          />
      </div>
    </div>
  );
};

export default DashboardFilter;
