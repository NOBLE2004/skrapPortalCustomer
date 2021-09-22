import React from 'react';
import {useState, useEffect} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import {Paper} from '@material-ui/core';
import clsx from 'clsx';
import "./smartJosStatus.scss"

const styles = {
    active: {
        backgroundImage: props => getConnector(props.index),

    },
    completed: {
        backgroundImage: props => getConnector(props.index),

    },
    root: {
        width: '115px',
        border: 0,
        height: '8px',
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
        marginLeft: '-45px',
    },


};
const CustomConnector = withStyles(styles)(StepConnector);

function StepIcon(props) {
    const {active, completed, icon} = props;
    const classes = stepperIcon(icon);


    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >

        </div>
    );
}

function getConnector(index) {
    switch (index) {
        case 1:
            return 'linear-gradient(rgba(255, 144, 19, 1), rgba(255, 144, 19, 1), rgba(255, 144, 19, 1))';
        case 2:
            return 'linear-gradient(rgba(255, 144, 19, 1), rgba(255, 144, 19, 1), rgba(255, 144, 19, 1))';
        case 3:
            return 'linear-gradient( rgba(255, 166, 38, 1), rgba(255, 166, 38, 1), rgba(255, 166, 38, 1))';
            case 4:
            return 'linear-gradient( rgba(255, 166, 38, 1), rgba(255, 166, 38, 1), rgba(255, 166, 38, 1))';
            case 5:
            return 'linear-gradient( rgba(255, 166, 38, 1), rgba(255, 166, 38, 1), rgba(255, 166, 38, 1))';
        case 4:
            return 'linear-gradient( rgba(255, 188, 57, 1),rgba(255, 188, 57, 1), rgba(255, 188, 57, 1))';
        case 5:
            return 'linear-gradient( rgba(128, 183, 75, 1), rgba(128, 183, 75, 1),rgba(128, 183, 75, 1))';
        case 6:
            return 'linear-gradient(rgb(123, 230, 179), rgb(55, 191, 127), rgb(43, 206, 129))';
        case 7:
            return 'linear-gradient( rgba(0, 178, 93, 1), rgba(0, 178, 93, 1), rgba(0, 178, 93, 1))'
    }
}

function getIcon(icon) {
    switch (icon) {
        case 1:
            return 'linear-gradient( rgba(255, 0, 0, 1), rgba(255, 0, 0, 1), rgba(255, 0, 0, 1))';
        case 2:
            return 'linear-gradient(rgba(255, 144, 19, 1), rgba(255, 144, 19, 1), rgba(255, 144, 19, 1))';
        case 3:
            return 'linear-gradient( rgba(255, 166, 38, 1), rgba(255, 166, 38, 1), rgba(255, 166, 38, 1))';
        case 4:
            return 'linear-gradient( rgba(255, 188, 57, 1),rgba(255, 188, 57, 1), rgba(255, 188, 57, 1))';
        case 5:
            return 'linear-gradient( rgba(128, 183, 75, 1), rgba(128, 183, 75, 1),rgba(128, 183, 75, 1))';
        case 6:
            return 'linear-gradient(rgb(123, 230, 179), rgb(55, 191, 127), rgb(43, 206, 129))';
        case 7:
            return 'linear-gradient( rgba(0, 178, 93, 1), rgba(0, 178, 93, 1), rgba(0, 178, 93, 1))'

    }
}

const stepperIcon = makeStyles({

    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 20,
        height: 20,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        //marginLeft: '11px',
        marginTop: '5px',
    },
    active: {
        backgroundImage: props => getIcon(props),
        //marginLeft: '0px'
    },
    completed: {
        backgroundImage:
            props => getIcon(props),
        //marginLeft: '0px'
    },
});

function JobStatus({status}) {

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        status === 0 ?
            setActiveStep(0) : status === 1 ?
            setActiveStep(1) : status === 2 ?
                setActiveStep(2) : status === 3 ?
                    setActiveStep(5) : status === 4 ?
                        setActiveStep(3) : status === 7 ?
                            setActiveStep(4) : status === 8 ?
                                setActiveStep(4) : setActiveStep(0);
    }, [status]);

    function getSteps() {
        return ['Confirmation Pending', 'Driver Assigned', 'Driver Enroute', 'Service Delivered', 'Collected From Site', 'Work Complete'];
    }

    function getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Select campaign settings...';
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }

    const steps = getSteps();
    const getLabelBoxColor = (index, activeStep) => {
        switch (index) {
            case 0:
                return '#FF0000';
            case 1:
                return '#FF9013';
            case 2:
                return '#FFA626';
            case 3:
                return '#FFBC39';
            case 4:
                return '#80B74B';
            case 5:
                return '#80B74B';
            case 6:
                return '#00B25D'
        }

    };
    const getLabelComponent = (index, activeStep, label) => {
        if (index <= activeStep)
            return (
                // <Paper className='paper-container' style={{
                //     backgroundColor: getLabelBoxColor(index, activeStep),
                //     borderColor: `${getLabelBoxColor(index, activeStep)} transparent`
                // }}
                //        elevation={3}>
                <>
                    <Typography className='label-text'> {label}</Typography>
                    {/*<Typography className='label-date'> {'2021-03-25 09:28:01'}</Typography>*/}
                    </>
                 // </Paper>
            );
        else return (
            <>
            <Typography className='label-text'> {label}</Typography>
            {/*<Typography className='label-date'> {'2021-03-25 09:28:01'}</Typography>*/}
            </>
        )
    };
    const handleReset = () => {
        setActiveStep(0);
    };
    return (
        <div className='job-status-detail-container'>
            <div className='header-sub-title m-0'> Status Updates</div>
            <Stepper className='stepper-container' activeStep={activeStep} alternativeLabel
                     connector={<CustomConnector/>}> 
                {steps.map((label, index) => (
                    <Step className='step-container' key={label}>
                        <StepLabel StepIconComponent={StepIcon} className='label-container'>
                            {getLabelComponent(index, activeStep, label)}
                        </StepLabel>

                    </Step>
                ))}
            </Stepper>
        </div>
    )

}

export default JobStatus

