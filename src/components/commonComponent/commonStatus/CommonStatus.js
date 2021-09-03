import React from "react";
import "./commonstatus.scss";
const CommonStatus = ({ status, statusTitle }) => {
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
            status === "pending"
              ? "red"
              : status === "completed"
              ? "#00B25D"
              : "#FF9013"
          }`,
        }}
      ></span>
      {statusTitle ? (
        <span className={`active-title`}>
          {statusTitle ? statusTitle : ""}
        </span>
      ) : (
        <span className={`${status}-title`}>
          {status ? capitalize(status) : ""}
        </span>
      )}
    </div>
  );
};

export default CommonStatus;
