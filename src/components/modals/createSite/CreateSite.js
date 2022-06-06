import "date-fns";
import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { withStyles } from "@mui/styles";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/lab/Alert";
import CloseIcon from "@mui/icons-material/Close";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AsychronousAddress from "../../commonComponent/asychronousAddress/AsychronousAddress";
import CircularProgress from "@mui/material/CircularProgress";
import sitesService from "../../../services/sites.service";

export default function CreateSite({
  closeModal,
  setJobCreated,
  handleJobCreated,
  sites,
  reload,
}) {
  const divRef = useRef(null);
  const [errors, setError] = useState({
    addressData: "",
  });

  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    addressData: {},
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

  const { isLoading, notice, addressData } = state;

  const checkingError = (name, value) => {
    switch (name) {
      case "addressData":
        errors[name] =
          Object.keys(value).length === 0 ? "Must have selected address" : "";
        break;
      default:
        break;
    }
    setError({ ...errors });
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
  const confirmJob = (e) => {
    e.preventDefault();
    if (Object.keys(addressData).length === 0) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }

    setState({ ...state, isLoading: true });
    const isUprnDeleted = delete addressData.uprn;
    if (isUprnDeleted) {
      sitesService
        .createNewSite(addressData)
        .then((res) => {
          if (res.data.data === "Site already exists") {
            setState({
              ...state,
              isLoading: false,
              notice: {
                type: "error",
                text: res.data.data,
              },
            });
          } else {
            setState({
              ...state,
              isLoading: false,
              notice: {
                type: "success",
                text: res.data.data,
              },
            });
            setTimeout(() => {
              closeModal();
              reload();
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
    }
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
      className="creatJobModal"
      ref={divRef}
    >
      <DialogTitle onClose={closeModal}> Create Site </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <div className="addressSec">
            <p>Site Address</p>
            <AsychronousAddress
              error={errors.addressData}
              handleSelectedPostCode={(value) => handleSelectedPostCode(value)}
            />
          </div>

          <Button
            className="confirmJob"
            onClick={(e) => confirmJob(e)}
            variant="contained"
            color="primary"
          >
            Confirm Site
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
