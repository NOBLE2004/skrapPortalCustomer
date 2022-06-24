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
// import "./assignToManager.scss";

function PayEmissionModal(props) {
    const { showModal, setShowModal } = props;
    const [state, setState] = useState({
        manager: "",
        site: "",
        notice: null,
    });

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
                        onClick={()=>setShowModal(!showModal)}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });

    return (
        <Dialog open={showModal} onClose={()=>setShowModal(!showModal)} className="booksitemodal">
            <DialogTitle onClose={()=>setShowModal(!showModal )}> Pay Co2e</DialogTitle>
            <DialogContent dividers>
                <form noValidate>
                    <div>aa</div>

 
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default PayEmissionModal
