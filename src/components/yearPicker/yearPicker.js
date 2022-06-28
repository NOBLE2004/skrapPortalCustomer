import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "./yearPicker.scss";

import "react-datepicker/dist/react-datepicker.css";
const Example = (props) => {
  const { startDate, setStartDate, getData } = props
  const handleDateNext = () => {
    if (startDate.getFullYear() != new Date().getFullYear()) {
      const aYearFromNow = startDate;
      let newDate = aYearFromNow?.setFullYear(aYearFromNow?.getFullYear() + 1);
      setStartDate(new Date(newDate));
      getData(startDate.getFullYear())
    }
  };
  const handlePrevDate = () => {
    if (startDate != new Date()) {
      const aYearFromNow = startDate;
      let newDate = aYearFromNow?.setFullYear(aYearFromNow?.getFullYear() - 1);
      setStartDate(new Date(newDate));
      getData(startDate.getFullYear())
    }
  };
  const handleYearChange = (event) => {
    setStartDate(event)
    getData(event.getFullYear())
  };

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <span
        onClick={() => {
          handlePrevDate();
        }}
        style={{ padding: "0px 6px" }}
      >{`${"<"}`}</span>
      <span className="example-custom-input" onClick={onClick} ref={ref}>
        &nbsp; {value}
      </span>
      &nbsp;
      <span
        onClick={() => {
          handleDateNext();
        }}
        style={{ padding: "0px 6px" }}
      >{`${">"}`}</span>
    </>
  ));
  return (
    <div className="date-picker-main">
      <DatePicker
        selected={startDate}
        onChange={(date) => handleYearChange(date)}
        showYearPicker
        dateFormat="yyyy"
        yearItemNumber={15}
        customInput={<ExampleCustomInput />}
        maxDate={new Date()}
      />
    </div>
  );
};

export default Example;
