import React, {useState} from "react";
import {withStyles} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import './loadingModal.scss'
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

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
            <DialogContent dividers>Are you Sure for reordering
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
