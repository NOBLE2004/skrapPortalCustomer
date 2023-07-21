/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../commonComponent/commonfilter/commonfilter.scss";
import { JOB_STATUS } from "../../environment/";
import ServicesService from "../../services/service.service";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import SingleSelect from "../single-select-auto-complete";
import { useDispatch, useSelector } from "react-redux";
import { getSites } from "../../store/actions/sites.action";
import { Grid, Typography } from "@mui/material";
import { getUserService } from "../../store/actions/action.userService";
import RangeDatePicker from "../RangePicker/index";

const JobFilters = ({ handleChangeFilters }) => {
  const dispatch = useDispatch();
  const userService = useSelector((state) => state?.userService);
  const siteState = useSelector((state) => state?.allsites);
  const jobsFilter = useSelector((state) => state?.jobsFilter);
  const currency = localStorage.getItem("currency");

  const [togle, setTogle] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [services, setServices] = useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const duplicateFilter = { ...jobsFilter };
    duplicateFilter[name] = value;
    handleChangeFilters(duplicateFilter);
  };

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
    if (!userService?.data) {
      dispatch(getUserService({ currency: currency }));
    }
  }, [userService?.data]);

  useEffect(() => {
    if (!siteState?.data) {
      dispatch(getSites({ currency }));
    }
  }, [siteState.data, currency]);

  const toggle = () => {
    setTogle(!togle);
  };
  const handleDate = (item) => {
    setState([item.selection]);
  };
  const resetFilters = () => {
    handleChangeFilters({
      status: "",
      date: "",
      service: "",
      service_id: "",
      search: "",
      site: "",
      address: "",
      page: 1,
    });

    setState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOk = () => {
    const newStartDate = moment(state?.[0]?.startDate).format("DD-MM-YYYY");
    const newEndDate = moment(state?.[0]?.endDate).format("DD-MM-YYYY");
    const duplicateFilter = { ...jobsFilter };
    duplicateFilter.date = `${newStartDate},${newEndDate}`;
    handleChangeFilters(duplicateFilter);
    handleClose();
  };
  return (
    <Grid>
      <Grid
        container
        className="filter-container"
        columnSpacing={2}
        justifyContent="space-between"
      >
        <Grid item xs={1}>
          <div className="filter-title">Filter : </div>
        </Grid>
        <Grid item xs={1}>
          <button onClick={handleClick} className={"filter-option"}>
            Date
          </button>
          <RangeDatePicker
            anchorEl={anchorEl}
            handleClose={() => {
              handleClose();
            }}
            handleOk={() => {
              handleOk();
            }}
            onChange={handleDate}
            name="si_date"
            dateState={state}
          />
          {togle && (
            <div className="jobs-date-picker">
              <DateRangePicker
                editableDateInputs={false}
                onChange={handleDate}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="horizontal"
              />
            </div>
          )}
        </Grid>
        <Grid item xs={1.5}>
          <select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="service"
            value={jobsFilter?.service}
            onChange={handleChange}
            className={"filter-option"}
          >
            <option value="">Services</option>
            {services.map((service) => {
              return (
                <option value={service.service_id} key={service?.service_id}>
                  {service.service_name}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={1.5}>
          <select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="service_id"
            value={jobsFilter?.service_id}
            onChange={handleChange}
            className={"filter-option"}
          >
            <option value="">Sub Services</option>
            {userService?.data?.result?.map((service) => {
              return (
                <option value={service.service_id} key={service?.service_id}>
                  {service.service_name}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={2}>
          <input
            name="address"
            value={jobsFilter?.address || ""}
            onChange={handleChange}
            className={"filter-option"}
            placeholder="postcode"
          />
        </Grid>
        <Grid item xs={2}>
          <select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            name="status"
            value={jobsFilter?.status || ""}
            onChange={handleChange}
            className={"filter-option"}
          >
            <option value="">All Statuses </option>
            {JOB_STATUS.map((status) => {
              return (
                <option value={status.id} key={status?.id}>
                  {status.status}
                </option>
              );
            })}
          </select>
        </Grid>
        <Grid item xs={2}>
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
              value={jobsFilter?.site}
              handleChange={handleChange}
              loading={siteState?.isLoading}
            />
          )}
        </Grid>
        <Grid item xs={1}>
          <button onClick={resetFilters} className={"filter-option"}>
            reset
          </button>
        </Grid>
      </Grid>
      {/* <div className="filter-container">
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
      </div> */}
    </Grid>
  );
};

export default JobFilters;
