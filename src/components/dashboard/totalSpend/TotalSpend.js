import React, { memo } from "react";
import { Line } from "react-chartjs-2";
import { chartLineOption, spendData } from "../../utlils/constants";
import BeatLoader from "react-spinners/BeatLoader";
import "./totalspend.scss";
import { Box } from "@mui/material";

const TotalSpend = ({ totalSpend, isLoading }) => {
  return (
    <div className="listViewWp">
      <div className="lineChartWp">
        <Box display="flex" alignItems="center">
          <p className="switch-title">Filter by:</p>
          <span className="filter-bold">Month</span>
        </Box>
        <div className="chartInfo">
          <h1 className="clr-light-blue">
            {`£ ${totalSpend ? totalSpend : "00.00"}`}{" "}
          </h1>
          <span className="sub-heading-card clr-light-blue"> Total Spend </span>
        </div>
        {/* <div className="lineChart">
          <Line data={spendData} options={chartLineOption} />
        </div> */}
      </div>
    </div>
  );
};

export default memo(TotalSpend);
