import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Alert from "@mui/lab/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import ServiceService from "../../../services/service.service";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { LocalizationProvider, DatePicker } from "@mui/lab";
import DateFnsUtils from "@date-io/date-fns";
import PaymentService from "../../../services/payment.service";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import JobService from "../../../services/job.service";
import { useHistory } from "react-router-dom";
import "./createExchange.scss";
import { MARKET_PAY_LIST } from "../../../environment";
import { marketInfoIcon } from "../../../assets/images";
import ToolTipCard from "../../commonComponent/toolTipCard/ToolTipCard";

import { getUserDataFromLocalStorage } from "../../../services/utils";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

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

function CreateExchange({ closeModal, row, updateJobs, isfromJob }) {
  const { postcode, customer_user_id, job_id, parent_id } = row;
  let history = useHistory();
  const currency = localStorage.getItem("currency");
  const [serviceList, setServiceList] = useState([]);
  const [credit, setCredit] = useState(0);
  const [mPay, setMPay] = useState(false);
  const [mData, setmData] = useState("");
  const [paymentLoading, setPaymentloader] = useState(false);
  const [acountInfo, setAccountInfo] = useState({});
  const [showToolTip, setShowToolTip] = useState(false);
  const [showToolTip1, setShowToolTip1] = useState(false);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isTimeSelected, setIsTimeSelected] = useState(false);
  const [state, setState] = useState({
    startSelectedDate: new Date(),
    cost: "",
    paymentMethod: "",
    selectedPaymentMethod: "",
    notice: null,
    isLoading: false,
    service: "",
    addNewCard: false,
    addedNewCard: false,
    selectedMarketPay: "",
    purchaseOrder: "",
    service_id: "",
    totalCost: 0,
    note: "",
    time_slot_loading: false,
  });
  const {
    startSelectedDate,
    paymentMethod,
    selectedPaymentMethod,
    service,
    service_id,
    cost,
    selectedTime,
    notice,
    isLoading,
    addNewCard,
    addedNewCard,
    totalCost,
    purchaseOrder,
    time_slot_loading,
    selectedMarketPay,
    note,
  } = state;

  const [errors, setError] = useState({
    service: "",
    cost: "",
    paymentMethod: "",
  });

  const checkingError = (name, value) => {
    switch (name) {
      case "service":
      case "cost":
      case "paymentMethod":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      default:
        break;
    }
    setError({ ...errors });
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

  //getcardlist
  useEffect(() => {
    let data = {
      user_id: customer_user_id,
    };
    PaymentService.list({ user_id: localStorage.getItem("user_id") }).then(
      (response) => {
        // setState({ ...state, paymentMethodList: response.data.result });
        setPaymentMethodList(response.data.result);
      }
    );
  }, [addedNewCard]);

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

  //getservices
  useEffect(() => {
    let data = {
      post_code: postcode,
      service_type: parent_id,
      is_app: 0,
      user_id: localStorage.getItem("user_id"),
    };
    ServiceService.subServicelist(data).then((response) => {
      setServiceList(response.data.result);
    });
    const userCredit = getUserDataFromLocalStorage();
    setCredit(userCredit.credit_balance);
    setMPay(userCredit.market_pay);
    setmData(userCredit.market_finance_balance);

    setState({
      ...state,
      customerUserId: localStorage.getItem("user_id"),
    });
  }, []);

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
              text: "Successfully Created Job!",
            },
          });
          setTimeout(() => {
            closeModal();
            updateJobs();
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "service":
        if (serviceList[value]) {
          setState({
            ...state,
            [name]: value,
            service_id: serviceList[value].sub_service_id,
            cost: serviceList[value].price,
          });
        } else {
          setState({ ...state, [name]: value, cost: "", service_id: "" });
        }
        break;
        case "selectedMarketPay":
          setState({ ...state, isCompanyModal: true, [name]: value });
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

  const handleTime = (time) => {
    setState({
      ...state,
      selectedTime: time.time_slot,
    });
    setIsTimeSelected(false);
  };

  const handleSaveNewCard = () => {
    setState({ ...state, addedNewCard: !state.addedNewCard });
  };

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
              text: "Successfully created exchange!",
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

  const handleCreate = () => {
    if (service === "" || cost === "" || paymentMethod === "") {
      Object.keys(errors).forEach((error) => {
        checkingError(error, state[error]);
      });
      return;
    }
    if (!selectedTime) {
      setIsTimeSelected(true);
      return;
    }

    //setState({ ...state, isLoading: true });

    let currentDayOfMonth = startSelectedDate.getDate();
    let currentMonth = startSelectedDate.getMonth();
    let newCurrentMonth = currentMonth + 1;

    if (newCurrentMonth < 10) {
      newCurrentMonth = "0" + newCurrentMonth;
    }
    if (currentDayOfMonth < 10) {
      currentDayOfMonth = "0" + currentDayOfMonth;
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
      show_on_portal: 0,
    };

    JobService.createExchange(data)
      .then((response) => {
        if (response.data.code === 11) {
          const iframe = document.createElement("iframe");
          iframe.src = response.data.result.url;
          iframe.width = "800";
          iframe.height = "800";
          // @ts-ignore
          window.open(
            response.data.result.url,
            "Dynamic Popup",
            "height=" +
              iframe.height +
              ", width=" +
              iframe.width +
              "scrollbars=auto, resizable=no, location=no, status=no"
          );
        } else if (response.data.code === 6) {
          setState({
            ...state,
            isLoading: false,
            notice: {
              type: "error",
              text: response.data.description,
            },
          });
        } 
        else {
          setTimeout(() => {
            handleClose();
            if (isfromJob) {
              updateJobs();
              history.push("/jobs");
            } else {
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
        }
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

  return (
    <Dialog
      maxWidth="md"
      onClose={handleClose}
      className="createExchangeModal"
      open={true}
    >
      <DialogTitle onClose={handleClose}>Create Exchange</DialogTitle>
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
          <LocalizationProvider
            utils={DateFnsUtils}
            dateAdapter={AdapterDateFns}
          >
            <div className="dateTimeWp">
              <div>
                <p>Delivery Date Time</p>
                <DatePicker
                  margin="normal"
                  format="MM/dd/yyyy"
                  value={startSelectedDate}
                  onChange={handleStartDateChange}
                  renderInput={(props) => <TextField {...props} />}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
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
          <div className="selectWp">
            <FormControl variant="outlined" margin="dense">
              {mPay ? (
                <>
                  {mData ? (
                    <div className="payment">
                      <p>Payment Method</p>
                      <FormControl variant="outlined" margin="dense">
                        <Select
                          name="paymentMethod"
                          value={paymentMethod}
                          onChange={handleChange}
                          error={
                            errors["paymentMethod"].length > 0 ? true : false
                          }
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="10">Kriya</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  ) : (
                    <div className="payment">
                      <p>Payment Method</p>
                      <FormControl variant="outlined" margin="dense">
                        <Select
                          name="paymentMethod"
                          value={paymentMethod}
                          onChange={handleChange}
                          error={
                            errors["paymentMethod"].length > 0 ? true : false
                          }
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {credit > 0 && <MenuItem value="2">Credit</MenuItem>}
                          <MenuItem value="10">Kriya</MenuItem>
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
                    <Select
                      name="paymentMethod"
                      value={paymentMethod}
                      onChange={handleChange}
                      error={errors["paymentMethod"].length > 0 ? true : false}
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
              {/* {credit === 0 ? (
                <Select
                  value={paymentMethod}
                  onChange={handleChange}
                  name="paymentMethod"
                  error={errors["paymentMethod"].length > 0 ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="0">Stripe</MenuItem>
                </Select>
              ) : (
                <Select
                  value={paymentMethod}
                  onChange={handleChange}
                  name="paymentMethod"
                  error={errors["paymentMethod"].length > 0 ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="0">Stripe</MenuItem>
                  <MenuItem value="2">Credit</MenuItem>
                </Select>
              )} */}
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
                    {acountInfo &&
                      MARKET_PAY_LIST.map((data, index) => {
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
                                <ToolTipCard
                                  data={data.tooltip}
                                  handleClose={() => setShowToolTip(false)}
                                />
                              )}
                              {showToolTip1 && data.tooltip1 && (
                                <ToolTipCard
                                  data={data.tooltip1}
                                  handleClose={() => setShowToolTip1(false)}
                                />
                              )}
                            </div>
                            {data.text && (
                              <div className="remaining-balance">
                                {`${data.text} : ${currency ? currency : "£"} ${
                                  acountInfo.market_finance_balance - totalCost
                                }`}
                              </div>
                            )}
                          </>
                        );
                      })}
                  </RadioGroup>
                )}
              </>
            )}
          </div>

          <div>
            <p>Purchase Order</p>
            <TextField
              value={purchaseOrder}
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

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateExchange);
