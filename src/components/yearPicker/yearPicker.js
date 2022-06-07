import React, { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "./yearPicker.scss";

import "react-datepicker/dist/react-datepicker.css";
const Example = () => {
  const [startDate, setStartDate] = useState(new Date());
  const handleDateNext = () => {
    if (startDate != new Date()) {
      const aYearFromNow = startDate;
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
      setStartDate(aYearFromNow);
    }
  };
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <>
      <span>{`${"<"}`}</span>
      <span className="example-custom-input" onClick={onClick} ref={ref}>
        &nbsp; {value}
      </span>
      &nbsp;
      <span
        onClick={() => {
          handleDateNext();
        }}
      >{`${">"}`}</span>
    </>
  ));
  return (
    <div className="date-picker-main">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
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
