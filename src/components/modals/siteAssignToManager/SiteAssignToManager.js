import React, { useEffect, useState } from "react";
import { InputLabel } from "@mui/material";
import { Alert } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, MenuItem, FormControl, Select } from "@mui/material";
import { connect } from "react-redux";
import { getSiteManager } from "../../../store/actions/siteManager.action";
import { getSites } from "../../../store/actions/sites.action";
import SiteService from "../../../services/sites.service";
import "./assignToManager.scss";

function SiteAssignToManager(props) {
  const { handleClose, managerId, setReload, siteData } = props;
  const [state, setState] = useState({
    manager: [],
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
  function getStyles(name, personName) {
    return {
      fontWeight: personName.indexOf(name) === -1 ? 500 : 800,
    };
  }

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
      manager_ids: state?.manager ? state?.manager : manager,
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
          handleClose();
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
      <DialogTitle onClose={handleClose}> Assign to Manager </DialogTitle>
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
                  multiple
                  value={state?.manager ? state?.manager : []}
                  onChange={handleOnChange}
                >
                  {/* <MenuItem value="">
                    <em>None</em>
                  </MenuItem> */}
                  {props.siteManager.sites &&
                    props.siteManager.sites.map((data, index) => {
                      return (
                        <MenuItem
                          key={index}
                          value={data.user_id}
                          style={getStyles(data.user_id, state?.manager)}
                        >
                          {data.name}
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
          <div className="alert-msg">
            {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
          </div>
        </form>
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
