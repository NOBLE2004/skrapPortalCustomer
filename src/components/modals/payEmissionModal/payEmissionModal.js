import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import { getPortfolio } from "../../../store/actions/action.portfolio";

import "./style.scss";

function PayEmissionModal(props) {
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state?.portfolio);
  useEffect(() => {
    async function fetchData() {
      if (!portfolio?.data?.data) {
        await dispatch(getPortfolio());
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setState((st) => ({
      ...st,
      price: portfolio?.data?.data[0]?.price_per_kg,
    }));
    setSelectedValue(portfolio?.data?.data[0]?.id);
  }, [portfolio?.data?.data]);

  const { showModal, setShowModal } = props;
  const [selectedValue, setSelectedValue] = useState("");
  const [state, setState] = useState({
    price: 0,
  });

  const handleChange = (event, price) => {
    setState((st) => ({
      ...st,
      price: price,
    }));
    setSelectedValue(event);
  };

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
      <MuiDialogTitle className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={() => setShowModal(!showModal)}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });

  return (
    <Dialog
      open={showModal}
      onClose={() => setShowModal(!showModal)}
      className="booksitemodal"
    >
      <DialogTitle onClose={() => setShowModal(!showModal)}>
        {" "}
        Pay Co2e
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate>
          <Grid container justifyContent="center">
            {portfolio?.data?.data?.map((single) => (
              <Grid item md={8} xs={12} key={single?.id}>
                <div className="main-modal-content-emision" key={single.id}>
                  <div>
                    <p>
                      {single.name}
                      <span>&nbsp;(£{single.price_per_kg})</span>
                    </p>
                  </div>
                  <div>
                    <Radio
                      checked={single.id === selectedValue}
                      onChange={(e) =>
                        handleChange(single.id, single.price_per_kg)
                      }
                      value={single.selected}
                      name="radio-buttons"
                      inputProps={{ "aria-label": "A" }}
                    />
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
          <Grid container justifyContent="flex-end" marginTop={2}>
            <Button
              className=""
              variant="contained"
              color="primary"
              sx={{
                margin: "unset",
                borderRadius: "50px",
                textTransform: "unset",
                fontFamily: "DM Sans",
                fontStyle: "normal",
                fontWeight: 600,
                fontSize: "14px",
                lineHeight: "20px",
                padding: "10px 20px",
                background: "linear-gradient(180deg, #73c6f9 0%, #5391f9 100%)",
              }}
            >
              Pay Now : £{state.price}
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default PayEmissionModal;
