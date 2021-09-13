import React, {useEffect, useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Typography from '@material-ui/core/Typography';
import {Paper} from "@material-ui/core";
import './smartJosStatus.scss'


function getConnector(index) {
    switch (index) {
        case 1:
            return 'linear-gradient(rgba(255, 144, 19, 1), rgba(255, 144, 19, 1), rgba(255, 144, 19, 1))';
        case 2:
            return 'linear-gradient( rgba(255, 166, 38, 1), rgba(255, 166, 38, 1), rgba(255, 166, 38, 1))';
        case 3:
            return 'linear-gradient( rgba(128, 183, 75, 1), rgba(128, 183, 75, 1),rgba(128, 183, 75, 1))';
        case 4:
            return 'linear-gradient( rgba(128, 183, 75, 1), rgba(128, 183, 75, 1),rgba(128, 183, 75, 1))';
        case 5:
            return 'linear-gradient(rgb(123, 230, 179), rgb(55, 191, 127), rgb(43, 206, 129))';
        case 6:
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
            return 'linear-gradient( rgba(255, 188, 57, 1),rgba(255, 188, 57, 1), rgba(255, 188, 57, 1))';
        case 4:
            return 'linear-gradient( rgba(128, 183, 75, 1), rgba(128, 183, 75, 1),rgba(128, 183, 75, 1))';
        case 5:
            return 'linear-gradient( rgba(128, 183, 75, 1), rgba(128, 183, 75, 1),rgba(128, 183, 75, 1))';
        case 6:
            return 'linear-gradient(rgb(123, 230, 179), rgb(55, 191, 127), rgb(43, 206, 129))';
        case 7:
            return 'linear-gradient( rgba(0, 178, 93, 1), rgba(0, 178, 93, 1), rgba(0, 178, 93, 1))'

    }
}


const styles = {
    active: {
        top: '10%',
        backgroundImage: props => getConnector(props.index),

    },

    completed: {
        backgroundImage: props => getConnector(props.index),
    },
    root: {
        width: 'auto',
        top: '12%',
        // maxWidth: 50,
        border: 'none',
        height: 5,
        backgroundColor: '#eaeaf0',
        borderRadius: 35,
        // marginLeft: '-64px'
        // marginLeft: '-64px'
    },


};
const CustomConnector = withStyles(styles)(StepConnector);

function StepIcon(props) {
    const {active, completed, icon} = props;
    const classes = useColorlibStepIconStyles(icon);

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

const useColorlibStepIconStyles = makeStyles({
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
    },
    active: {
        backgroundImage: props => getIcon(props),
        // backgroundImage:
        //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage: props => getIcon(props),
        // 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 15,
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
}));


export default function CustomizedSteppers(props) {
    const {status} = props;
    const classes = useStyles();

    function getSteps() {
        return ['Pending', 'Enroute', 'Delivered', 'Collected', 'Complete'];
    }

    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        status === 0 ?
            setActiveStep(0) : status === 1 ?
            setActiveStep(0) : status === 2 ?
                setActiveStep(1) : status === 3 ?
                    setActiveStep(4) : status === 4 ?
                        setActiveStep(2) : status === 7 ?
                            setActiveStep(3) : status === 8 ?
                                setActiveStep(3) : setActiveStep(0);
    }, [status]);
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
                return '#80B74B';
            case 4:
                return '#80B74B';
            case 5:
                return '#80B74B';
            case 6:
                return '#00B25D'
        }

    };
    /*const getLabelComponent = (index, activeStep, label) => {
      console.log({ label, statusLabel})
      if (index <= activeStep && label===statusIndex)
        return (
          <Paper className='paper-container1' style={{
            backgroundColor: getLabelBoxColor(index, activeStep),
            borderColor: `${getLabelBoxColor(index, activeStep)} transparent`
          }}
                 elevation={3}>
            <Typography className='label-text1 '> {label}</Typography>
          </Paper>
        );
      else return (
        <p className='disbale-label-text ' style={{visibility:'hidden',fontSize:4,height:5}}> {label}</p>
      )
    };*/
    const getLabelComponent = (index, activeStep, label) => {
        if (index <= activeStep)
            return (
                <Paper className='paper-container1' style={{
                    backgroundColor: getLabelBoxColor(index, activeStep),
                    borderColor: `${getLabelBoxColor(index, activeStep)} transparent`
                }}
                       elevation={3}>
                    <Typography className='label-text1 '> {label}</Typography>
                </Paper>
            );
        else return (
            <Typography className='disbale-label-text'> {label}</Typography>
        )
    };
    return (
        <div className={[classes.root, 'smart-status-container']}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<CustomConnector/>} className='custom-stepper'
                     style={{padding: 0}}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={StepIcon} className='smart-job-status-label'>
                            {getLabelComponent(index, activeStep, label)}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/*<div>*/}
            {/*  {activeStep === steps.length ? (*/}
            {/*    <div>*/}
            {/*      dafdf*/}
            {/*    </div>*/}
            {/*  ) : (*/}
            {/*    <div>*/}
            {/*      <div>*/}
            {/*        <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>*/}
            {/*          Back*/}
            {/*        </Button>*/}
            {/*        <Button*/}
            {/*          variant="contained"*/}
            {/*          color="primary"*/}
            {/*          onClick={handleNext}*/}
            {/*          className={classes.button}*/}
            {/*        >*/}
            {/*          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}*/}
            {/*        </Button>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
        </div>
    );
}
