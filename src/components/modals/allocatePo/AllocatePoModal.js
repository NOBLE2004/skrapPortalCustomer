import React, { useEffect, useState } from "react";
import { InputLabel, Grid, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Button, MenuItem, FormControl, Select } from "@material-ui/core";
import sitesService from "../../../services/sites.service";
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
  const { handleClose, userId } = props;
  const [state, setState] = useState({
    notice: null,
    isLoading: false,
    subServices: [],
  });
  const [serviceType, setServiceType] = useState([
    { user_id: userId, service_id: "", quantity: 0 },
  ]);
  const { notice, isLoading, subServices } = state;

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
    setServiceType([
      ...serviceType,
      { user_id: userId, service_id: "", quantity: 0 },
    ]);
  };

  const handleServiceType = (event, index) => {
    const { name, value } = event.target;
    switch (name) {
      case "service_id":
        const data = [...serviceType];
        data[index].service_id = value;
        setServiceType(data);
        break;
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
    if (userId === null) {
      setState({
        ...state,
        isLoading: false,
        notice: {
          type: "error",
          text: "User Id is mandartory",
        },
      });

      return;
    }
    setState({ ...state, isLoading: true });
    const data = {
      services: serviceType,
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
        <DialogTitle onClose={handleClose}> Allocate to Po </DialogTitle>
        <DialogContent dividers>
          <form noValidate>
            {serviceType.map((data, index) => {
              return (
                <Grid container className="services-main" key={index}>
                  <Grid item md={7}>
                    <InputLabel>Services List</InputLabel>
                    <FormControl variant="outlined" margin="dense" fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Services
                      </InputLabel>
                      <Select
                        value={data.service_id}
                        label="services"
                        name="service_id"
                        fullWidth
                        onChange={(e) => handleServiceType(e, index)}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {subServices.map((subSer, index) => {
                          return (
                            <MenuItem value={subSer.service_id} key={index}>
                              {subSer.service_name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
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
          </form>

          {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllocatePoModal;
