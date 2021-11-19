import React, { useEffect, useState } from "react";
import { InputLabel, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Button, MenuItem, FormControl, Select } from "@material-ui/core";
import siteService from "../../../services/sites.service";
import "./createmanager.scss";
function CreateManager(props) {
  const { handleClose } = props;
  const [value, setValue] = React.useState(12);
  const [radioPermission, setRadioPermission] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    siteData: [],
    firstname: "",
    lastname: "",
    site: "",
    email: "",
    phone: "",
    password: "",
    notice: null,
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (event, id) => {
    setValue(id);
  };

  const checkingError = (name, value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    switch (name) {
      case "firstname":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      case "lastname":
        errors[name] = value.length === 0 ? "Required" : "";
        break;
      case "email":
        errors[name] = reg.test(value) === false ? "Required" : "";
        break;
      case "phone":
        errors[name] = value.length < 10 ? "Required" : "";
        break;
      case "password":
        errors[name] = value.length === 0 ? "Required" : "";
        break;

      default:
        break;
    }
    setErrors({ ...errors });
  };
  const {
    isLoading,
    siteData,
    firstname,
    lastname,
    email,
    password,
    site,
    phone,
    notice,
  } = state;
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

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    switch (name) {
      case "email":
        if (reg.test(email) === false) {
          setState({ ...state, [name]: value });
        }
        break;
      case "firstname":
      case "lastname":
      case "phone":
      case "password":
        setState({ ...state, [name]: value });
        break;
      default:
        setState({ ...state, [name]: value });
    }
    checkingError(name, value);
  };
  useEffect(() => {
    siteService
      .getAllSites()
      .then((res) => {
        setState({ ...state, siteData: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });

    siteService
      .getPermission()
      .then((res) => {
        setRadioPermission(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      (firstname === "") |
      (lastname === "") |
      ((email === "") | (reg.test(email) === false)) |
      (phone.length < 10) |
      (password === "")
    ) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }

    const data = {
      email,
      mobile_number: "+44" + phone,
      password,
      user_type: 1,
      first_name: firstname,
      last_name: lastname,
      device_type: 1,
      site_id: site,
      role_id: value, 
    };
    setState({ ...state, isLoading: true });
    siteService
      .addNewManager(data)
      .then((res) => {
        setState({
          ...state,
          notice: {
            type: "success",
            text: res.data.description,
          },
          isLoading: false,
        });
        setTimeout(() => {
           handleClose();
        }, 2000);
      })
      .catch((err) => {
        setState({
          ...state,
          notice: {
            type: "error",
            text: err.message,
          },
          isLoading: false,
        });
      });
  };
  return (
    <Dialog open={true} onClose={handleClose} className="booksitemodal">
      <DialogTitle onClose={handleClose}> Create Manager </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <div className="customer-input-field">
            <InputLabel>First Name</InputLabel>
            <TextField
              placeholder="First Name"
              variant="outlined"
              size="small"
              margin="dense"
              name="firstname"
              fullWidth
              onChange={(e) => handleOnChange(e)}
              error={errors["firstname"].length > 0 ? true : false}
            />
          </div>
          <div className="customer-input-field">
            <InputLabel>Last Name</InputLabel>
            <TextField
              placeholder="Last Name"
              variant="outlined"
              size="small"
              margin="dense"
              name="lastname"
              fullWidth
              onChange={(e) => handleOnChange(e)}
              error={errors["lastname"].length > 0 ? true : false}
            />
          </div>
          <div className="customer-input-field">
            <InputLabel>Site</InputLabel>
            <FormControl variant="outlined" margin="dense" fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">
                Site Address
              </InputLabel>
              <Select
                label="Site"
                name="site"
                fullWidth
                onChange={(e) => handleOnChange(e)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {siteData &&
                  siteData.map((data, index) => {
                    return (
                      <MenuItem key={index} value={data.address_id}>
                        {data.job_address}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div className="customer-input-field">
            <InputLabel>Email</InputLabel>
            <TextField
              placeholder="Email Address"
              type="email"
              name="email"
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              onChange={(e) => handleOnChange(e)}
              error={errors["email"].length > 0 ? true : false}
            />
          </div>
          <div className="customer-input-field">
            <InputLabel>Phone number</InputLabel>
            <TextField
              placeholder="Phone number"
              variant="outlined"
              size="small"
              fullWidth
              margin="dense"
              name="phone"
              type="number"
              onChange={(e) => handleOnChange(e)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+44</InputAdornment>
                ),
              }}
              characterLimit={10}
              error={errors["phone"].length > 0 ? true : false}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
            />
          </div>
          <div className=" customer-input-field">
            <InputLabel>Password</InputLabel>
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              placeholder="***********"
              name="password"
              type="password"
              onChange={(e) => handleOnChange(e)}
              error={errors["password"].length > 0 ? true : false}
            />
          </div>
          <div>
            {radioPermission.map((data, index) => {
              return (
                <div className="radio-main">
                  <input
                    id={data.id}
                    type="radio"
                    key={index}
                    checked={value === data.id}
                    onChange={(e) => handleChange(e, data.id)}
                    value={data.id}
                    label={data.name}
                  />
                  <label for={data.id} className="radio-label">
                    {data.name}
                  </label>
                </div>
              );
            })}
          </div>
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
  );
}

export default CreateManager;
