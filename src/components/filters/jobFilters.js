import React, { useEffect, useState } from "react";
import "../commonComponent/commonfilter/commonfilter.scss";
import { JOB_STATUS } from "../../environment/";
import ServicesService from "../../services/service.service";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import SingleSelect from "../single-select-auto-complete";
import {
  ArrowDownward,
  ChevronLeftRounded,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getSites } from "../../store/actions/sites.action";
import { Typography } from "@mui/material";

const JobFilters = ({ handleChangeFilters }) => {
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state?.allsites);

  const [filters, setFilters] = useState({
    status: "",
    date: "",
    service: "",
    address: "",
  });
  const [togle, setTogle] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [services, setServices] = useState([]);
  const { status, date, address, service, sites } = filters;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };
  useEffect(() => {
    handleChangeFilters(filters);
  }, [filters]);
  useEffect(() => {
    ServicesService.list()
      .then((response) => {
        if (response.data.result) {
          setServices(response.data.result);
        } else {
          setServices([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!siteState?.data) {
      dispatch(getSites());
    }
  }, [siteState.data]);

  const toggle = () => {
    setTogle(!togle);
  };
  const handleDate = (item) => {
    setState([item.selection]);
    const start = item.selection.startDate
      .toLocaleDateString()
      .replace(/\//g, "-");
    const end = item.selection.endDate.toLocaleDateString().replace(/\//g, "-");
    console.log(start, end);
    if (start === end) {
      setFilters({ ...filters, date: `${start},${end}` });
    } else {
      setFilters({ ...filters, date: `${start},${end}` });
      setTogle(false);
    }
  };
  const resetFilters = () => {
    setFilters({
      status: "",
      date: "",
      service: "",
      address: "",
    });
    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };
  return (
    <div className="filter-container">
      <div className="filter-title">Filter : </div>
      <div className="all-filters">
        <>
          <button onClick={toggle} className={"filter-option"}>
            Date
          </button>
          {togle && (
            <DateRangePicker
              editableDateInputs={false}
              onChange={handleDate}
              moveRangeOnFirstSelection={false}
              ranges={state}
              direction="horizontal"
            />
          )}
          <select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="service"
            value={service}
            onChange={handleChange}
            className={"filter-option"}
          >
            <option value="">All Services</option>
            {services.map((service) => {
              return (
                <option value={service.service_id}>
                  {service.service_name}
                </option>
              );
            })}
          </select>
          <input
            name="address"
            value={address}
            onChange={handleChange}
            className={"filter-option"}
            placeholder="postcode"
          />
          <select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="status"
            value={status}
            onChange={handleChange}
            className={"filter-option"}
          >
            <option value="">All Statuses </option>
            {JOB_STATUS.map((status) => {
              return <option value={status.id}>{status.status}</option>;
            })}
          </select>
          {siteState?.isLoading ? (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              variant="body2"
              className={"filter-option"}
            >
              Loading...
            </Typography>
          ) : (
            <SingleSelect
              name="site"
              data={siteState?.data}
              value={filters?.site}
              handleChange={handleChange}
              loading={siteState?.isLoading}
            />
          )}
          <button onClick={resetFilters} className={"filter-option"}>
            reset
          </button>
        </>
      </div>
    </div>
  );
};

export default JobFilters;
