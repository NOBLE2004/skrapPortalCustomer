import React, { useEffect, useState } from "react";
import "../commonComponent/commonfilter/commonfilter.scss";
import { JOB_STATUS } from "../../environment/";
import ServicesService from "../../services/service.service";
import { DateRangePicker } from "react-date-range";
import SingleSelect from "../single-select-auto-complete";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import RangeDatePicker from "../RangePicker/index";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSites } from "../../store/actions/sites.action";

const SiteFilters = ({ handleReset, filters, setFilters, name ,handleChangeFilters}) => {
  const dispatch = useDispatch();
  const siteState = useSelector((state) => state?.allsites);
  const siteFilter = useSelector((state) => state?.sitesFilter);

  const currency = localStorage.getItem("currency");
  const [togle, setTogle] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // useEffect(() => {
  //   handleChangeFilters(filters);
  // }, [filters]);
  const toggle = () => {
    setTogle(!togle);
  };
  useEffect(() => {
    if (!siteState?.data) {
      dispatch(getSites({ currency }));
    }
  }, [siteState.data, currency]);
  const handleDate = (item) => {
    setState([item.selection]);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const duplicateFilter = { ...siteFilter };
    duplicateFilter[name] = value;
    handleChangeFilters(duplicateFilter);
  };

  const resetFilters = () => {
    setFilters({
      date: "",
    });
    handleReset();
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
    setFilters({ ...filters, date: `${newStartDate},${newEndDate}` });
    handleClose();
  };
  return (
    <>
      <Grid
        container
        className="filter-container"
        columnSpacing={2}
        justifyContent="end"
      >
        <Grid item>
          <div className="filter-title" style={{ textAlign: "end" }}>
            Filter :{" "}
          </div>
        </Grid>
        <Grid item md={2} xs={3}>
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
        </Grid>
        {name == "ticket" && (
          <Grid item md={1} xs={2}>
            <>
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
            </>
          </Grid>
        )}
        <Grid item md={1} xs={2}>
          <button onClick={resetFilters} className={"filter-option"}>
            reset
          </button>
        </Grid>
      </Grid>
    </>
  );
};

export default SiteFilters;
