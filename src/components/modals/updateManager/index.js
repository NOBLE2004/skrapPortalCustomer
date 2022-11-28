import React, { useEffect, useState } from "react";
import { InputLabel, TextField } from "@mui/material";
import { Alert } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import { Button, MenuItem, FormControl, Select } from "@mui/material";
import siteService from "../../../services/sites.service";
import "../createManager/createmanager.scss";
import toast from "react-hot-toast";
function UpdateManager(props) {
  const { handleClose, updateManager, getManagerList } = props;
  const [value, setValue] = React.useState();
  const [radioPermission, setRadioPermission] = useState([]);
  const [state, setState] = useState({
    isLoading: false,
    siteData: [],
    firstname: "",
    lastname: "",
    site: "",
    email: "",
    phone: "",
    notice: null,
  });

  useEffect(() => {
    setState((st) => ({
      ...st,
      firstname: updateManager?.data?.first_name,
      lastname: updateManager?.data?.last_name,
      email: updateManager?.data?.email,
      phone: updateManager?.data?.mobile_number?.slice(3),
      site: updateManager?.data?.address_id,
    }));
    setValue(updateManager?.data?.role_id);
  }, [updateManager]);

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
    switch (name) {
      case "email":
        setState({ ...state, [name]: value });
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
        setState((st) => ({
          ...st,
          siteData: res.data.data,
        }));
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
      (state?.password && state?.password === "")
    ) {
      Object.keys(errors).forEach((error, index) => {
        checkingError(error, state[error]);
      });
      return;
    }

    const data = {
      email,
      mobile_number: "+44" + phone,
      password: state?.password !== "" && state?.password,
      user_type: 1,
      first_name: firstname,
      last_name: lastname,
      device_type: 1,
      site_id: site,
      role_id: value,
      user_id: updateManager?.data?.user_id,
    };
    setState({ ...state, isLoading: true });
    siteService
      .updateManager(data)
      .then((res) => {
        if (res?.data?.code === 0) {
          toast.success(res.data.description);
          setState({});
          handleClose();
          getManagerList();
        } else {
          toast.error(res.data.description);
        }
        setState({
          ...state,
          notice: {
            type: "error",
            text: res.data.description,
          },
          isLoading: false,
        });
        // setTimeout(() => {
        // //   handleClose();
        // //   updateManager();
        // }, 2000);
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

  console.log("uuuuu", updateManager);
  return (
    <Dialog open={true} onClose={handleClose} className="booksitemodal">
      <DialogTitle onClose={handleClose}> Update Manager </DialogTitle>
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
              value={firstname}
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
              value={lastname}
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
                value={site}
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
              value={email}
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
              value={phone}
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

        {/* {notice && <Alert severity={notice.type}>{notice.text}</Alert>} */}
      </DialogContent>
    </Dialog>
  );
}

export default UpdateManager;
