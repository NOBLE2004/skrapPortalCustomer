import React from "react";
import "./commonstatus.scss";
const CommonStatus = ({ status }) => {
  function capitalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div className="status-main">
      <span
        className="circle"
        style={{
          backgroundColor: `${
            status.toLowerCase() === "pending"
              ? "red"
              : status.toLowerCase() === "completed"
              ? "#00B25D"
              : status.toLowerCase() === "assigned"
              ? "#FF9013"
              : "#52a9dd"
          }`,
        }}
      ></span>
      {
        <span className={`${status.toLowerCase()}-title`}>
          {status ? capitalize(status) : ""}
        </span>
      }
    </div>
  );
};

export default CommonStatus;
