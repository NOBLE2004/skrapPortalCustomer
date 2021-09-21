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
<<<<<<< HEAD
            status == "pending"
              ? "red"
              : status == "completed"
=======
            status.toLowerCase() === "pending"
              ? "red"
              : status.toLowerCase() === "completed"
>>>>>>> 2e1d7d354ecb3efb0bb67654915478e5d85cf608
              ? "#00B25D"
              : status.toLowerCase() === "assigned"
              ? "#FF9013"
              : "#52a9dd"
          }`,
        }}
      ></span>
<<<<<<< HEAD
      {statusTitle ? (
        <span className={`active-title`}>
          {statusTitle ? statusTitle : ""}
        </span>
      ) : (
        <span style={{
            color: `${
                status == "pending"
                    ? "red"
                    : status == "completed"
                    ? "#00B25D"
                    : "#FF9013"
            }`,
        }} className={`${status}-title`}>
=======
      {
        <span className={`${status.toLowerCase()}-title`}>
>>>>>>> 2e1d7d354ecb3efb0bb67654915478e5d85cf608
          {status ? capitalize(status) : ""}
        </span>
      }
    </div>
  );
};

export default CommonStatus;
