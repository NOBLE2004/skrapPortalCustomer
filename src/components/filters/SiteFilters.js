import React, { useEffect, useState } from "react";
import "../commonComponent/commonfilter/commonfilter.scss";
import { JOB_STATUS } from "../../environment/";
import ServicesService from "../../services/service.service";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import moment from "moment";
import RangeDatePicker from "../RangePicker/index";

const SiteFilters = ({ handleChangeFilters }) => {
  const [filters, setFilters] = useState({
    date: "",
  });
  const [togle, setTogle] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  useEffect(() => {
    handleChangeFilters(filters);
  }, [filters]);
  const toggle = () => {
    setTogle(!togle);
  };
  const handleDate = (item) => {
    setState([item.selection]);
  };
  const resetFilters = () => {
    setFilters({
      date: "",
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
    setFilters({ ...filters, date: `${newStartDate},${newEndDate}` });
    handleClose();
  };
  return (
    <div className="filter-container">
      <div className="filter-title">Filter : </div>
      <div className="all-filters">
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
          <button onClick={resetFilters} className={"filter-option"}>
            reset
          </button>
        </>
      </div>
    </div>
  );
};

export default SiteFilters;
