import React from "react";
import "./toolTipCard.scss";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    zIndex: 100,
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
