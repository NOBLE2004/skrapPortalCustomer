// ** React Imports
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
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const DeleteModal = (props) => {
  const { handleClose, managerId, setReload } = props;
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
        <DialogTitle sx={{ m: 0, p: 2, pl: 3 }}>
          <Grid container>
            <Grid item xs={10}>
              <Typography
                sx={{
                  fontFamily: "DM Sans",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#0F2851",
                }}
              >
                Are you sure you want to delete{" "}
                <span className="clr-light-blue"> Skinners School</span>?
              </Typography>
            </Grid>
          </Grid>
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
                Delete
              </button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DeleteModal;
