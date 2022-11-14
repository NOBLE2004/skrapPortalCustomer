// import React, { useEffect, useState } from "react";
// import { InputLabel } from "@mui/material";
// import { Alert } from "@mui/lab";
// import CircularProgress from "@mui/material/CircularProgress";
// import MuiDialogTitle from "@mui/material/DialogTitle";
// import { withStyles } from "@mui/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { Button, MenuItem, FormControl, Select } from "@mui/material";
// import { connect } from "react-redux";
// import { getSiteManager } from "../../../store/actions/siteManager.action";
// import { getSites } from "../../../store/actions/sites.action";
// import SiteService from "../../../services/sites.service";
// import "./assignToManager.scss";

// function SiteAssignToManager(props) {
//   const { handleClose, managerId, setReload, siteData } = props;
//   const [state, setState] = useState({
//     manager: "",
//     notice: null,
//   });

//   const { isLoading, manager, notice } = state;

//   const styles = (theme) => ({
//     root: {
//       margin: 0,
//       padding: theme.spacing(2),
//     },
//     closeButton: {
//       position: "absolute",
//       right: theme.spacing(1),
//       top: theme.spacing(1),
//       color: theme.palette.grey[500],
//     },
//   });

//   const DialogTitle = withStyles(styles)((props) => {
//     const { children, classes, onClose, ...other } = props;
//     return (
//       <MuiDialogTitle disableTypography className={classes.root} {...other}>
//         <Typography variant="h6">{children}</Typography>
//         {onClose ? (
//           <IconButton
//             aria-label="close"
//             className={classes.closeButton}
//             onClick={onClose}
//           >
//             <CloseIcon />
//           </IconButton>
//         ) : null}
//       </MuiDialogTitle>
//     );
//   });

//   const handleOnChange = (event) => {
//     const { name, value } = event.target;

//     setState({ ...state, [name]: value });
//   };

//   useEffect(() => {
//     async function fetchData() {
//       if (!props.siteManager.sites) {
//         await props.getSiteManager();
//       }
//     }

//     fetchData();
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setState({ ...state, isLoading: true });

//     SiteService.siteAssignToManager({
//       manager_id: managerId ? managerId : manager,
//       address_id: siteData ? siteData.address_id : "",
//     })
//       .then((response) => {
//         setState({
//           ...state,
//           isLoading: false,
//           notice: {
//             type: "success",
//             text: response.data.description,
//           },
//         });

//         setTimeout(() => {
//           setReload();
//           handleClose();
//         }, 2000);
//       })
//       .catch((error) => {
//         setState({
//           ...state,
//           isLoading: false,
//           notice: {
//             type: "error",
//             text: error.message,
//           },
//         });
//       });
//   };

//   return (
//     <Dialog open={true} onClose={handleClose} className="booksitemodal">
//       <DialogTitle onClose={handleClose}> Assign to Manager </DialogTitle>
//       <DialogContent dividers>
//         <form noValidate>
//           {!managerId && (
//             <div className="customer-input-field">
//               <InputLabel>Managers List</InputLabel>
//               <FormControl variant="outlined" margin="dense" fullWidth>
//                 <InputLabel id="demo-simple-select-outlined-label">
//                   Manager
//                 </InputLabel>
//                 <Select
//                   label="manager"
//                   name="manager"
//                   fullWidth
//                   onChange={handleOnChange}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {props.siteManager.sites &&
//                     props.siteManager.sites.map((data, index) => {
//                       return (
//                         <MenuItem key={index} value={data.user_id}>
//                           {data.name}
//                         </MenuItem>
//                       );
//                     })}
//                 </Select>
//               </FormControl>
//             </div>
//           )}
//           <Button
//             className="confirmJob"
//             variant="contained"
//             color="primary"
//             onClick={handleSubmit}
//           >
//             Submit
//             {isLoading && <CircularProgress />}
//           </Button>
//           <div className="alert-msg">
//             {notice && <Alert severity={notice.type}>{notice.text}</Alert>}
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }
// const mapStateToProps = ({ siteManager, allsites }) => {
//   return { siteManager, allsites };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getSiteManager: (year) => dispatch(getSiteManager(year)),
//     getSites: () => dispatch(getSites()),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SiteAssignToManager);

import { forwardRef } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import "../createSite/style.scss";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import {
  Box,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import UnChecked from "../../../assets/images/radio-unchecked.svg";
import Checked from "../../../assets/images/checked.svg";
import PlusGray from "../../../assets/images/plus-gray.svg";
import { useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const DialogAddSite = (props) => {
  const { handleClose, managerId, setReload } = props;
  const [value, setValue] = useState(1);
  return (
    <Card>
      <Dialog
        fullWidth
        open={true}
        maxWidth="xs"
        onClose={handleClose}
        onBackdropClick={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            borderRadius: "16px",
            background: "#F7F7F7",
          },
        }}
        className="order-modal-main"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <Typography
            sx={{
              fontFamily: "DM Sans",
              fontWeight: 700,
              fontSize: "20px",
              color: "#0F2851",
            }}
          >
            Assign site manager{" "}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => {
              handleClose();
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container mt={1}>
            <Grid item xs={12}>
              <label className="img-caption">Site Address</label>
              <Box
                fullWidth
                size="small"
                sx={{
                  background: "#fff",
                  borderRadius: "16px",
                  marginTop: "10px",
                  boxShadow: " 0px 17px 24px rgba(58, 58, 58, 0.05)",
                  padding: "12px",
                }}
              >
                <Typography className="img-caption-address fnt-w-700 clr-blue">
                  Skinner’s School
                </Typography>
                <Typography
                  mt={1}
                  className="img-caption-address fnt-w-400 clr-gray"
                >
                  13 St John’s Road
                </Typography>
                <Typography
                  mt={1}
                  className="img-caption-address fnt-w-400 clr-gray"
                >
                  Tunbridge Wells
                </Typography>
                <Typography
                  mt={1}
                  className="img-caption-address fnt-w-400 clr-gray"
                >
                  TN4 7GL{" "}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container mt={3}>
            <Grid item xs={12}>
              <label className="img-caption">Select site manager</label>
              <Box
                fullWidth
                size="small"
                sx={{
                  background: "#fff",
                  borderRadius: "16px",
                  marginTop: "10px",
                  boxShadow: " 0px 17px 24px rgba(58, 58, 58, 0.05)",
                  padding: "12px",
                }}
              >
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={value}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value={1}
                      control={
                        <Radio
                          icon={<img src={UnChecked} alt="" />}
                          checkedIcon={<img src={Checked} alt="" />}
                        />
                      }
                      label={
                        <Typography
                          className={`img-caption-address  ${
                            value === 1
                              ? "clr-light-blue fnt-w-700"
                              : "clr-gray fnt-w-400"
                          }`}
                        >
                          Danielle Willetts
                        </Typography>
                      }
                      onClick={() => {
                        setValue(1);
                      }}
                    />
                    <FormControlLabel
                      value={2}
                      control={
                        <Radio
                          icon={<img src={UnChecked} alt="" />}
                          checkedIcon={<img src={Checked} alt="" />}
                        />
                      }
                      label={
                        <Typography
                          className={`img-caption-address ${
                            value === 2
                              ? "clr-light-blue fnt-w-700"
                              : "clr-gray fnt-w-400"
                          }`}
                        >
                          {" "}
                          Marta Palacio{" "}
                        </Typography>
                      }
                      onClick={() => {
                        setValue(2);
                      }}
                    />
                    <FormControlLabel
                      value={3}
                      control={
                        <Radio
                          icon={<img src={UnChecked} alt="" />}
                          checkedIcon={<img src={Checked} alt="" />}
                        />
                      }
                      label={
                        <Typography
                          className={`img-caption-address  ${
                            value === 3
                              ? "clr-light-blue fnt-w-700"
                              : "clr-gray fnt-w-400"
                          }`}
                        >
                          {" "}
                          Will Gregson
                        </Typography>
                      }
                      onClick={() => {
                        setValue(3);
                      }}
                    />
                  </RadioGroup>
                  <Box mt={1} display="flex">
                    <img src={PlusGray} alt="" />
                    <Typography
                      ml={1}
                      className="img-caption-address fnt-w-700 clr-gray"
                    >
                      Or invite a new site manager
                    </Typography>
                  </Box>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Grid
            container
            marginTop={3}
            justifyContent="space-between"
            className="btn-modal"
          >
            <Grid item xs={5.5}>
              <button
                className="button-cancel"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </button>
            </Grid>
            <Grid item xs={5.5}>
              <button
                className="button-save"
                onClick={() => {
                  handleClose();
                }}
              >
                Send
              </button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DialogAddSite;
