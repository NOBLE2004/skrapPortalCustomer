import React from "react";
import "./toolTipCard.scss";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { IconButton } from "@mui/material";

const styles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: "12px",
    top: "5px",
    color: theme.palette.grey[500],
    zIndex: 100,
    marginRight: "5px",
    width: "10px",
    height: "10px",
  },
}));

const ToolTipCard = ({ data, handleClose }) => {
  const classes = styles();
  return (
    <div className="tooltip">
      <div className="closeIcon">
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </div>

      <div className="tool-cardMain">
        {data}
        <a href="https://marketfinance.com/skrap-marketpay">MarketFinance</a>
      </div>
    </div>
  );
};

export default ToolTipCard;
