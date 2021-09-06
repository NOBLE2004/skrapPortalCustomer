import React from "react";
import ManagerDetail from "../siteManager/managerDetail/ManagerDetail";
import Rating from "@material-ui/lab/Rating";

const DriverDetail = () => {
  const [value, setValue] = React.useState(2);
  return (
    <div>
      <ManagerDetail title={"Driver Detail"} />
      <div className="rating">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <div className="normal-dsans-10-dark">Rate Driver <span className="bold-dsans-12-primary">Here</span></div>
      </div>
    </div>
  );
};

export default DriverDetail;
