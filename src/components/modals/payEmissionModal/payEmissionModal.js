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
import Radio from '@mui/material/Radio';


import "./style.scss";
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function PayEmissionModal(props) {

    const [data, setData] = useState([{
        id: 1,
        name: 'Krissana Wind Power',
        price: 20,
        selected: 'a'
    },
    {
        id: 2,
        name: 'CarbonCure',
        price: 60,
        selected: 'b'
    },
    {
        id: 3,
        name: 'Fazenda Nascente Do Luar',
        price: 50,
        selected: 'c'
    }
    ])
    const { showModal, setShowModal } = props;
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [state, setState] = useState({
        price: data && data[0] && data[0].price
    })


    const handleChange = (event, price) => {
        setState(st => ({
            ...st,
            price: price
        }))
        setSelectedValue(event.target.value);
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

    return (
        <Dialog open={showModal} onClose={() => setShowModal(!showModal)} className="booksitemodal">
            <DialogTitle onClose={() => setShowModal(!showModal)}> Pay Co2e</DialogTitle>
            <DialogContent dividers>
                <form noValidate>
                    <Grid container justifyContent='center'>
                        {data.map(single =>
                            <Grid item md={8} xs={12}>
                                <div className="main-modal-content-emision" key={single.id}>
                                    <div>
                                        <p>
                                            {single.name}
                                            <span>&nbsp;(£{single.price})</span>
                                        </p>
                                    </div>
                                    <div>
                                        <Radio
                                            checked={single.selected === selectedValue}
                                            onChange={(e) => handleChange(e, single.price)}
                                            value={single.selected}
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': 'A' }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        )}
                    </Grid>
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
