import React from "react";
import "./commonfilter.scss";

const CommonFilter = () => {
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
      <div className="filter-title">Filter : </div>
      <div className="all-filters">
         <select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={status}
          onChange={handleStatusChange}
          className={"filter-option"}
        >
          <option value="all">All</option>
          <option value={"pending"}>Pending</option>
          <option value={"completed"}>Completed</option>
          <option value={"assigned"}>Assigned</option>
        </select> 

        <select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
          className={"filter-option"}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </select>
      </div>
    </div>
  );
};

export default CommonFilter;
