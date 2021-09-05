import React from "react";
import { Line } from "react-chartjs-2";
import { chartLineOption, spendData } from "../../utlils/constants";
import "./totalspend.scss";

const TotalSpend = ({ totalSpend }) => {

  return (
    <div className="listViewWp">
      <div className="lineChartWp">
        <div className="chartInfo">
          <h1>{`£ ${totalSpend ? totalSpend : '34,442.00'}`} </h1>
          <span className="primary-title"> Total Spend </span>
        </div>
        <div className="lineChart">
          <Line data={spendData} options={chartLineOption} />
        </div>
      </div>
    </div>
  );
};

export default TotalSpend;
