import React, { useState, useEffect } from "react";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Alert from "@mui/lab/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/lab";
import DateFnsUtils from "@date-io/date-fns";
import JobService from "../../../services/job.service";
import { useHistory } from "react-router-dom";
import "../createJob/createJob.scss";
import { colors } from "@mui/material";
import PaymentService from "../../../services/payment.service";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import { MARKET_PAY_LIST, MARKET_PAY_LIST1 } from "../../../environment";
import ToolTipCard from "../../commonComponent/toolTipCard/ToolTipCard";
import { marketInfoIcon } from "../../../assets/images";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import CompanyDetail from "../companyDetail/CompanyDetail";
import "../requestCollection/requestCollection.scss";
import TextField from "@mui/material/TextField";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

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
  const { job_id } = row;
  let history = useHistory();

  const [acountInfo, setAccountInfo] = useState({});
  const [paymentLoading, setPaymentloader] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [isCardAdded, setIsCardAdded] = useState(false);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [showToolTip1, setShowToolTip1] = useState(false);
  const [credit, setCredit] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const [mData, setmData] = useState("");
  const [mPay, setMPay] = useState(false);
  const [comp_number, setComp_number] = useState("");
  const [addNewCard, setAddNewCard] = useState(false);
  const [paymentMethodList, setPaymentMethodList] = useState([]);

  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    time_slot_loading: false,
    selectedTime: "12:00 PM - 05:00 PM",
    selectedPaymentMethod: "",
    selectedMarketPay: "",
    isCompanyModal: false,
  });

  const {
    isLoading,
    notice,
    selectedTime,
    time_slot_loading,
    selectedPaymentMethod,
    selectedMarketPay,
    isCompanyModal,
  } = state;

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

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentError(false);
    setState({ ...state, notice: null });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "selectedMarketPay") {
      setState({
        ...state,
        [name]: value,
        isCompanyModal: true,
        notice: false,
      });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  const handleSaveNewCard = () => {
    setIsCardAdded(!isCardAdded);
  };

  const handleShowNewCard = () => {
    setAddNewCard(true);
  };

  const handleToolTip = (ab) => {
    if (ab === 0) {
      setShowToolTip(!showToolTip);
      setShowToolTip1(false);
    }
    if (ab === 1) {
      setShowToolTip1(!showToolTip1);
      setShowToolTip(false);
    }
  };

  useEffect(() => {
    const userCredit = getUserDataFromLocalStorage();
    setRoleId(userCredit.role_id);
    setCredit(userCredit.credit_balance);
    setMPay(userCredit.market_pay);
    setmData(userCredit.market_finance_balance);
    setComp_number(userCredit.company_reg_number);
  }, []);

  useEffect(() => {
    PaymentService.list({ user_id: localStorage.getItem("user_id") }).then(
      (response) => {
        // setState({ ...state, paymentMethodList: response.data.result });
        setPaymentMethodList(response.data.result);
      }
    );
  }, [paymentMethod, addNewCard, isCardAdded]);

  useEffect(() => {
    if (paymentMethod === "10") {
      setPaymentloader(true);
      JobService.checkBlocked({ user_id: localStorage.getItem("user_id") })
        .then((res) => {
          setAccountInfo(res.data.result);
          setPaymentloader(false);
        })
        .catch((err) => {
          console.log("err", err.message);
          setPaymentloader(false);
        });
    }
  }, [paymentMethod]);

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

  useEffect(() => {
    window.addEventListener(
      "message",
      function (ev) {
        if (ev.data.code === 0) {
          setState({
            ...state,
            isLoading: false,
            notice: {
              type: "success",
              text: "Successfully reordered!",
            },
          });
          setTimeout(() => {
            handleClose();
            if (isfromJob) {
              updateJobs();
              history.push("/jobs");
            } else {
              updateJobs();
            }
          }, 2000);
        } else {
          setState({
            ...state,
            notice: {
              type: "error",
              text: ev.data.message,
            },
          });
        }
      },
      false
    );
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();

    if (timeSlots.length === 0) {
      return;
    }
    if (!selectedTime) {
      setIsTimeSelected(true);
      return;
    }
    if (paymentMethod === "") {
      setPaymentError(true);
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
      payment_type: paymentMethod,
      job_start_time,
      job_end_time,
      job_dates: Date.parse(startSelectedDate),
      card_id: paymentMethod === "0" ? selectedPaymentMethod : "",
      market_pay_type: paymentMethod === "10" ? selectedMarketPay : "",
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
        } else if (res.data.code === 11) {
          const iframe = document.createElement("iframe");
          iframe.src = res.data.result.url;
          iframe.width = "800";
          iframe.height = "800";
          // @ts-ignore
          window.open(
            res.data.result.url,
            "Dynamic Popup",
            "height=" +
              iframe.height +
              ", width=" +
              iframe.width +
              "scrollbars=auto, resizable=no, location=no, status=no"
          );
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
          <LocalizationProvider utils={DateFnsUtils} dateAdapter={AdapterDateFns}>
            <div className="dateTimeWp">
              <div className="datewp">
                <p>Delivery Date Time</p>
                <ThemeProvider theme={materialTheme}>
                  <DatePicker
                    margin="normal"
                    format="MM/dd/yyyy"
                    disablePast
                    value={startSelectedDate}
                    onChange={handleStartDateChange}
                    renderInput={(props) => <TextField {...props} />}
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
          </LocalizationProvider>
          <div>
            {roleId != 12 && (
              <div className="paymentWp">
                {mPay ? (
                  <>
                    {mData ? (
                      <div className="payment">
                        <p>Payment Method</p>
                        <FormControl variant="outlined" margin="dense">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Payment method
                          </InputLabel>
                          <Select
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={handlePaymentMethod}
                            label="Payment method"
                            error={paymentError ? true : false}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value="10">MarketPay</MenuItem>
                            <MenuItem value="0">Stripe</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    ) : (
                      <div className="payment">
                        <p>Payment Method</p>
                        <FormControl variant="outlined" margin="dense">
                          <InputLabel id="demo-simple-select-outlined-label">
                            Payment method
                          </InputLabel>
                          <Select
                            name="paymentMethod"
                            value={paymentMethod}
                            onChange={handlePaymentMethod}
                            label="Payment method"
                            error={paymentError ? true : false}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {credit > 0 && (
                              <MenuItem value="2">Credit</MenuItem>
                            )}
                            <MenuItem value="10">MarketPay</MenuItem>
                            <MenuItem value="0">Stripe</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="payment">
                    <p>Payment Method</p>
                    <FormControl variant="outlined" margin="dense">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Payment method
                      </InputLabel>
                      <Select
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={handlePaymentMethod}
                        label="Payment method"
                        error={paymentError ? true : false}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {credit > 0 && <MenuItem value="2">Credit</MenuItem>}
                        <MenuItem value="0">Stripe</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "0" && (
              <>
                <RadioGroup
                  name="selectedPaymentMethod"
                  value={selectedPaymentMethod}
                  onChange={handleChange}
                >
                  {paymentMethodList &&
                    paymentMethodList.map((data, index) => {
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
                {paymentMethodList && paymentMethodList.length > 0 ? (
                  <Button
                    className="newCard"
                    onClick={() => handleShowNewCard()}
                    variant="contained"
                  >
                    Add new card
                  </Button>
                ) : (
                  <CardPayment
                    user_id={localStorage.getItem("user_id")}
                    handleSaveNewCard={() => handleSaveNewCard()}
                    setOpen={() => setAddNewCard(false)}
                  />
                )}
                {addNewCard && (
                  <CardPayment
                    user_id={localStorage.getItem("user_id")}
                    handleSaveNewCard={() => handleSaveNewCard()}
                    setOpen={() => setAddNewCard(false)}
                  />
                )}
              </>
            )}
            <div style={{ position: "relative" }}>
              {paymentMethod === "10" && (
                <>
                  {paymentLoading ? (
                    <div className="payLoading">
                      <CircularProgress />
                    </div>
                  ) : (
                    <RadioGroup
                      name="selectedMarketPay"
                      value={selectedMarketPay}
                      onChange={handleChange}
                    >
                      {acountInfo && acountInfo.pay30_eofm
                        ? MARKET_PAY_LIST.map((data, index) => {
                            return (
                              <>
                                <div className="marketMain">
                                  <FormControlLabel
                                    key={data.id}
                                    value={data.id}
                                    control={<Radio color="primary" />}
                                    label={`${data.title}`}
                                  />

                                  <img
                                    src={marketInfoIcon}
                                    alt="market"
                                    className="tool-img"
                                    onClick={() => handleToolTip(index)}
                                  />
                                  {showToolTip && data.tooltip && (
                                    <ToolTipCard data={data.tooltip} />
                                  )}
                                  {showToolTip1 && data.tooltip1 && (
                                    <ToolTipCard data={data.tooltip1} />
                                  )}
                                </div>
                                {data.text && (
                                  <div className="remaining-balance">
                                    {`${data.text} : ${localStorage.getItem("currency")?localStorage.getItem("currency"):'£'} ${acountInfo.market_finance_balance}`}
                                  </div>
                                )}
                              </>
                            );
                          })
                        : MARKET_PAY_LIST1.map((data, index) => {
                            return (
                              <div className="marketMain">
                                <FormControlLabel
                                  key={data.id}
                                  value={data.id}
                                  control={<Radio color="primary" />}
                                  label={`${data.title}`}
                                />

                                <img
                                  src={marketInfoIcon}
                                  alt="market"
                                  className="tool-img"
                                  onClick={() => handleToolTip(index)}
                                />
                                {showToolTip && data.tooltip && (
                                  <ToolTipCard data={data.tooltip} />
                                )}
                              </div>
                            );
                          })}
                    </RadioGroup>
                  )}
                </>
              )}
            </div>
          </div>
        </form>
        {isCompanyModal && comp_number === "" && (
          <CompanyDetail
            closeModal={() => setState({ ...state, isCompanyModal: false })}
          />
        )}
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
