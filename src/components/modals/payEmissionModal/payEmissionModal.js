import React, { useEffect, useState } from "react";
import { Button, Grid, InputLabel } from "@mui/material";
import { Alert } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { withStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Checkbox from '@mui/material/Checkbox';

import "./style.scss";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function PayEmissionModal(props) {
    const { showModal, setShowModal } = props;

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
                        onClick={() => setShowModal(!showModal)}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </MuiDialogTitle>
        );
    });


    const [data, setData] = useState([{
        id: 1,
        name: 'Name',
        price: 20,
        checked: false
    },
    {
        id: 2,
        name: 'Name',
        price: 60,
        checked: false
    },
    {
        id: 3,
        name: 'Name',
        price: 50,
        checked: false
    }
    ])

    const [state, setState] = useState({
        price: 0
    })
    const updateState = (e) => {
        setData(prevState => {
            const newState = prevState.map(obj => {
                if (obj.id == Number(e.target.name)) {
                    if (obj.checked == false) {
                        obj.checked = true
                        setState(st => ({
                            ...st,
                            price: state.price + obj.price
                        }))
                    }

                    else {
                        obj.checked = false
                        setState(st => ({
                            ...st,
                            price: state.price - obj.price
                        }))
                    }
                    return { ...obj };
                }

                return obj;
            });

            return newState;
        });
    };

    return (
        <Dialog open={showModal} onClose={() => setShowModal(!showModal)} className="booksitemodal">
            <DialogTitle onClose={() => setShowModal(!showModal)}> Pay Co2e</DialogTitle>
            <DialogContent dividers>
                <form noValidate>
                    {data.map(single =>
                        <div className="main-modal-content-emision" key={single.id}>
                            <div>
                                <p>
                                    {single.name}
                                </p>
                            </div>
                            <div>
                                <p>
                                    £{single.price}
                                </p>
                            </div>
                            <div>
                                <Checkbox {...label} name={single.id} defaultChecked={single.checked}
                                    onChange={(e) => {
                                        updateState(e)
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    <Grid container justifyContent='flex-end' marginTop={2}>
                        <Button
                            className=""
                            variant="contained"
                            color="primary"
                            sx={{
                                margin: 'unset',
                                borderRadius: '50px',
                                textTransform: 'unset',
                                fontFamily: "DM Sans",
                                fontStyle: 'normal',
                                fontWeight: 600,
                                fontSize: '14px',
                                lineHeight: "20px",
                                padding: '10px 20px',
                                background: 'linear-gradient(180deg, #73c6f9 0%, #5391f9 100%)'

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

export default PayEmissionModal
