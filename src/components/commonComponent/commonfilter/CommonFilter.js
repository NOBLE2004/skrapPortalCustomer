import React from "react";
import "./commonfilter.scss";
const CommonFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

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
      {/* <div className="filter-title">Filters : </div> */}
      <div className="all-filters">
        <select
          name={id}
          id={id}
          className={"filter-option"}
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
        </select>
         {/* <select
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
        </select> */}
{/*
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
        </select> */}
      </div>
    </div>
  );
};

export default CommonFilter;
