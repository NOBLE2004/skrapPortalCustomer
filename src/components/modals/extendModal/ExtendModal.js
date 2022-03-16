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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import CircularProgress from "@material-ui/core/CircularProgress";
import JobService from "../../../services/job.service";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import "../createJob/createJob.scss";
import { TextField } from "@material-ui/core";
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

  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    portableweeks: service_name[service_name.indexOf("(") + 1],
    isWeekError: false,
    paymentMethodList: [],
    selectedPaymentMethod: "",
    addNewCard: false,
    newCardData: null,
  });

  const {
    isLoading,
    notice,
    portableweeks,
    isWeekError,
    paymentMethodList,
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
        setState({ ...state, paymentMethodList: response.data.result });
      }
    );
  }, [paymentMethod, addNewCard]);

  useEffect(() => {
    const userCredit = getUserDataFromLocalStorage();
    setRoleId(userCredit.role_id);
    setCredit(userCredit.credit_balance);
    setUserId(userCredit.user_id);

    let data = {
      post_code: postcode,
      service_type: parent_id,
      is_app: 0,
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
        if(res.data.code === 0){
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
        }else if(res.data.code === 11){
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
        Extends Job
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
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
          {roleId != 12 && (
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
