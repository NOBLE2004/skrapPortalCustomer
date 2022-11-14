// ** React Imports
import { Ref, forwardRef, ReactElement, useState, useEffect } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import ModalOne from "./modal1";
import ModalTwo from "./modal2";
import ModalThree from "./modal3";
import ModalFour from "./modal4";
import ModalFive from "./modal5";
import ModalSix from "./modal6";
import CloseIcon from "@mui/icons-material/Close";
import Fade from "@mui/material/Fade";
import {
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Typography,
} from "@mui/material";
import "./style.scss";
const Transition = forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />;
});

const AddNewOrder = ({ closeModal }) => {
  const [selected, setSelected] = useState({
    service_id: "",
    message: false,
  });

  const [value, setValue] = useState(2);
  const handleClose = () => {
    closeModal();
  };

  const handleValue = (value) => {
    setValue(value);
  };

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
            background: value === 6 ? "#60A0F8" : "#F7F7F7",
          },
        }}
        className="create-job-modal-main"
      >
        <DialogTitle sx={{ m: 0, p: 2, pl: 3 }}>
          {value !== 6 && (
            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontWeight: 700,
                fontSize: "20px",
                color: "#0F2851",
              }}
            >
              Create new order
            </Typography>
          )}
          <IconButton
            aria-label="close"
            onClick={() => {
              handleClose();
            }}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) =>
                value === 6 ? "#fff" : theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        {value === 6 ? (
          <DialogContent>
            <ModalSix handleValue={handleValue} />
          </DialogContent>
        ) : (
          <DialogContent>
            {value === 1 && (
              <ModalOne
                handleValue={handleValue}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {value === 2 && (
              <ModalTwo
                handleValue={handleValue}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {value === 3 && (
              <ModalThree
                handleValue={handleValue}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {value === 4 && <ModalFour handleValue={handleValue} />}
            {value === 5 && <ModalFive handleValue={handleValue} />}
          </DialogContent>
        )}
      </Dialog>
    </Card>
  );
};

export default AddNewOrder;
