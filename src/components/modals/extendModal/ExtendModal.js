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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import CircularProgress from "@mui/material/CircularProgress";
import JobService from "../../../services/job.service";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import "../createJob/createJob.scss";
import { TextField } from "@mui/material";
import PaymentService from "../../../services/payment.service";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import ServiceService from "../../../services/service.service";
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

const ExtendModal = ({ row, closeModal, updateJobs }) => {
  const {
    job_id,
    service_name,
    postcode,
    parent_id,
    service_id,
    extra_service_name,
  } = row;
  const [roleId, setRoleId] = useState(0);
  const [credit, setCredit] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaymentError, setPaymentError] = useState(false);
  const [price, setPrice] = useState(0);
  const [userId, setUserId] = useState("");
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  const [showPayment, setShowPayment] = useState(true);

  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    portableweeks: service_name[service_name.indexOf("(") + 1],
    isWeekError: false,
    selectedPaymentMethod: "",
    addNewCard: false,
    newCardData: null,
  });

  const {
    isLoading,
    notice,
    portableweeks,
    isWeekError,
    addNewCard,
    selectedPaymentMethod,
    newCardData,
  } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "selectedMarketPay":
        setState({ ...state, isCompanyModal: true, [name]: value });
        break;
      case "portableweeks":
        if (value < 2) {
          setState({
            ...state,
            isWeekError: true,
            [name]: value,
          });
        } else {
          setState({
            ...state,
            [name]: value,
            isWeekError: false,
          });
        }
        break;
      default:
        setState({ ...state, [name]: value });
    }
  };

  const handlePayment = (event) => {
    const pay = event.target.value;
    setPaymentMethod(pay);
    setPaymentError(false);
  };

  useEffect(() => {
    PaymentService.list({ user_id: localStorage.getItem("user_id") }).then(
      (response) => {
        // setState({ ...state, paymentMethodList: response.data.result });
        setPaymentMethodList(response.data.result);
      }
    );
  }, [paymentMethod, addNewCard]);

  useEffect(() => {
    const userCredit = getUserDataFromLocalStorage();
    if(userCredit?.account_type == 3){
      setShowPayment(false);
      setPaymentMethod('2');
    }
    setRoleId(userCredit.role_id);
    setCredit(userCredit.credit_balance);
    setUserId(userCredit.user_id);

    let data = {
      post_code: postcode,
      service_type: parent_id,
      is_app: 0,
      user_id: localStorage.getItem('user_id')
    };
    ServiceService.subServicelist(data)
      .then((response) => {
        if (Object.keys(response.data.result).length === 0) {
          setPrice(0);
        } else {
          setPrice(response.data.result[0].price);
        }
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  }, []);

  const handleSaveNewCard = (cardData) => {
    setState({ ...state, newCardData: cardData });
  };

  const handleShowNewCard = () => {
    setState({ ...state, addNewCard: true });
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
              text: "Successfully created extension!",
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

  const handleCreate = (e) => {
    e.preventDefault();
    if (portableweeks < 2) {
      setState({ ...state, isWeekError: true });
      return;
    }
    if (!paymentMethod) {
      setPaymentError(true);
      return;
    }
    const data = {
      card_id: paymentMethod === "0" ? selectedPaymentMethod : "",
      extention_amount: +portableweeks * price,
      is_notify: 0,
      job_id: job_id,
      payment_type: +paymentMethod,
      quantity: +portableweeks,
      service_id: service_id,
      service_name: `Portable Toilet(${portableweeks} ${extra_service_name})`,
      user_id: userId,
    };

    setState({ ...state, isLoading: true });
    JobService.addExtention(data)
      .then((res) => {
        if (res.data.code === 11) {
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
            ...state,
            isLoading: false,
            notice: {
              type: "success",
              text: res.data.description,
            },
          });
          setTimeout(() => {
            closeModal();
            updateJobs();
          }, 2000);
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
        Extend Job
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <div>
            <p>How many weeks you need</p>
            <TextField
              value={portableweeks}
              onChange={handleChange}
              placeholder="Enter number of weeks"
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
          {(roleId != 12 && showPayment) && (
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
                    onChange={handlePayment}
                    label="Payment method"
                    error={isPaymentError ? true : false}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {credit > 0 && <MenuItem value="2">Credit</MenuItem>}
                    <MenuItem value="0">Stripe</MenuItem>
                  </Select>
                </FormControl>
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
};

export default ExtendModal;
