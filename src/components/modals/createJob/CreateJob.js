import "date-fns";
import React, { useState, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Alert from "@material-ui/lab/Alert";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import AsychronousAddress from "../../commonComponent/asychronousAddress/AsychronousAddress";
import CircularProgress from "@material-ui/core/CircularProgress";
import ServiceService from "../../../services/service.service";
import JobService from "../../../services/job.service";
import PaymentService from "../../../services/payment.service";
import { colors } from "@material-ui/core";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import "./createJob.scss";
import { serviceList } from '../../utlils/constants';

const materialTheme = createTheme({
  palette: {
    primary: colors.blue,
  },
});
export default function CreateJob({ closeModal, setJobCreated , handleJobCreated }) {
  const divRef = useRef(null);
  const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [wasteType, setWastType] = useState([
    { waste_type_id: "", percentage: 0 },
  ]);
  const [serviceSelect, setServiceSelect] = useState({});
  const [subServiceSelect, setSubServiceSelect] = useState({});
  const [wasteList, setWasteList] = useState([]);
  const [newLoader, setNewLoader] = useState(false);
  const [credit, setCredit] = useState(0);
  const [errors, setError] = useState({
    customer: "",
    service: "",
    subService: "",
    serviceCost: "",
    haulageCost: "",
    discount: "",
    paymentMethod: "",
    // totalCost: '',
    purchaseOrder: "",
    addressData: "",
  });

  const [state, setState] = useState({
    customer: "",
    service: "",
    subService: "",
    serviceCost: "",
    haulageCost: "",
    discount: 0,
    paymentMethod: "",
    totalCost: 0,
    purchaseOrder: "",
    note: "",
    notice: null,
    isLoading: false,
    addressData: {},
    paymentMethodList: [],
    selectedPaymentMethod: "",
    addNewCard: false,
    addCustomer: false,
    selectedTime: "12:00 PM - 05:00 PM",
    customerUserId: null,
    newCardData: null,
    permitOption: "0",
    noOfDays: "",
    itemPerPage: 40,
    permitted_cost: "",
    permitted_reference: "",
    skip_loc: "0",
    time_slot_loading: false,
  });

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

  const {
    service,
    subService,
    serviceCost,
    haulageCost,
    discount,
    paymentMethod,
    totalCost,
    purchaseOrder,
    note,
    isLoading,
    notice,
    addressData,
    selectedPaymentMethod,
    paymentMethodList,
    addNewCard,
    selectedTime,
    customerUserId,
    newCardData,
    permitOption,
    noOfDays,
    itemPerPage,
    permitted_cost,
    permitted_reference,
    skip_loc,
    time_slot_loading,
  } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "discount":
        let total = +serviceCost + +permitted_cost + +haulageCost - +value;
        setState({ ...state, [name]: value, totalCost: total });
        break;
      case "haulageCost":
        let total2 = +serviceCost + +permitted_cost + +value - +discount;
        setState({ ...state, [name]: value, totalCost: total2 });
        break;
      case "permitted_cost":
        let total3 = +serviceCost + +haulageCost + +value - +discount;
        setState({ ...state, [name]: value, totalCost: total3 });
        break;
      case "serviceCost":
        let total1 = +value + +permitted_cost + +haulageCost - +discount;
        setState({ ...state, [name]: value, totalCost: total1 });
        break;
      case "service":
        setState({ ...state, [name]: value, subService: "" });
        setServiceSelect(services[value]);
        setSubServiceSelect({});
        break;
      case "subService":
        setState({ ...state, [name]: value });
        setSubServiceSelect(subServices[value]);
        break;
      case "paymentMethod":
        setState({ ...state, [name]: value });
        break;
      case "permit":
        if (value == 0) {
          let total4 = totalCost - permitted_cost;
          setState({ ...state, permitOption: value, totalCost: total4 });
        } else {
          let total5 = totalCost + +permitted_cost;
          setState({ ...state, permitOption: value, totalCost: total5 });
        }
        break;
      default:
        setState({ ...state, [name]: value });
    }

    checkingError(name, value);
  };

  const handleTime = (time) => {
    setState({
      ...state,
      selectedTime: time.time_slot,
    });
  };

  const handleClose = () => {
    closeModal();
  };

  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };

  const handleAddWastType = () => {
    setWastType([...wasteType, { waste_type_id: "", percentage: 0 }]);
  };

  //getservices
  useEffect(() => {
    //ServiceService.list().then((response) => {
      setServices(serviceList);
    //});
    const userCredit = getUserDataFromLocalStorage();
    setCredit(userCredit.credit_balance);
    setState({
      ...state,
      customerUserId: localStorage.getItem("user_id"),
    });
  }, []);

  //getsubservices
  useEffect(() => {
    if (Object.keys(serviceSelect).length !== 0 && addressData.postcode) {
      setNewLoader(true);
      let data = {
        post_code: addressData.postcode,
        service_type: serviceSelect.service_id,
        is_app: 0,
        channel: "Booking",
      };
      ServiceService.subServicelist(data).then((response) => {
        setSubServices(response.data.result);
        setNewLoader(false);
      });
    }
  }, [serviceSelect, addressData]);

  //dynamic update service cost, haulage cost and totalcost
  useEffect(() => {
    if (subServiceSelect) {
      if (permitOption == 1) {
        setState({
          ...state,
          serviceCost:
            subServiceSelect.price >= 0 ? subServiceSelect.price : "",
          haulageCost: subServiceSelect.haulage ? subServiceSelect.haulage : "",
          // totalCost: subServiceSelect.price + subServiceSelect.haulage - discount,
          totalCost:
            +permitted_cost +
            +subServiceSelect.price +
            +subServiceSelect.haulage -
            +discount,
        });
      } else {
        setState({
          ...state,
          serviceCost:
            subServiceSelect.price >= 0 ? subServiceSelect.price : "",
          haulageCost: subServiceSelect.haulage ? subServiceSelect.haulage : "",
          totalCost:
            subServiceSelect.price + subServiceSelect.haulage - discount,
        });
      }
    }
  }, [serviceSelect, subServiceSelect]);

  const handleWastType = (event, index) => {
    const { name, value } = event.target;
    switch (name) {
      case "waste_type_id":
        const data = [...wasteType];
        data[index].waste_type_id = value;
        setWastType(data);
        break;
      case "percentage":
        const data1 = [...wasteType];
        data1[index].percentage = value;
        setWastType(data1);
        break;
      default:
        break;
    }
  };

  const handleSelectedPostCode = (udprn) => {
    if (udprn) {
      fetch(
        `https://api.ideal-postcodes.co.uk/v1/addresses/${udprn}/?api_key=ak_jc635mjv12swIsWCiEJWOAiDG0W84`
      )
        .then((response) => response.json())
        .then((response) => {
          setState({ ...state, addressData: response.result });
          checkingError("addressData", response.result);
        });
    } else {
      setState({ ...state, addressData: {} });
      checkingError("addressData", {});
    }
  };

  const checkingError = (name, value) => {
    switch (name) {
      case "addressData":
        errors[name] =
          Object.keys(value).length === 0 ? "Must have selected address" : "";
        break;
      // case "customer":
      case "service":
      case "subService":
      case "paymentMethod":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      // case "totalCost":
      // case "purchaseOrder":
      //   errors[name] = value.length === 0 ? "Required" : "";
      //   break;
      // case "serviceCost":
      //   console.log("serviceCost: ", value === null)
      //   errors[name] = value.length === 0 ? "Required" : "";
      default:
        break;
    }
    setError({ ...errors });
  };
  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const confirmJob = (e) => {
    e.preventDefault();
    if (
      Object.keys(addressData).length === 0 ||
      paymentMethod === "" ||
      // purchaseOrder === "" ||
      service === "" ||
      subService === ""
    ) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }

    setState({ ...state, isLoading: true });

    let currentDayOfMonth = startSelectedDate.getDate();
    let currentMonth = startSelectedDate.getMonth();
    

    if(currentDayOfMonth < 10) {
      currentDayOfMonth = "0" + currentDayOfMonth;
    }
    let newCurrentMonth = currentMonth + 1;

    if (newCurrentMonth < 10) {
      newCurrentMonth = "0" + currentMonth;
    }
   
    const time =
    selectedTime &&
    selectedTime.split("-");
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
      acm_id: "",
      address_data: addressData,
      card_id: selectedPaymentMethod,
      comments: note,
      coupon_detail: {
        coupon_id: 0,
        discount: discount,
        discount_rate: 330.0,
        is_coupon: 0,
        service_rate: serviceCost,
      },
      customer_user_id: localStorage.getItem("user_id"),
      jobs: 1,
      payment_type: paymentMethod,
      purchase_order: purchaseOrder,
      is_permit: permitOption,
      permitted_weeks: noOfDays,
      permitted_cost: permitted_cost,
      permitted_reference: permitted_reference,
      skip_loc_type: skip_loc,
      services: [
        {
          is_permit: 0,
          is_schedule: 0,
          job_address: `${addressData.line_1} ${addressData.line_2} ${addressData.district} ${addressData.county} ${addressData.postcode}`,
          job_area: "",
          job_dates: [Date.parse(startSelectedDate)],
          job_end_time: job_end_time,
          job_id: "",
          job_start_time: job_start_time,
          permit_cost: 0,
          service_cost: subServiceSelect.price,
          service_id: subServiceSelect.sub_service_id,
          service_name: subServiceSelect.service_name,
          service_type: 2,
          skip_loc_type: "1",
          skip_req_days: 0,
          skrapRev: "0",
          status: 0,
          supplier: "0",
          supplier_cost: "0",
        },
      ],
      wastes: wasteType,
      what3word: "",
      show_on_main_portal: 1,
    };
    JobService.createOrder(data)
      .then((response) => {
        if(Object.keys(response.data.result).length === 0){
          setState({
            ...state,
            isLoading: false,
            notice: {
              type: "error",
              text: response.data.description,
            },
          });
        }else{
          handleJobCreated()
          setTimeout(() => {
            handleClose();
          }, 2000);
          setState({
            ...state,
            isLoading: false,
            notice: {
              type: "success",
              text: "Successfuly Created Job!",
            },
          });
          scrollToBottom();
        }
      })
      .catch((err) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "error",
            text: "Failed, Something is wrong",
          },
        });
      });
  };

  //getcardlist
  useEffect(() => {
    PaymentService.list({ user_id: localStorage.getItem("user_id") }).then(
      (response) => {
        setState({ ...state, paymentMethodList: response.data.result });
      }
    );
  }, [paymentMethod, addNewCard]);

  useEffect(() => {
    let t_date = Date.parse(new Date());
    let d_date = Date.parse(startSelectedDate);
    console.log(t_date, d_date);
    setState({ ...state, time_slot_loading: true });
    PaymentService.getData({ t_date, d_date })
      .then((res) => {
        console.log("res", res.data.result.time_slots);
        setTimeSlots(res.data.result.time_slots);
        setState({ ...state, time_slot_loading: false });
      })
      .catch((err) => {
        console.log("res", err);
        setState({ ...state, time_slot_loading: false });
      });
  }, [startSelectedDate]);

  //get wasType
  useEffect(() => {
    JobService.getWasteTypes().then((response) => {
      setWasteList(response.data.result);
    });
  }, []);

  const handleSaveNewCard = (cardData) => {
    setState({ ...state, newCardData: cardData });
  };

  const handleShowNewCard = () => {
    setState({ ...state, addNewCard: true });
  };
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

  const removeRow = (index) => {
    wasteType.splice(index, 1);
    setState({ ...state, wasteType });
  };
  console.log("credit", credit);
  return (
    <Dialog
      open={true}
      onClose={handleClose}
      className="creatJobModal"
      ref={divRef}
    >
      <DialogTitle onClose={handleClose}> Create Job </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <div className="addressSec">
            <p>Site Address</p>
            <AsychronousAddress
              error={errors.addressData}
              handleSelectedPostCode={(value) => handleSelectedPostCode(value)}
            />
          </div>
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
          </MuiPickersUtilsProvider>

          <div className="serviceWp">
            <div className="service">
              <p>Service</p>
              <FormControl variant="outlined" margin="dense">
                <InputLabel>service</InputLabel>
                <Select
                  value={service}
                  onChange={handleChange}
                  label="service"
                  name="service"
                  error={errors["service"].length > 0 ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {services.map((data, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {data.service_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="service">
              <p>Sub Service</p>
              <FormControl
                variant="outlined"
                margin="dense"
                disabled={newLoader ? newLoader : false}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  sub-service
                </InputLabel>
                <Select
                  value={subService}
                  onChange={handleChange}
                  label="Sub Service"
                  name="subService"
                  error={errors["subService"].length > 0 ? true : false}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subServices.map((data, index) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {data.service_name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <span className="newLoader">
                  {newLoader && <CircularProgress />}
                </span>
              </FormControl>
            </div>
          </div>

          {service === 0 && (
            <div className="skipType">
              <p>Skip Type</p>
              <RadioGroup
                name="skip_loc"
                value={skip_loc}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="3"
                  control={<Radio color="primary" />}
                  label="On Road"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="Off Road"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="Wait & Load"
                />
              </RadioGroup>
            </div>
          )}

          <div className="wasteTypeWp">
            <div className="wasteType">
              <p className="wtype">Waste Type</p>
              {/* <p className="load">% of load</p> */}
            </div>
            {wasteType.map((data, index) => {
              return (
                <div className="wasteType1" key={index}>
                  <FormControl
                    variant="outlined"
                    margin="dense"
                    className="wasteTypeOption"
                  >
                    <InputLabel>waste type</InputLabel>

                    <Select
                      value={data.waste_type_id}
                      onChange={(e) => handleWastType(e, index)}
                      label="waste type"
                      name="waste_type_id"
                      // error={errors["service"].length > 0 ? true : false}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {wasteList.slice(0, itemPerPage).map((data, index) => {
                        return (
                          <MenuItem value={data.id} key={index}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  {wasteType.length > 1 && (
                    <p
                      className="button-text cursor-pointer"
                      onClick={() => {
                        removeRow(index);
                      }}
                    >
                      - remove
                    </p>
                  )}
                  {/* <FormControl
                    variant="outlined"
                    margin="dense"
                    className="wasteLoad"
                  >
                    <OutlinedInput
                      type="number"
                      name="percentage"
                      value={data.percentage}
                      onChange={(e) => handleWastType(e, index)}
                      endAdornment={
                        <InputAdornment position="end">%</InputAdornment>
                      }
                    />
                  </FormControl> */}
                </div>
              );
            })}
            <Link href="#" onClick={handleAddWastType}>
              + Add another Waste Type
            </Link>
          </div>

          <div className="serviceCostWp">
            <div>
              <p>Service Cost</p>
              <TextField
                value={serviceCost}
                onChange={handleChange}
                placeholder="£"
                name="serviceCost"
                type="number"
                variant="outlined"
                disabled={(serviceCost !== null) | (serviceCost !== undefined)}
                margin="dense"
                // error= {errors['serviceCost'].length > 0 ? true : false}
              />
            </div>
            <div>
              <p>Haulage Cost</p>
              <TextField
                value={haulageCost}
                onChange={handleChange}
                placeholder="£"
                name="haulageCost"
                type="number"
                variant="outlined"
                margin="dense"
                disabled={(haulageCost !== null) | (haulageCost !== undefined)}
              />
            </div>
            <div>
              <p>Discount</p>
              <TextField
                value={discount}
                onChange={handleChange}
                name="discount"
                placeholder="£"
                type="number"
                variant="outlined"
                margin="dense"
                disabled={(discount !== null) | (discount !== undefined)}
              />
            </div>
          </div>

          <div className="paymentWp">
            <div className="payment">
              <p>Payment Method</p>
              <FormControl variant="outlined" margin="dense">
                <InputLabel id="demo-simple-select-outlined-label">
                  Payment method
                </InputLabel>
                <Select
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={handleChange}
                  label="Payment method"
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

            <div className="discount">
              <p>Total Cost</p>
              <TextField
                placeholder="£"
                name="totalCost"
                value={totalCost}
                onChange={handleChange}
                type="number"
                variant="outlined"
                margin="dense"
                disabled={(totalCost !== null) | (totalCost !== undefined)}
                // error= {errors['totalCost'].length > 0 ? true : false}
              />
            </div>
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
                  user_id={localStorage.getItem("user_id")}
                  handleSaveNewCard={(value) => handleSaveNewCard(value)}
                  setOpen={() => setState({ ...state, addNewCard: false })}
                />
              )}
              {addNewCard && (
                <CardPayment
                  user_id={localStorage.getItem("user_id")}
                  handleSaveNewCard={(value) => handleSaveNewCard(value)}
                  setOpen={() => setState({ ...state, addNewCard: false })}
                />
              )}
            </>
          )}
          <div>
            <p>Purchase Order</p>
            <TextField
              value={purchaseOrder}
              // error={errors["purchaseOrder"].length > 0 ? true : false}
              name="purchaseOrder"
              onChange={handleChange}
              fullWidth={true}
              variant="outlined"
              placeholder="SN14662"
              size="small"
            />
          </div>
          <div className="note">
            <p>Notes</p>
            <TextareaAutosize
              value={note}
              name="note"
              onChange={handleChange}
              rowsMin={4}
              placeholder="Anything else the driver might need to know to complete the job"
            />
          </div>

          <Button
            className="confirmJob"
            onClick={(e) => confirmJob(e)}
            variant="contained"
            color="primary"
          >
            Confirm Job
            {isLoading && <CircularProgress />}
          </Button>

          {notice && (
            <Alert ref={divRef} severity={notice.type}>
              {notice.text}
            </Alert>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
