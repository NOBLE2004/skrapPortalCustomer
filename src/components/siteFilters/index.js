import React, { useEffect, useState } from "react";
import "../commonComponent/commonfilter/commonfilter.scss";
import { JOB_STATUS } from "../../environment/";
import ServicesService from "../../services/service.service";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./style.scss";
import { Box, Grid } from "@mui/material";
const SiteFilterNew = ({ handleChangeFilters }) => {
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
  const { status, date, address, service } = filters;
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
    <div className="site-filter-new-main">
      <Grid className="" container spacing={3}>
        <Grid item xs={6}>
          <Box display="flex " alignItems="center">
            <div className="img-caption">Filter by:  </div>
            <select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              name="service"
              value={service}
              onChange={handleChange}
              className={"filter-option"}
            >
              <option value="">Site manager</option>
              {services.map((service) => {
                return (
                  <option value={service.service_id}>
                    {service.service_name}
                  </option>
                );
              })}
            </select>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="status"
            value={status}
            onChange={handleChange}
            className={"filter-option"}
          >
            <option value="">Location </option>
            {JOB_STATUS.map((status) => {
              return <option value={status.id}>{status.status}</option>;
            })}
          </select>
        </Grid>
        <Grid item xs={3}>
          <select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="status"
            value={status}
            onChange={handleChange}
            className={"filter-option"}
          >
            <option value="">Hire Type </option>
            {JOB_STATUS.map((status) => {
              return <option value={status.id}>{status.status}</option>;
            })}
          </select>
        </Grid>
      </Grid>
    </div>
  );
};

export default SiteFilterNew;
