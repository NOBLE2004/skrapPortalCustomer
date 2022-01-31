import React, {useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import "../createExchange/createExchange.scss";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import CardPayment from "../../commonComponent/cardPayment/CardPayment";
import PaymentService from "../../../services/payment.service";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
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
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

function PayNow(props) {
    const {handleClose, cost, jobId, user_id, filters, updateJobs} = props;
    const [state, setState] = useState({
        job_id: jobId,
        transaction_cost: cost,
        customer_user_id: user_id,
        paymentMethod: 0,
        paymentMethodList: [],
        selectedPaymentMethod: '',
        addNewCard: false,
        notice: null,
        isLoading: false,
        disabled: false,
        newCardData: null,
        listResponse: false,
    });

    const [errors, setError] = useState({
        payment: '',
    });

    const {transaction_cost, paymentMethodList, listResponse, addNewCard, paymentMethod, selectedPaymentMethod, newCardData, notice, isLoading, disabled} = state;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
        setError({...state, payment: ''});
    };

    const handlePayNow = () => {
        console.log(state, errors);
        if (state.selectedPaymentMethod === '') {
            setError({...errors, payment: 'please select card'});
            return;
        }
        setState({...state, isLoading: true});
        const data = {
            customer_user_id: user_id,
            amount: transaction_cost,
            card_id: selectedPaymentMethod,
            job_id: jobId
        };
        PaymentService.pay(data).then(response => {
            if (response.data.code === 0) {
                setState({
                    ...state,
                    isLoading: false,
                    notice: {
                        type: 'success',
                        text: response.data.description
                    }
                });
                setTimeout(() => {
                    updateJobs();
                    handleClose();
                }, 1000)
            } else {
                setState({
                    ...state,
                    isLoading: false,
                    notice: {
                        type: 'error',
                        text: response.data.description
                    }
                })
            }
        });
    };

    useEffect(() => {
        PaymentService.list({"user_id": user_id}).then(response => {
            setState({...state, listResponse: true, paymentMethodList: response.data.result});
        });
    }, [user_id, newCardData]);

    const handleSaveNewCard = (cardData) => {
        setState({...state, newCardData: cardData});
    };


    const handleShowNewCard = () => {
        setState({...state, addNewCard: true});
    };
    return (
        <Dialog onClose={handleClose} className="createExchangeModal" open={true} maxWidth='sm'>
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>Pay SK{jobId} cost
                £{transaction_cost} </DialogTitle>
            <DialogContent dividers style={{textAlign: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column'}}>
                {!listResponse && <CircularProgress/>}
                {errors.payment.length > 0 && <Alert severity={'error'}>{errors.payment}</Alert>}
                {(paymentMethod == "0" && listResponse) &&
                <>
                    <RadioGroup name="selectedPaymentMethod" value={selectedPaymentMethod} onChange={handleChange}>
                        {
                            paymentMethodList.map((data, index) => {
                                return (
                                    <FormControlLabel style={{justifyContent: 'center'}} key={index} value={data.id} control={<Radio color="primary"/>}
                                                      label={`•••• •••• •••• ${data.card.last4} - ${data.card.brand}`}/>
                                )
                            })
                        }
                    </RadioGroup>
                    {
                        paymentMethodList.length > 0 ?
                            <Button className="newCard" onClick={() => handleShowNewCard()} variant="contained">
                                Add new card
                            </Button> :
                            <CardPayment
                                user_id={user_id}
                                handleSaveNewCard={(value) => handleSaveNewCard(value)}
                                setOpen={() => setState({...state, addNewCard: false})}
                            />
                    }
                    {
                        addNewCard && <CardPayment
                            user_id={user_id}
                            handleSaveNewCard={(value) => handleSaveNewCard(value)}
                            setOpen={() => setState({...state, addNewCard: false})}
                        />
                    }
                </>
                }
            </DialogContent>
            <Button className={'createExchangeBtn'} color="primary" disabled={disabled}
                    onClick={() => handlePayNow()}>
                Confirm Payment
            </Button>
            {isLoading && <CircularProgress/>}
            {notice &&
            <Alert severity={notice.type}>{notice.text}</Alert>
            }
        </Dialog>
    );
}
export default PayNow;
