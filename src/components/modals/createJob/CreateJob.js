import "date-fns";
import React, { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { withStyles } from "@mui/styles";
import DialogContent from "@mui/material/DialogContent";
import DateFnsUtils from "@date-io/date-fns";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Alert from "@mui/lab/Alert";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "@mui/icons-material/Close";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  LocalizationProvider,
  DatePicker,
} from "@mui/lab";
import AsychronousAddress from "../../commonComponent/asychronousAddress/AsychronousAddress";
import CircularProgress from "@mui/material/CircularProgress";
import ServiceService from "../../../services/service.service";
import JobService from "../../../services/job.service";
import PaymentService from "../../../services/payment.service";
import { colors } from "@mui/material";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import "./createJob.scss";
import { serviceList } from "../../utlils/constants";
import sitesService from "../../../services/sites.service";
import { MARKET_PAY_LIST, MARKET_PAY_LIST1 } from "../../../environment";
import CompanyDetail from "../companyDetail/CompanyDetail";
import { marketInfoIcon } from "../../../assets/images";
import ToolTipCard from "../../commonComponent/toolTipCard/ToolTipCard";

const materialTheme = createTheme({
  palette: {
    primary: colors.blue,
  },
});

export default function CreateJob({
  closeModal,
  setJobCreated,
  handleJobCreated,
  sites,
  reload,
  siteId,
  managerData,
  siteAddress,
  postCode,
}) {
  const history = useHistory();
  const divRef = useRef(null);
  const [mPay, setMPay] = useState(false);
  const [startSelectedDate, setStartSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [services, setServices] = useState([]);
  const [mData, setmData] = useState("");
  const [comp_number, setComp_number] = useState("");
  const [po, setPo] = useState("");
  const [subServices, setSubServices] = useState([]);
  const [wasteType, setWastType] = useState([
    { waste_type_id: "", percentage: 0 },
  ]);
  const [siteData, setSiteData] = useState({});
  const [acountInfo, setAccountInfo] = useState({});
  const [serviceSelect, setServiceSelect] = useState({});
  const [newAddressId, setNewAddressId] = useState("");
  const [subServiceSelect, setSubServiceSelect] = useState({});
  const [wasteList, setWasteList] = useState([]);
  const [newLoader, setNewLoader] = useState(false);
  const [showToolTip, setShowToolTip] = useState(false);
  const [showToolTip1, setShowToolTip1] = useState(false);
  const [isCardAdded, setIsCardAdded] = useState(false);
  const [paymentLoading, setPaymentloader] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const [credit, setCredit] = useState(0);
  const [roleId, setRoleId] = useState(0);
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [addNewCard, setAddNewCard] = useState(false);
  const user = localStorage.getItem('c_d_storage');
  const [errors, setError] = useState({
    customer: "",
    service: "",
    subService: "",
    serviceCost: "",
    haulageCost: "",
    // totalCost: '',
    purchaseOrder: "",
    addressData: "",
    quantity: "",
    week: "",
    timeSlots: "",
  });

  const [state, setState] = useState({
    customer: "",
    service: "",
    subService: "",
    serviceCost: "",
    haulageCost: 0,
    totalCost: 0,
    purchaseOrder: "",
    note: "",
    notice: null,
    isLoading: false,
    addressData: {},
    paymentMethodList: [],
    selectedPaymentMethod: "",
    addCustomer: false,
    selectedTime: "12:00 PM - 05:00 PM",
    customerUserId: null,
    permitOption: "0",
    noOfDays: "",
    itemPerPage: 40,
    permitted_cost: "",
    permitted_reference: "",
    skip_loc: "0",
    time_slot_loading: false,
    quantity: 5,
    portableweeks: 2,
    isQuantityError: false,
    isWeekError: false,
    selectedMarketPay: "",
    isCompanyModal: false,
    job_documents: []
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
    totalCost,
    purchaseOrder,
    note,
    isLoading,
    notice,
    addressData,
    selectedPaymentMethod,
    selectedTime,
    customerUserId,
    permitOption,
    noOfDays,
    itemPerPage,
    permitted_cost,
    permitted_reference,
    skip_loc,
    time_slot_loading,
    quantity,
    portableweeks,
    isQuantityError,
    isWeekError,
    selectedMarketPay,
    isCompanyModal,
  } = state;

  const handleFileUpload = (event) => {
    state.job_documents = Array.from(event.target.files);   
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "haulageCost":
        let total2 = +serviceCost + +permitted_cost + +value;
        setState({ ...state, [name]: value, totalCost: total2 });
        break;
      case "permitted_cost":
        let total3 = +serviceCost + +haulageCost + +value;
        setState({ ...state, [name]: value, totalCost: total3 });
        break;
      case "serviceCost":
        let total1 = +value + +permitted_cost + +haulageCost;
        setState({ ...state, [name]: value, totalCost: total1 });
        break;
      case "service":
        setState({ ...state, [name]: value, subService: "", totalCost: "" });
        setServiceSelect(services[value]);
        setSubServiceSelect({});
        break;
      case "subService":
        if (value === "") {
          setState({ ...state, [name]: value });
          setSubServiceSelect({});
        } else {
          setState({ ...state, [name]: value });
          setSubServiceSelect(subServices[value]);
        }

        break;

      case "selectedMarketPay":
        setState({ ...state, isCompanyModal: true, [name]: value });
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
      case "quantity":
        if (value < 5) {
          setState({
            ...state,
            isQuantityError: true,
            [name]: value,
            totalCost: serviceCost * value,
          });
        } else {
          setState({
            ...state,
            [name]: value,
            isQuantityError: false,
            totalCost: serviceCost * value,
          });
        }
        break;

      case "portableweeks":
        if (value < 2) {
          setState({
            ...state,
            isWeekError: true,
            [name]: value,
            totalCost: serviceCost * value + haulageCost,
          });
        } else {
          setState({
            ...state,
            [name]: value,
            isWeekError: false,
            totalCost: serviceCost * value + haulageCost,
          });
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
  const handleStartDateChange = (date) => {
    setStartSelectedDate(date);
  };

  const handleAddWastType = () => {
    setWastType([...wasteType, { waste_type_id: "", percentage: 0 }]);
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

  //getservices
  useEffect(() => {
    if (managerData) {
      const { data, purchase_orders } = managerData;
      if (purchase_orders.length > 0) {
        const lastpo = purchase_orders[purchase_orders.length - 1];
        setPo(lastpo.purchase_order);
      } else {
        setPo("");
      }
    }
    //ServiceService.list().then((response) => {
    setServices(serviceList);
    //});
    const userCredit = getUserDataFromLocalStorage();
    setRoleId(userCredit.role_id);
    setCredit(userCredit.credit_balance);
    setMPay(userCredit.market_pay);
    setmData(userCredit.market_finance_balance);
    setComp_number(userCredit.company_reg_number);
    setState({
      ...state,
      customerUserId: localStorage.getItem("user_id"),
    });
  }, []);

  //getsubservices
  useEffect(() => {
    if (siteAddress) {
      if (Object.keys(serviceSelect).length !== 0) {
        setNewLoader(true);
        let data = {
          post_code: postCode,
          service_type: serviceSelect.service_id,
          is_app: 0,
          user_id: localStorage.getItem('user_id')
        };
        ServiceService.subServicelist(data).then((response) => {
          if (Object.keys(response.data.result).length === 0) {
            setSubServices([]);
          } else {
            setSubServices(response.data.result);
          }
          setNewLoader(false);
        });
      }
    } else {
      if (Object.keys(serviceSelect).length !== 0 && addressData.postcode) {
        setNewLoader(true);
        let data = {
          post_code: addressData.postcode,
          service_type: serviceSelect.service_id,
          is_app: 0,
          user_id: localStorage.getItem('user_id')
        };
        ServiceService.subServicelist(data).then((response) => {
          if (Object.keys(response.data.result).length === 0) {
            setSubServices([]);
          } else {
            setSubServices(response.data.result);
          }

          setNewLoader(false);
        });
      }
    }
  }, [serviceSelect, addressData]);

  //dynamic update service cost, haulage cost and totalcost
  useEffect(() => {
    if (Object.keys(subServiceSelect).length !== 0) {
      if (permitOption == 1) {
        setState({
          ...state,
          serviceCost: subServiceSelect ? subServiceSelect.price : "",
          haulageCost: subServiceSelect ? subServiceSelect.haulage : 0,
          totalCost:
            +permitted_cost +
            +subServiceSelect.price +
            +subServiceSelect.haulage,
        });
      } else {
        setState({
          ...state,
          serviceCost: subServiceSelect ? subServiceSelect.price : "",
          haulageCost: subServiceSelect ? +subServiceSelect.haulage : 0,
          totalCost: subServiceSelect.price,
        });
      }
    } else {
      setState({
        ...state,
        serviceCost: "",
        haulageCost: 0,
        totalCost: 0,
      });
    }

    if (serviceSelect.service_id === 80) {
      setState({
        ...state,
        serviceCost: subServiceSelect ? subServiceSelect.price : "",
        haulageCost: subServiceSelect ? subServiceSelect.haulage : 0,
        totalCost: quantity * subServiceSelect.price + subServiceSelect.haulage,
      });
    }

    if (serviceSelect.service_id === 43) {
      setState({
        ...state,
        serviceCost: subServiceSelect ? subServiceSelect.price : "",
        haulageCost: subServiceSelect ? subServiceSelect.haulage : 0,
        totalCost:
          portableweeks * subServiceSelect.price + subServiceSelect.haulage,
      });
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
          if (response.result) {
            sitesService
              .siteByUdprn({ Site_Udprn: response.result.udprn })
              .then((res) => {
                if (Object.keys(res.data.result).length === 0) {
                  setNewAddressId("");
                } else {
                  setNewAddressId(res.data?.result?.address_id);
                }
              })
              .catch((err) => {
                console.log("err");
              });
          }
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
      case "service":
      case "subService":
        errors[name] = value.length === 0 ? "Required" : "";
        break;

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
    if (siteId) {
      if (service === "" || subService === "" || timeSlots.length === 0) {
        Object.keys(errors).forEach((error, index) => {
          checkingError(error, state[error]);
        });
        return;
      }
    } else {
      if (
        Object.keys(addressData).length === 0 ||
        service === "" ||
        subService === "" ||
        timeSlots.length === 0
      ) {
        Object.keys(errors).forEach((error, index) => {
          checkingError(error, state[error]);
        });
        return;
      }
    }

    if (service === 3) {
      if (quantity < 5) {
        setState({ ...state, isQuantityError: true });
        return;
      }
    }

    if (service === 4) {
      if (portableweeks < 2) {
        setState({ ...state, isWeekError: true });
        return;
      }
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
    if (siteId) {
      siteData.site_id = siteId;
      delete siteData.address_id;
      delete siteData.user_id;
    } else {
      if (newAddressId) {
        addressData.site_id = newAddressId;
      }
    }

    let newdata = {
      acm_id: "",
      address_data: siteId ? siteData : addressData,
      card_id:
        roleId == 12 ? "" : paymentMethod === "0" ? selectedPaymentMethod : "",
      comments: note,
      market_pay_type: paymentMethod === "10" ? selectedMarketPay : "",
      coupon_detail: {
        coupon_id: 0,
        discount_rate: 330.0,
        is_coupon: 0,
        service_rate: serviceCost,
      },
      customer_user_id: localStorage.getItem("user_id"),
      jobs: 1,
      payment_type: roleId == 12 ? "0" : paymentMethod,
      purchase_order: siteId && po ? po : purchaseOrder,
      is_permit: permitOption,
      permitted_weeks: noOfDays,
      permitted_cost: permitted_cost,
      permitted_reference: permitted_reference,
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
          haulage: subServiceSelect.haulage,
          service_id: subServiceSelect.sub_service_id,
          service_name:
            service === 3
              ? `${quantity}M³${subServiceSelect.service_name}`
              : service === 4
              ? `Portable Toilet(${portableweeks} ${subServiceSelect.service_name})`
              : subServiceSelect.service_name,
          service_type: serviceSelect.service_id,
          skip_loc_type: service === 0 ? skip_loc : "0",
          skip_req_days: 0,
          skrapRev: "0",
          status: 0,
          supplier: "0",
          supplier_cost: "0",
        },
      ],
      wastes:
        service === 0 ? wasteType : [{ waste_type_id: "", percentage: 0 }],
      what3word: "",
      show_on_main_portal: 1,
    };
    if (service === 3 || service === 4) {
      newdata.services[0].quantity = service === 3 ? quantity : portableweeks;
    }

    JobService.createOrder(newdata)
      .then((response) => {
        if (response.data.code === 0) {
          if(Object.keys(response.data.result).length != 0 && response.data.result.jobs.length > 0 && response.data.result.jobs[0].job_id != undefined){
            let fd = new FormData()
            let files = state.job_documents;
            files.forEach((image_file) => {
              fd.append('files[]', image_file);
            });
            fd.append("job_id", response.data.result.jobs[0].job_id);

            JobService.updateOrderFiles(fd)
                .then((response) => {
                    scrollToBottom();
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
                    if (sites) {
                      reload();
                    } else {
                      handleJobCreated();
                    }
                  }, 2000);
                })
                .catch((err) => {
                  scrollToBottom();
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
                    if (sites) {
                      reload();
                    } else {
                      handleJobCreated();
                    }
                  }, 2000);
                });
          }

          // setState({
          //   ...state,
          //   isLoading: false,
          //   notice: {
          //     type: "success",
          //     text: "Successfully Created Job!",
          //   },
          // });
          // scrollToBottom();
          // setTimeout(() => {
          //   closeModal();
          //   if (sites) {
          //     reload();
          //   } else {
          //     handleJobCreated();
          //   }
          // }, 2000);
        } else if (response.data.code === 11) {
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
        } else {
          setState({
            ...state,
            isLoading: false,
            notice: {
              type: "error",
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
            text: err.message,
          },
        });
      });
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
              text: "Successfully Created Job!",
            },
          });
          scrollToBottom();
          setTimeout(() => {
            closeModal();
            if (sites) {
              reload();
            } else {
              handleJobCreated();
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
  //getcardlist
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

  //get wasType
  useEffect(() => {
    JobService.getWasteTypes().then((response) => {
      setWasteList(response.data.result);
    });
    if (siteId) {
      sitesService
        .selectCurrentSite({ id: siteId })
        .then((res) => {
          setState({ ...state, addressData: res.data.Address_data });
          setSiteData(res.data.Address_data);
        })
        .catch((err) => {
          console.log("err", err.message);
        });
    }
  }, []);

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentError(false);
  };
  const handleSaveNewCard = () => {
    setIsCardAdded(!isCardAdded);
  };

  const handleShowNewCard = () => {
    setAddNewCard(!addNewCard);
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

  return (
    <Dialog
      open={true}
      onClose={closeModal}
      className="creatJobModal"
      ref={divRef}
    >
      <DialogTitle onClose={closeModal}> Create Job </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <div className="addressSec">
            <p>Site Address</p>
            <AsychronousAddress
              error={errors.addressData}
              handleSelectedPostCode={(value) => handleSelectedPostCode(value)}
              address={siteAddress ? siteAddress : ""}
              sites={sites ? sites : false}
            />
          </div>

          <LocalizationProvider utils={DateFnsUtils} dateAdapter={AdapterDateFns}>
            <div className="dateTimeWp">
              <div className="datewp">
                <p>Delivery Date Time</p>
                <ThemeProvider theme={materialTheme}>
                  <DatePicker
                    margin="normal"
                    format="MM/dd/yyyy"
                    disablePast
                    renderInput={(props) => <TextField {...props} />}
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
          </LocalizationProvider>

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
                  <MenuItem value="0">
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
                  {subServices &&
                    subServices.map((data, index) => {
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
            <>
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
              {/* <div className="wasteTypeWp">
                <div className="wasteType">
                  <p className="wtype">Waste Type</p>
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
                          {wasteList
                            .slice(0, itemPerPage)
                            .map((data, index) => {
                              return (
                                <MenuItem value={data.id} key={index}>
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                        </Select>
                      </FormControl>
                      <FormControl
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
                      </FormControl>
                      {wasteType.length > 1 && (
                        <p
                          className="button-text cursor-pointer remove-btn"
                          onClick={() => {
                            removeRow(index);
                          }}
                        >
                          - remove
                        </p>
                      )}
                    </div>
                  );
                })}
                <Link href="#" onClick={handleAddWastType}>
                  + Add another Waste Type
                </Link>
              </div>  */}
            </>
          )}

          {service === 3 && (
            <div>
              <p>
                How many M<sup>3</sup> you need
              </p>
              <TextField
                value={quantity}
                onChange={handleChange}
                placeholder="£"
                name="quantity"
                InputProps={{ inputProps: { min: 5 } }}
                type="number"
                variant="outlined"
                margin="dense"
                fullWidth
                error={isQuantityError ? true : false}
              />
              {isQuantityError && (
                <div className="m3-error">must be greater than 5</div>
              )}
            </div>
          )}

          {service === 4 && (
            <div>
              <p>How many weeks you need</p>
              <TextField
                value={portableweeks}
                onChange={handleChange}
                placeholder="£"
                name="portableweeks"
                InputProps={{ inputProps: { min: 2 } }}
                type="number"
                variant="outlined"
                margin="dense"
                fullWidth
                error={isWeekError ? true : false}
              />
              {isWeekError && (
                <div className="m3-error">must be greater than 2</div>
              )}
            </div>
          )}

          <div className="serviceCostWp">
            <div className="service-cost-width">
              <p>Service Cost</p>
              <TextField
                value={`${(serviceCost/1.2)?.toFixed(2)} + Vat`}
                onChange={handleChange}
                placeholder="£"
                name="serviceCost"
                type="text"
                variant="outlined"
                disabled={(serviceCost !== null) | (serviceCost !== undefined)}
                margin="dense"
                fullwidth
                // error= {errors['serviceCost'].length > 0 ? true : false}
              />
            </div>
            {subServiceSelect.haulage >= 0 ? (
              <div className="haulage-cost-width">
                <p>Haulage Cost</p>
                <TextField
                  value={haulageCost}
                  onChange={handleChange}
                  placeholder="£"
                  name="haulageCost"
                  type="number"
                  variant="outlined"
                  margin="dense"
                  disabled={
                    (haulageCost !== null) | (haulageCost !== undefined)
                  }
                  fullWidth
                />
              </div>
            ) : (
              ""
            )}
          </div>

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
                          {credit > 0 && <MenuItem value="2">Credit</MenuItem>}
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
              <div className="discount">
                <p>Total Cost</p>
                <TextField
                  placeholder="£"
                  name="totalCost"
                  value={`${(totalCost / 1.2)?.toFixed(2)} + Vat`}
                  onChange={handleChange}
                  type="text"
                  variant="outlined"
                  margin="dense"
                  disabled={(totalCost !== null) | (totalCost !== undefined)}
                  // error= {errors['totalCost'].length > 0 ? true : false}
                />
              </div>
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
                    {acountInfo
                      && MARKET_PAY_LIST.map((data, index) => {
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
                                  {`${data.text} : £ ${
                                    acountInfo.market_finance_balance -
                                    totalCost
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
          {}
          <div>
            <p>Purchase Order</p>
            <TextField
              value={siteId && po ? po : purchaseOrder}
              // error={errors["purchaseOrder"].length > 0 ? true : false}
              name="purchaseOrder"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              placeholder="SN14662"
              size="small"
              disabled={siteId && po ? true : false}
            />
          </div>
          <div>
            <p>Attach documents </p>
              <input name="job_documents" multiple type="file" onChange={handleFileUpload} />
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
        {isCompanyModal && comp_number === "" && (
          <CompanyDetail
            closeModal={() => setState({ ...state, isCompanyModal: false })}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
