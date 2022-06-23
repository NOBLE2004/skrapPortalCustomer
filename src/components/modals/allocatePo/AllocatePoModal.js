import React, { useEffect, useState } from "react";
import { InputLabel, Grid, TextField } from "@mui/material";
import { Alert, Autocomplete } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import sitesService from "../../../services/sites.service";
import { getUserDataFromLocalStorage } from "../../../services/utils";
import "./allocatepo.scss";

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

const AllocatePoModal = (props) => {
  const { handleClose, userId, addressId } = props;
  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    subServices: [],
    po: "",
    isServiceEmpty: false,
  });
  const [errors, setError] = useState({
    po: "",
  });

  const checkingError = (name, value) => {
    switch (name) {
      case "po":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      default:
        break;
    }
    setError({ ...errors });
  };
  const userData = getUserDataFromLocalStorage();
  const [serviceType, setServiceType] = useState([
    {
      user_id: userId ? userId : userData.user_id,
      service_id: "",
      quantity: 0,
    },
  ]);
  const { notice, isLoading, subServices, po, isServiceEmpty } = state;

  useEffect(() => {
    sitesService
      .getAllSubServicesOnly()
      .then((res) => {
        setState({ ...state, subServices: res.data });
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleAddService = () => {
    const userData = getUserDataFromLocalStorage();
    setServiceType([
      ...serviceType,
      {
        user_id: userId ? userId : userData.user_id,
        service_id: "",
        quantity: 0,
      },
    ]);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, po: event.target.value });
    checkingError(name, value);
  };

  const handleServiceType = (event, index, service) => {
    const { name, value } = event.target;
    if (service) {
      const data = [...serviceType];
      data[index].service_id = service.service_id;
      setServiceType(data);
      setState({ ...state, isServiceEmpty: false });
    }
    switch (name) {
      case "quantity":
        const data1 = [...serviceType];
        data1[index].quantity = value;
        setServiceType(data1);
        break;
      default:
        break;
    }
  };

  const removeRow = (index) => {
    serviceType.splice(index, 1);
    setState({ ...state, serviceType });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (po === "") {
      Object.keys(errors).forEach((error) => {
        checkingError(error, state[error]);
      });
      return;
    }

    const serReq = serviceType.some((elem) => {
      return elem.service_id !== "";
    });

    if (!serReq) {
      setState({ ...state, isServiceEmpty: true });
      return;
    }
    setState({ ...state, isLoading: true });
    const data = {
      services: serviceType,
      purchase_order: po,
      site_id: addressId,
    };

    sitesService
      .purchaseOrder(data)
      .then((res) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "success",
            text: res.data.description,
          },
        });

        setTimeout(() => {
          handleClose();
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

  return (
    <div>
      <Dialog open={true} onClose={handleClose} className="booksitemodal">
        <DialogTitle onClose={handleClose}> Allocate to PO </DialogTitle>
        <DialogContent dividers>
          <form noValidate>
            <TextField
              name="po"
              placeholder="Purchase Order"
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              onChange={(e) => handleOnChange(e)}
              error={errors["po"].length > 0 ? true : false}
            />
            {serviceType.map((data, index) => {
              return (
                <Grid container className="services-main" key={index}>
                  <Grid item md={7}>
                    <InputLabel>Services List</InputLabel>
                    <Autocomplete
                      id="virtualize-demo"
                      sx={{ width: 300 }}
                      disableListWrap
                      options={subServices}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="services list"
                          variant="outlined"
                          size="small"
                          margin="dense"
                        />
                      )}
                      onChange={(event, value) =>
                        handleServiceType(event, index, value)
                      }
                      getOptionLabel={(option) => `${option.service_name} (${option.parent_name})`}
                    />
                  </Grid>
                  <Grid item md="2">
                    <InputLabel>Quantity</InputLabel>
                    <TextField
                      name="quantity"
                      variant="outlined"
                      size="small"
                      value={data.quantity}
                      margin="dense"
                      onChange={(e) => handleServiceType(e, index)}
                    />
                  </Grid>

                  <Grid item md="2" className="add-more-btn">
                    {serviceType.length > 1 && (
                      <p
                        className="remove-link"
                        onClick={() => {
                          removeRow(index);
                        }}
                      >
                        - remove
                      </p>
                    )}
                  </Grid>
                </Grid>
              );
            })}
            {isServiceEmpty && (
              <div className="service-error">
                Atleast One Service is Required
              </div>
            )}
            <span className="add-more-link" onClick={handleAddService}>
              Add More
            </span>

            <Button
              className="confirmJob"
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Submit
              {isLoading && <CircularProgress />}
            </Button>
            <div className="alert-msg">
              {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocatePoModal;
