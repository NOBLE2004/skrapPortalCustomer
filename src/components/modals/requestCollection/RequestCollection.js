import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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

function RequestCollection({ row, updateJobs, closeModal, isfromJob }) {
  const {job_id} = row;
  let history = useHistory();
  const [state, setState] = useState({
    startSelectedDate: new Date(),
    isLoading: false,
    selectedTime: "firstShift",
    startTime: "08:00:00",
    driver: "",
  });

  const {
    startSelectedDate,
    selectedTime,
    startTime,
    driver,
    notice,
    isLoading,
  } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleStartDateChange = (date) => {
    setState({ ...state, startSelectedDate: date });
  };

  const handleTime = (start, end, option) => {
    setState({
      ...state,
      startTime: start,
      endTime: end,
      selectedTime: option,
    });
  };

  const handleCreate = () => {
    setState({ ...state, isLoading: true });

    let currentDayOfMonth = startSelectedDate.getDate();
    let currentMonth = startSelectedDate.getMonth();
    if (currentMonth < 10) {
      currentMonth = "0" + (currentMonth + 1);
    } else {
      currentMonth = currentMonth + 1;
    }

    if (currentDayOfMonth < 10) {
      currentDayOfMonth = "0" + currentDayOfMonth;
    }

    const currentYear = startSelectedDate.getFullYear();
    const dateString =
      currentYear + "-" + currentMonth + "-" + currentDayOfMonth;

    const startDatTime = Date.parse(`${dateString}T${startTime}`);

    let data = { job_id: job_id, pickup_date: startDatTime };

    JobService.requestCollection(data)
      .then((response) => {
        setTimeout(() => {
          if (isfromJob) {
            updateJobs();
          }
          handleClose();
          history.push("/jobs");
        }, 2000);
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "success",
            text: response.data.description,
          },
        });
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "error",
            text: err.response.data.message,
          },
        });
      });
  };
  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog
      maxWidth="md"
      onClose={handleClose}
      className="creatJobModal"
      open={true}
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Request Collection
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div className="dateTimeWp">
              <div>
                <p>Delivery Date Time</p>
                <KeyboardDatePicker
                  margin="normal"
                  format="MM/dd/yyyy"
                  value={startSelectedDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </div>
              <div className="timeWp">
                <label
                  className={`firstShift ${
                    selectedTime === "firstShift" && "active"
                  }`}
                  onClick={() =>
                    handleTime("08:00:00", "12:00:00", "firstShift")
                  }
                >
                  8:00 AM - 12:00PM
                </label>
                <label
                  className={`secondShift ${
                    selectedTime === "secondShift" && "active"
                  }`}
                  onClick={() =>
                    handleTime("12:00:00", "17:00:00", "secondShift")
                  }
                >
                  12:00 PM - 5:00PM
                </label>
              </div>
            </div>
          </MuiPickersUtilsProvider>

          {/* <div className="selectWp">
            <p>Driver</p>
            <FormControl variant="outlined" margin="dense">
              <Select value={driver} onChange={handleChange} name="driver">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {driverList.map((data, index) => {
                  return (
                    <MenuItem value={data} key={index}>
                      {data.account_info.first_name +
                        " " +
                        data.account_info.last_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div> */}
        </form>
        <p className="buttonWp">
          <Button
            disabled={isLoading}
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={() => handleCreate()}
            color="primary"
            className="confirmJob"
          >
            create
            {isLoading && <CircularProgress />}
          </Button>
        </p>

        {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => {
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(RequestCollection);
