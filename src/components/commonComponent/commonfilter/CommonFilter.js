import React from "react";
import { ploygonIcon } from "../../../assets/images/index";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "./commonfilter.scss";
// column: { filterValue, setFilter, preFilteredRows, id },
const CommonFilter = ({
  
}) => {
  // const options = React.useMemo(() => {
  
  //   const options = new Set();
  //   preFilteredRows.forEach((row) => {
  //     options.add(row.values[id]);
  //   });
  //   return [...options.values()];
  // }, [id, preFilteredRows]);

  const [status, setStatus] = React.useState("pending");
  const [age, setAge] = React.useState(10);
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  return (
    <div className="filter-container">
      <div className="filter-title">Filters : </div>
      <div className="all-filters">
        <div className="">
          {/* <select
            name={id}
            id={id}
            value={filterValue}
            onChange={(e) => {
              setFilter(e.target.value || undefined);
            }}
          >
            <option value="">All</option>
            {options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select> */}
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={status}
            onChange={handleStatusChange}
            className={"filter-option"}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"pending"}>Pending</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
            <MenuItem value={"assigned"}>Assigned</MenuItem>
          </Select>

          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={age}
            onChange={handleChange}
            className={"filter-option"}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </div>
        {/* <div className="filter-buttons">
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
        </div> */}
      </div>
    </div>
  );
};

export default CommonFilter;
