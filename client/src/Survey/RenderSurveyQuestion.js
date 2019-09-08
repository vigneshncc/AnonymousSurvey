import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RenderQuestion from '../RenderQuestions/RenderQuestion';
const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));
function RenderSurveyQuestion(props) {
    const classes = useStyles();
    let answerArray = [];
    let textField = (event, index) => {
        answerArray[index] = {
            value: event.target.value
        }
    }

    let checkBox = (event, index) => {
        let temp = answerArray[index] && answerArray[index].value;
        if (!temp) {
            temp = [];
        }
        if (event.target.checked) {
            temp.push(event.target.value);
        } else {
            temp = temp.filter((value) => {
                if (value !== event.target.value) {
                    return true;
                }
            })
        }
        answerArray[index] = {
            value: temp
        }
    }
    let submit = (event) => {
        alert('');
    }
    return (<div>
        {/* {currentQuestionJSX}
        <button onClick={nextQuestion}>next</button> */}
        {[...props.questions].map((value, index) =>
            <RenderQuestion question={value.question}
                questionType={value.questionTypeHandler}
                questionTypeValue={value.questionTypeValueHandler}
                index={index}
                textField={textField}
                checkBoxHandler={checkBox}
            ></RenderQuestion>
        )}
        <Button color="primary" className={classes.button} onClick={submit}>
            Submit
      </Button>
    </div>)
}
export default RenderSurveyQuestion;