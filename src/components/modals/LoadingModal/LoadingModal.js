import React, {useState} from "react";
import {withStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import './loadingModal.scss'
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/lab/Alert";

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
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

function LoadingModal({handleClose, children, show, handleRes, noticeData, isLoading}) {
    const handleOk = () => {
        handleRes()
    };

    return (
        <Dialog
            maxWidth="md"
            onClose={handleClose}
            className="loadingModal"
            open={show}
        >
            <DialogTitle onClose={handleClose}>
                {children}
            </DialogTitle>
            <DialogContent dividers>Are you sure for reorder this service
                {isLoading && <CircularProgress/>}
                <div>
                    {noticeData && <Alert severity={noticeData.type}>{noticeData.text}</Alert>}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    cancel
                </Button>
                <Button onClick={handleOk} color="primary" autoFocus>
                    ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default LoadingModal;
