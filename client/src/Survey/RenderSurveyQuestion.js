import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RenderQuestion from '../RenderQuestions/RenderQuestion';
const uuidv1 = require('uuid/v1');
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
    let textField = (event, index, questionID) => {
        answerArray[index] = {
            questionID: questionID,
            value: event.target.value
        }
    }

    let checkBox = (event, index, questionID) => {
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
        temp = JSON.stringify(temp);
        answerArray[index] = {
            questionID: questionID,
            value: temp
        }
    }
    let submit = async (event) => {
        await props.contract.methods.submitSurvey(answerArray[0].questionID, uuidv1(), answerArray[0].value).send({ from: props.accountFrom }, (err, data) => {
            console.log("data", data);
            console.log("err", err);
        });
    }
    return (<div>
        {/* {currentQuestionJSX}
        <button onClick={nextQuestion}>next</button> */}
        {[...props.questions].map((value, index) =>
            <RenderQuestion questionID={value.questionID}
                question={value.question}
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