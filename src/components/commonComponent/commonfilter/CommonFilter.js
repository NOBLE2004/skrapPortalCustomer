import React, { useState } from "react";
import "./commonfilter.scss";

const CommonFilter = ({ cname }) => {
  const [state, setState] = useState({
    // jobs filter
    status: "",
    date: "",
    customer: "",
    service: "",
    location: "",
    bookby: "",
    driver: "",

    // sites filter
    site: "",
    address: "",
    contact: "",
    jobs: "",
    sales: "",
  });
  const {
    status,
    date,
    location,
    customer,
    service,
    bookby,
    driver,
    site,
    address,
    contact,
    jobs,
    sales,
  } = state;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div className="filter-container">
      <div className="filter-title">Filter : </div>
      <div className="all-filters">
        {(cname === "tickets") | (cname === "jobs") ? (
          <>
            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="date"
              value={date}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"date"}>Date </option>
              <option value={"date 1"}>Date 1</option>
              <option value={"date 2"}>Date 2</option>
            </select>
            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="customer"
              value={customer}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"customer"}>Customer </option>
              <option value={"customer 1"}>Customer 1</option>
              <option value={"customer 2"}>Customer 2</option>
            </select>
            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="service"
              value={service}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"service"}>Service </option>
              <option value={"service 1"}>Service 1</option>
              <option value={"service 2"}>Service 2</option>
            </select>
            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="location"
              value={location}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"location"}>Location </option>
              <option value={"location 1"}>Location 1</option>
              <option value={"location 2"}>Location 2</option>
            </select>
            {cname === "tickets" && (
              <select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                name="driver"
                value={driver}
                onChange={handleChange}
                className={"filter-option"}
              >
                <option value={"driver "}>Driver </option>
                <option value={"driver 1"}>Driver 1</option>
                <option value={"driver 2"}>Driver 2</option>
              </select>
            )}
            {cname === "jobs" && (
              <>
                {" "}
                <select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="status"
                  value={status}
                  onChange={handleChange}
                  className={"filter-option"}
                >
                  <option value={"status "}>Status </option>
                  <option value={"status 1"}>Status 1</option>
                  <option value={"status 2"}>Status 2</option>
                </select>
                <select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  name="bookby"
                  value={bookby}
                  onChange={handleChange}
                  className={"filter-option"}
                >
                  <option value={"bookby"}>Book By </option>
                  <option value={"bookby 1"}>Book By 1</option>
                  <option value={"bookby 2"}>Book By 2</option>
                </select>
              </>
            )}
          </>
        ) : (
          <>
            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="site"
              value={site}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"site"}>Site </option>
              <option value={"site 1"}>Site 1</option>
              <option value={"site 2"}>Site 2</option>
            </select>

            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="address"
              value={address}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"address"}>Address </option>
              <option value={"address 1"}>Address 1</option>
              <option value={"address 2"}>Address 2</option>
            </select>

            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="contact"
              value={contact}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"contact"}>Contact </option>
              <option value={"contact 1"}>Contact 1</option>
              <option value={"contact 2"}>Contact 2</option>
            </select>

            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="sales"
              value={sales}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"sales"}>Sales </option>
              <option value={"sales 1"}>Sales 1</option>
              <option value={"sales 2"}>Sales 2</option>
            </select>

            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="jobs"
              value={jobs}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value={"jobs"}>Jobs </option>
              <option value={"jobs 1"}>Jobs 1</option>
              <option value={"jobs 2"}>Jobs 2</option>
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default CommonFilter;
