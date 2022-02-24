import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import JobService from "../../../services/job.service";
import { useHistory } from "react-router-dom";
import "../createJob/createJob.scss";
import { colors } from "@material-ui/core";
import PaymentService from "../../../services/payment.service";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import "../requestCollection/requestCollection.scss";

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);
const materialTheme = createTheme({
  palette: {
    primary: colors.blue,
  },
});
function JobReorderModal({ row, updateJobs, closeModal, isfromJob }) {
  const { job_id, payment_type } = row;
  let history = useHistory();
  const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    time_slot_loading: false,
    selectedTime: "12:00 PM - 05:00 PM",
  });

  const { isLoading, notice, selectedTime, time_slot_loading } = state;

  const handleTime = (time) => {
    setState({
      ...state,
      selectedTime: time.time_slot,
    });
    setIsTimeSelected(false);
  };

  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };

  useEffect(() => {
    let t_date = Date.parse(new Date());
    let d_date = Date.parse(startSelectedDate);
    setState({ ...state, time_slot_loading: true });
    PaymentService.getData({ t_date, d_date })
      .then((res) => {
        setTimeSlots(res.data.result.time_slots);
        setState({ ...state, time_slot_loading: false });
      })
      .catch((err) => {
        setState({ ...state, time_slot_loading: false });
      });
  }, [startSelectedDate]);

  const handleCreate = (e) => {
    e.preventDefault();

    if (timeSlots.length === 0) {
      return;
    }
    if (!selectedTime) {
      setIsTimeSelected(true);
      return;
    }
    setState({ ...state, isLoading: true });

    let currentDayOfMonth = startSelectedDate.getDate();
    let currentMonth = startSelectedDate.getMonth();

    if (currentDayOfMonth < 10) {
      currentDayOfMonth = "0" + currentDayOfMonth;
    }
    let newCurrentMonth = currentMonth + 1;

    if (newCurrentMonth < 10) {
      newCurrentMonth = "0" + newCurrentMonth;
    }

    const time = selectedTime && selectedTime.split("-");
    console.log("selectedTime", selectedTime);
    console.log("time", time);
    const startTime = time[0];
    const endTime = time[1];

    const newStartTime = startTime.trim().slice(0, 5);
    const newEndTime = endTime.trim().slice(0, 5);
    const currentYear = startSelectedDate.getFullYear();
    const dateString =
      currentYear + "-" + newCurrentMonth + "-" + currentDayOfMonth;
    const job_start_time = Date.parse(`${dateString}T${newStartTime}`);
    const job_end_time = Date.parse(`${dateString}T${newEndTime}`);

    const data = {
      job_id: job_id,
      payment_type: payment_type,
      job_start_time,
      job_end_time,
      job_dates: Date.parse(startSelectedDate),
    };

    JobService.copy(data)
      .then((res) => {
        if (Object.keys(res.data.result).length === 0) {
          setState({
            notice: {
              type: "error",
              text: res.data.description,
            },
          });
        } else {
          setState({
            notice: {
              type: "success",
              text: res.data.description,
            },
          });
          setTimeout(() => {
            closeModal();
            if (isfromJob) {
              updateJobs();
            } else {
              history.push("/jobs");
              updateJobs();
            }
          }, 2000);
        }
      })
      .catch((err) => {
        setState({
          notice: {
            type: "error",
            text: err.message,
          },
        });
      });
  };

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog
      maxWidth="sm"
      onClose={handleClose}
      className="creatJobModal"
      open={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Reorder Job
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="dateTimeWp">
              <div className="datewp">
                <p>Delivery Date Time</p>
                <ThemeProvider theme={materialTheme}>
                  <KeyboardDatePicker
                    margin="normal"
                    format="MM/dd/yyyy"
                    disablePast
                    value={startSelectedDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </ThemeProvider>
              </div>

              <div className="timeWp">
                {time_slot_loading ? (
                  <CircularProgress />
                ) : timeSlots.length > 0 ? (
                  timeSlots.map((elem, index) => (
                    <label
                      className={`firstShift ${
                        selectedTime === elem.time_slot && "active"
                      }`}
                      onClick={() => handleTime(elem)}
                      key={index}
                    >
                      {elem.time_slot}
                    </label>
                  ))
                ) : (
                  <p className="errorMsg">
                    Oops! Looks like we do not have any available slots for your
                    chosen date, at the moment. Try another date?
                  </p>
                )}
              </div>
            </div>
            {isTimeSelected && (
              <div className="error">Choose Time slot from above</div>
            )}
          </MuiPickersUtilsProvider>
        </form>
        <p className="buttonWp">
          <Button
            disabled={isLoading}
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={(e) => handleCreate(e)}
            color="primary"
            className="confirmJob"
          >
            Confirm
            {isLoading && <CircularProgress />}
          </Button>
        </p>

        {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
      </DialogContent>
    </Dialog>
  );
}

export default JobReorderModal;
