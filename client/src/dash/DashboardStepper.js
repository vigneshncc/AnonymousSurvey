import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import RenderChart from './RenderChart';
import RenderTable from './RenderTable';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 100,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));

export default function DashboardStepper(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = props.question.length + props.checkQuestion.length + props.textQuestion.length;

    function handleNext() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    function handleBack() {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    }

    return (
        <div className={classes.root}>
            {/* <Paper square elevation={0} className={classes.header}>
        <Typography>{tutorialSteps[activeStep].label}</Typography>
      </Paper>  */}
            {props.question.forEach((value, index) => {
                if (activeStep === index)
                    return (<RenderChart question={value} data={props.answer[index]} type="RD">
                    </RenderChart>);
            })}
            {props.checkQuestion.forEach((value, index) => {
                if (activeStep === index + props.question.length)
                    return (<RenderChart question={value} data={props.checkQuestionAnswer[index]} type="checkBox">
                    </RenderChart>);
            })}
            {props.textQuestion.forEach((value, index) => {
                if (activeStep === index + props.question.length + props.checkQuestion.length)
                    return (<RenderTable question={value} answers={props.textQuestionAnswer[index]} index={index + 1}></RenderTable>)

            })}
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
          </Button>
                }
            />
        </div>
    );
}