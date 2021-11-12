import React, { useEffect, useState } from "react";
import { InputLabel } from "@material-ui/core";
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
import { connect } from "react-redux";
import { getSiteManager } from "../../../store/actions/siteManager.action";
import { getSites } from "../../../store/actions/sites.action";
import SiteService from "../../../services/sites.service";
import "./assignToManager.scss";

function SiteAssignToManager(props) {
  const { handleClose, managerId, setReload, siteData } = props;
  const [state, setState] = useState({
    manager: "",
    notice: null,
  });

  const { isLoading, manager, notice } = state;

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

    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    async function fetchData() {
      if (!props.siteManager.sites) {
        await props.getSiteManager();
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({ ...state, isLoading: true });

    SiteService.siteAssignToManager({
      manager_id: managerId ? managerId : manager,
      address_id: siteData ? siteData.address_id : "",
    })
      .then((response) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "success",
            text: response.data.description,
          },
        });

        setTimeout(() => {
          setReload();
        }, 2000);
      })
      .catch((error) => {
        setState({
          ...state,
          isLoading: false,
          notice: {
            type: "error",
            text: error.message,
          },
        });
      });
  };

  return (
    <Dialog open={true} onClose={handleClose} className="booksitemodal">
      <DialogTitle onClose={handleClose}> Assign to manager </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          {!managerId && (
            <div className="customer-input-field">
              <InputLabel>Managers List</InputLabel>
              <FormControl variant="outlined" margin="dense" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Manager
                </InputLabel>
                <Select
                  label="manager"
                  name="manager"
                  fullWidth
                  onChange={handleOnChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {props.siteManager.sites &&
                    props.siteManager.sites.map((data, index) => {
                      return (
                        <MenuItem key={index} value={data.user_id}>
                          {data.manager_name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </div>
          )}
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
const mapStateToProps = ({ siteManager, allsites }) => {
  return { siteManager, allsites };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSiteManager: (year) => dispatch(getSiteManager(year)),
    getSites: () => dispatch(getSites()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteAssignToManager);
