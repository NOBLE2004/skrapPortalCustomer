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
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import ServiceService from "../../../services/service.service";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PaymentService from "../../../services/payment.service";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import JobService from "../../../services/job.service";
import { useHistory } from "react-router-dom";
import "./createExchange.scss";
import {getUserDataFromLocalStorage} from "../../../services/utils";

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

function CreateExchange({closeModal, row, updateJobs, isfromJob}) {
 const {postcode, customer_user_id, job_id, parent_id} = row;
  let history = useHistory();
  const [serviceList, setServiceList] = useState([]);
  const [credit, setCredit] = useState(0);
  const [state, setState] = useState({
    startSelectedDate: new Date(),
    cost: "",
    paymentMethod: "",
    selectedPaymentMethod: "",
    paymentMethodList: [],
    notice: null,
    isLoading: false,
    service: "",
    selectedTime: "firstShift",
    startTime: "08:00:00",
    endTime: "12:00:00",
    addNewCard: false,
    addedNewCard: false,
    purchaseOrder: "",
    service_id: "",
    note: "",
  });
  const {
    startSelectedDate,
    paymentMethod,
    selectedPaymentMethod,
    paymentMethodList,
    service,
    service_id,
    cost,
    selectedTime,
    startTime,
    endTime,
    notice,
    isLoading,
    addNewCard,
    addedNewCard,
    purchaseOrder,
    note,
  } = state;

  const [errors, setError] = useState({
    service: "",
    cost: "",
    paymentMethod: "",
    purchaseOrder: "",
  });

  const checkingError = (name, value) => {
    switch (name) {
      case "service":
      case "cost":
      case "paymentMethod":
      case "purchaseOrder":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      default:
        break;
    }
    setError({ ...errors });
  };

  //getcardlist
  useEffect(() => {
    let data = {
      user_id: customer_user_id,
    };
    PaymentService.list({ user_id: localStorage.getItem("userId") }).then((response) => {
      setState({ ...state, paymentMethodList: response.data.result });
    });
  }, [addedNewCard]);

  //getservices
  useEffect(() => {
    let data = {
      post_code: postcode,
      service_type: parent_id,
      is_app: 0,
    };
    ServiceService.subServicelist(data).then((response) => {
      setServiceList(response.data.result);
    });
    const userCredit = getUserDataFromLocalStorage();
    setCredit(userCredit.credit_balance);
    setState({
      ...state,
      customerUserId: localStorage.getItem("user_id"),
    });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "service":
        if (serviceList[value]) {
          console.log(serviceList[value]);
          setState({ ...state, [name]: value, service_id: serviceList[value].sub_service_id, cost: serviceList[value].price });
        } else {
          setState({ ...state, [name]: value, cost: "", service_id: "" });
        }
        break;
      case "cost":
        setState({ ...state, [name]: +value });
        break;
      default:
        setState({ ...state, [name]: value });
    }
    checkingError(name, value);
  };

  const handleStartDateChange = (date) => {
    setState({ ...state, startSelectedDate: date });
  };

  const handleShowNewCard = () => {
    setState({ ...state, addNewCard: true });
  };

  const handleTime = (start, end, option) => {
    setState({
      ...state,
      startTime: start,
      endTime: end,
      selectedTime: option,
    });
  };

  const handleSaveNewCard = () => {
    setState({ ...state, addedNewCard: !state.addedNewCard });
  };

  const handleCreate = () => {
    if (
      service === "" ||
      cost === "" ||
      paymentMethod === "" ||
      purchaseOrder === ""
    ) {
      Object.keys(errors).forEach((error) => {
        checkingError(error, state[error]);
      });
      return;
    }

    setState({ ...state, isLoading: true });

    const currentDayOfMonth = startSelectedDate.getDate();
    let currentMonth = startSelectedDate.getMonth();
    if (currentMonth < 10) {
      currentMonth = "0" + (currentMonth + 1);
    } else {
      currentMonth = currentMonth + 1;
    }
    const currentYear = startSelectedDate.getFullYear();
    const dateString =
      currentYear + "-" + currentMonth + "-" + currentDayOfMonth;

    const job_start_time = Date.parse(`${dateString}T${startTime}`);
    const job_end_time = Date.parse(`${dateString}T${endTime}`);

    let data = {
      card_id: selectedPaymentMethod,
      is_notify: 0,
      is_permit: 0,
      job_dates: [Date.parse(startSelectedDate)],
      job_end_time: job_end_time,
      job_id: job_id,
      job_start_time: job_start_time,
      payment_type: paymentMethod,
      permit_cost: 0,
      service_cost: cost,
      service_id: service_id,
      skip_req_days: 0,
      status: 0,
      user_id: customer_user_id,
      purchase_order: purchaseOrder,
      comments: note,
      show_on_portal: 0
    };

    JobService.createExchange(data)
      .then((response) => {
        setTimeout(() => {
          handleClose();
          if(isfromJob){
            updateJobs();
            history.push("/jobs");
          }else{
            updateJobs();
          }
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
      className="createExchangeModal"
      open={true}
    >
      <DialogTitle onClose={handleClose}>
        Create Exchange
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <div className="selectWp">
            <p>Service</p>
            <FormControl variant="outlined" margin="dense">
              <Select
                value={service}
                onChange={handleChange}
                name="service"
                error={errors["service"].length > 0 ? true : false}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {serviceList.map((data, index) => {
                  return (
                    <MenuItem value={index} key={index}>
                      {data.service_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div>
            <p>Cost</p>
            <TextField
              value={cost}
              name="cost"
              onChange={handleChange}
              fullWidth={true}
              disabled={true}
              variant="outlined"
              error={errors["cost"].length > 0 ? true : false}
            />
          </div>
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
          <div className="selectWp">
            <p>Payment</p>
            <FormControl variant="outlined" margin="dense">
              {credit === 0 ? (
              <Select
                value={paymentMethod}
                onChange={handleChange}
                name="paymentMethod"
                error={errors["paymentMethod"].length > 0 ? true : false}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="0">Stripe</MenuItem>
              </Select>) : (<Select
                  value={paymentMethod}
                  onChange={handleChange}
                  name="paymentMethod"
                  error={errors["paymentMethod"].length > 0 ? true : false}
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="0">Stripe</MenuItem>
                <MenuItem value="2">Credit</MenuItem>
              </Select>)
              }
            </FormControl>
          </div>

          {paymentMethod === "0" && (
            <>
              <RadioGroup
                name="selectedPaymentMethod"
                value={selectedPaymentMethod}
                onChange={handleChange}
              >
                {paymentMethodList.map((data, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      value={data.id}
                      control={<Radio color="primary" />}
                      label={`•••• •••• •••• ${data.card.last4} - ${data.card.brand}`}
                    />
                  );
                })}
              </RadioGroup>
              {paymentMethodList.length > 0 ? (
                <Button
                  className="newCard"
                  onClick={() => handleShowNewCard()}
                  variant="contained"
                >
                  Add new card
                </Button>
              ) : (
                <CardPayment
                  user_id={customer_user_id}
                  handleSaveNewCard={() => handleSaveNewCard()}
                  setOpen={() => setState({ ...state, addNewCard: false })}
                />
              )}
              {addNewCard && (
                <CardPayment
                  user_id={customer_user_id}
                  handleSaveNewCard={() => handleSaveNewCard()}
                  setOpen={() => setState({ ...state, addNewCard: false })}
                />
              )}
            </>
          )}

          <div>
            <p>Purchase Order</p>
            <TextField
              value={purchaseOrder}
              error={errors["purchaseOrder"].length > 0 ? true : false}
              name="purchaseOrder"
              onChange={handleChange}
              fullWidth={true}
              variant="outlined"
              placeholder="SN14662"
            />
          </div>
          <div className="note">
            <p>Notes</p>
            <TextareaAutosize
              value={note}
              name="note"
              onChange={handleChange}
              rowsMin={4}
              placeholder="Notes here"
            />
          </div>
        </form>
        <p className="buttonWp">
          <Button
            disabled={isLoading}
            variant="contained"
            style={{ marginTop: "20px", marginBottom: "20px" }}
            onClick={() => handleCreate()}
            color="primary"
            className="createExchangeBtn"
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateExchange);
