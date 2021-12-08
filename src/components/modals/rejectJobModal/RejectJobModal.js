import React, { useEffect, useState } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import jobService from "../../../services/job.service";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./rejectModal.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const RejectJobModal = (props) => {
  const { handleClose, jobdata } = props;
  const [state, setState] = useState({
    notice: null,
    isLoading: false,
  });
  const { notice, isLoading } = state;
  const handleSubmit = () => {
    const data = {
      is_notify: 1,
      job_id: jobdata.job_id,
      user_id: jobdata.customer_user_id,
    };
    setState({ ...state, isLoading: true });
    jobService
      .rejectOrderRequest(data)
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "success",
            text: res.data.description,
          },
        });
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "error",
            text: err.message,
          },
        });
      });
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        className="rejectmodal"
        maxWidth="sm"
      >
        <DialogTitle onClose={handleClose}> Job Info </DialogTitle>
        <DialogContent dividers>
          <div className="info">
            <div className="designation">Are you sure to reject this job</div>
          </div>
          <div className="align-btn">
            <Button
              className="confirmJob"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Confirm
              {isLoading && <CircularProgress />}
            </Button>
            <Button
              className="confirmJob"
              variant="contained"
              color="primary"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
          <div className="alert-msg">
            {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RejectJobModal;
