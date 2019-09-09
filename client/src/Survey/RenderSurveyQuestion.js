import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import RenderQuestion from '../RenderQuestions/RenderQuestion';
import Others from '../Others/ButtonAppBar';
import Typography from '@material-ui/core/Typography';
const uuidv1 = require('uuid/v1');
const ethers = require('ethers');
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
        if (typeof temp == 'string') {
            temp = JSON.parse(temp);
        }
        if (event.target.checked) {
            temp.push(event.target.value);
        } else {
            temp = temp.filter((value) => {
                if (value !== event.target.value) {
                    return true;
                } else {
                    return false;
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

        const surveyID = uuidv1();
        let questIds = [], answers = [];
        answerArray.forEach(ans => {
            let hexQuestionID = ethers.utils.toUtf8Bytes(ans.questionID);
            let hexAnswer = ethers.utils.toUtf8Bytes(ans.value);
            questIds.push(hexQuestionID);
            answers.push(hexAnswer);
        });
        await props.contract.methods.submitSurvey(surveyID, questIds, answers).send({ from: props.accountFrom }, (err, data) => {
            console.log("submitSurvey-->data", data);
            console.log("submitSurvey-->err", err);
        });
    }

    if ([...props.questions].length > 0) {

        return (<div>

            <Others></Others>
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
    } else {
        return (<div>
            <Others></Others>
            <br />
            <Typography variant="h6" className={classes.title}>
                No survey data found.
            </Typography>
        </div>)
    }
}
export default RenderSurveyQuestion;