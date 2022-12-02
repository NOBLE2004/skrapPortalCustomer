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
            status?.toLowerCase() === "pending" ||
            status?.toLowerCase() === "cancelled"
              ? "red"
              : status?.toLowerCase() === "completed"
              ? "#00B25D"
              : status?.toLowerCase() === "delivered"
              ? "#FF9013"
              : status?.toLowerCase() === "heading"
              ? "#3ca5e3"
              : status?.toLowerCase() === "ongoing"
              ? "#ecac63"
              : status?.toLowerCase() === "pickup-ongoing"
              ? "#6fff22"
              : status?.toLowerCase() === "requested"
              ? "rgb(81, 142, 248)" : status?.toLowerCase() === "on site"
                                            ? "rgb(81, 142, 248)"
              : "#FF9013"
          }`,
        }}
      ></span>
      <span  style={{
          color: `${
              status?.toLowerCase() === "pending" ||
              status?.toLowerCase() === "cancelled"
                  ? "red"
                  : status?.toLowerCase() === "completed"
                      ? "#00B25D"
                      : status?.toLowerCase() === "delivered"
                          ? "#FF9013"
                          : status?.toLowerCase() === "heading"
                              ? "#3ca5e3"
                              : status?.toLowerCase() === "ongoing"
                                  ? "#ecac63"
                                  : status?.toLowerCase() === "pickup-ongoing"
                                      ? "#6fff22"
                                      : status?.toLowerCase() === "requested"
                                          ? "rgb(81, 142, 248)" : status?.toLowerCase() === "on site"
                                              ? "rgb(81, 142, 248)"
                                              : "#FF9013"
          }`,
      }}>
        {status ? capitalize(status) : ""}
      </span>
    </div>
  );
};

export default CommonStatus;
