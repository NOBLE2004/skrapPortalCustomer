import "date-fns";
import React, { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { withStyles } from "@mui/styles";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/lab/Alert";
import CloseIcon from "@mui/icons-material/Close";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import { TextField } from "@mui/material";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import jobService from "../../../services/job.service";
import "./companyDetail.scss";

export default function CompanyDetail({ closeModal, reload }) {
  const divRef = useRef(null);
  const [userId , setUserId] = useState('')
  const [errors, setError] = useState({
    name: "",
    address: "",
    registration_number: "",
    email: "",
  });

  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    name: "",
    address: "",
    registration_number: "",
    email: "",
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

  useEffect(()=>{
    const user = getUserDataFromLocalStorage();
    setUserId(user.user_id)
  },[])

  const { isLoading, notice, name, address, registration_number, email } =
    state;

  const checkingError = (name, value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    switch (name) {
      case "email":
        errors[name] = reg.test(value) === false ? "Required" : "";
        break;
      case "name":
      case "registration_number":
      case "address":
        errors[name] = Object.keys(value).length === 0 ? "Required" : "";
        break;
      default:
        break;
    }
    setError({ ...errors });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
    checkingError(name, value);
  };

  const confirmJob = (e) => {
    e.preventDefault();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      name === "" ||
      (email === "") | (reg.test(email) === false) ||
      registration_number === "" ||
      address === ""
    ) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }
    const companyData = {
      name,
      address,
      email,
      registration_number,
      user_id : userId
    };

    setState({ ...state, isLoading: true });

    jobService
      .createCompany(companyData)
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "success",
            text: res.data?.description,
          },
        });
        setTimeout(() => {
          closeModal();
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

  return (
    <Dialog
      open={true}
      onClose={closeModal}
      className="companyModal"
      ref={divRef}
    >
      <DialogTitle onClose={closeModal}> Company Details </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <TextField
            placeholder="Company Name"
            variant="outlined"
            size="small"
            margin="dense"
            type="text"
            name="name"
            value={name}
            fullWidth
            onChange={(e) => handleOnChange(e)}
            error={errors["name"].length > 0 ? true : false}
          />

          <TextField
            placeholder="Company Address"
            variant="outlined"
            size="small"
            margin="dense"
            type="text"
            value={address}
            name="address"
            fullWidth
            onChange={(e) => handleOnChange(e)}
            error={errors["address"].length > 0 ? true : false}
          />

          <TextField
            placeholder="Company Registration Number"
            variant="outlined"
            size="small"
            margin="dense"
            value={registration_number}
            name="registration_number"
            type="number"
            fullWidth
            onChange={(e) => handleOnChange(e)}
            error={errors["registration_number"].length > 0 ? true : false}
          />

          <TextField
            placeholder="Company email"
            variant="outlined"
            size="small"
            margin="dense"
            value={email}
            type="email"
            name="email"
            fullWidth
            onChange={(e) => handleOnChange(e)}
            error={errors["email"].length > 0 ? true : false}
          />

          <Button
            className="confirmJob"
            onClick={(e) => confirmJob(e)}
            variant="contained"
            color="primary"
          >
            Confirm
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
