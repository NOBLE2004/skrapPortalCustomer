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
              : status.toLowerCase() === "delivered"
              ? "#FF9013"
                    : status.toLowerCase() === "heading"
              ? "#3ca5e3"
              : status.toLowerCase() === "ongoing"
              ? "#ecac63" 
                            : status.toLowerCase() === "pickup-ongoing"
              ? "#6fff22"
              : "#FF9013"
          }`,
        }}
      ></span>
        <span className={`${status.toLowerCase().replace(' ', '-')}-title`}>
          {status ? capitalize(status) : ""}
        </span>
    </div>
  );
};

export default CommonStatus;
