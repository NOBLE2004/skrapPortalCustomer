import React, { useEffect, useState } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";
import "./acceptJob.scss";
import {
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@material-ui/core";
import moment from "moment";
import jobService from "../../../services/job.service";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import { paymentTypes } from "../../utlils/constants";
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

const AcceptJobModal = (props) => {
  const { handleClose, jobdata } = props;
  const [credit, setCredit] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    paymentMethod: "",
  });

  useEffect(() => {
    const userInfo = getUserDataFromLocalStorage();
    setCredit(userInfo.credit_balance);
  }, []);

  const { notice, isLoading, paymentMethod } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    setPaymentError(false);
  };
  const handleSubmit = () => {
    if (!paymentMethod) {
      setPaymentError(true);
      return;
    }
    const data = {
      card_id: "",
      is_notify: 1,
      job_id: jobdata.job_id,
      user_id: jobdata.customer_user_id,
      payment_type: paymentMethod,
    };

    setState({ ...state, isLoading: true });
    jobService
      .acceptOrderRequest(data)
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
      <Dialog open={true} onClose={handleClose} className="booksitemodal">
        <DialogTitle onClose={handleClose}> Job Info </DialogTitle>
        <DialogContent dividers className="acceptmodal">
          <div className="info">
            <div className="designation">Request By</div>
            <div className="personal-title">
              {jobdata ? jobdata.first_name + jobdata.last_name : "n/a"}
            </div>
          </div>
          <div className="info">
            <div className="designation">Service Name</div>
            <div className="personal-title">
              {jobdata ? jobdata.extra_service_name : "n/a"}
            </div>
          </div>
          <div className="info">
            <div className="designation">Address</div>
            <div className="personal-title">
              {jobdata ? jobdata.job_address : "n/a"}
            </div>
          </div>
          <div className="info">
            <div className="designation">Delivery</div>
            <div className="personal-title">
              {jobdata ? moment(jobdata.job_time).format("MM-DD-YYYY") : "n/a"}
            </div>
          </div>
          <div className="payment-main">
            <div className="designations">Payment Method</div>
            <div className="payment">
              <FormControl variant="outlined" margin="dense">
                <InputLabel id="demo-simple-select-outlined-label">
                  Payment method
                </InputLabel>
                <Select
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handleChange}
                  label="Payment method"
                  error={paymentError ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {credit > 0 ? (
                    paymentTypes.map((elem, index) => {
                      return (
                        <MenuItem value={elem.value} key={index}>
                          {elem.name}
                        </MenuItem>
                      );
                    })
                  ) : (
                    <MenuItem value="2">Credit</MenuItem>
                  )}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="info">
            <div className="designation">Total Cost</div>
            <div className="personal-title">
              {jobdata ? "£" + jobdata.service_rate : "n/a"}
            </div>
          </div>
          <Button
            className="confirmJob"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Confirm
            {isLoading && <CircularProgress />}
          </Button>
          <div className="alert-msg">
            {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcceptJobModal;
