import React from "react";
import DashboardStepper from "./DashboardStepper";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));
function Dash(props) {
  const classes = useStyles();
  let demo = props.surveyResults;
  let question = [];
  let questionID = [];
  let answer = [];
  let textQuestionID = [];
  let textQuestion = [];
  let textQuestionAnswer = [];
  let checkQuestionID = [];
  let checkQuestion = [];
  let checkQuestionAnswer = [];
  let formDashboard = () => {
    demo.forEach((value, index) => {
      if (value.type === 'TextField') {
        if (textQuestionID.indexOf(value.questionID) === -1) {
          textQuestionID.push(value.questionID);
          textQuestion.push(value.question);
          textQuestionAnswer.push([value.answer]);
        } else {
          textQuestionAnswer[textQuestionID.indexOf(value.questionID)].push(value.answer);
        }
      } else if (value.type === 'DropDown' || value.type === 'Radio') {
        if (questionID.indexOf(value.questionID) === -1) {
          questionID.push(value.questionID);
          question.push(value.question);
          let answerJSON = {};
          answerJSON[value.answer] = 1;
          answer.push({ ...answerJSON });
        } else {
          let answerJSON = answer[questionID.indexOf(value.questionID)]
          if (answerJSON[value.answer]) {
            answerJSON[value.answer] = answerJSON[value.answer] + 1;
          } else {
            answerJSON[value.answer] = 1;
          }
          answer[questionID.indexOf(value.questionID)] = answerJSON;
        }
      } else if (value.type === 'checkBox') {
        if (checkQuestionID.indexOf(value.questionID) === -1) {
          checkQuestionID.push(value.questionID);
          checkQuestion.push(value.question);
          let answerJSON = {};
          let answerArray = JSON.parse(value.answer);
          answerArray.forEach((value, index) => {
            answerJSON[value] = 1;
          })
          checkQuestionAnswer.push({ ...answerJSON });
        } else {
          let answerJSON = checkQuestionAnswer[questionID.indexOf(value.questionID)];
          if (answerJSON) {
            let answerArray = JSON.parse(value.answer);
            answerArray.forEach((value, index) => {
              if (answerJSON[value]) {
                answerJSON[value] = answerJSON[value] + 1;
              } else {
                answerJSON[value] = 1;
              }

            })
            checkQuestionAnswer[checkQuestionID.indexOf(value.questionID)] = answerJSON;
          }
        }
      }
    })
  }
  formDashboard();
  // let templateRD;
  // let templateC;
  // let templateTable;
  // let constructChartJSX = () => {
  //   templateRD = question.map((value, index) => {
  //     return (<RenderChart question={value} data={answer[index]} type="RD">
  //     </RenderChart>)
  //   })
  //   templateC = checkQuestion.map((value, index) => {
  //     return (<RenderChart question={value} data={checkQuestionAnswer[index]} type="checkBox">
  //     </RenderChart>)
  //   })
  //   templateTable = textQuestion.map((value, index) => {
  //     return (
  //       <RenderTable question={value} answers={textQuestionAnswer[index]} index={index + 1}></RenderTable>
  //     )
  //   })
  // }
  // constructChartJSX()
  if (demo.length > 0) {

    return (
      <DashboardStepper question={question} checkQuestion={checkQuestion} checkQuestionAnswer={checkQuestionAnswer} textQuestionAnswer={textQuestionAnswer} textQuestion={textQuestion} answer={answer}></DashboardStepper>
    );
  } else {
    return (<div>
      <br />
      <Typography variant="h6" className={classes.title}>
        No survey data found.
        </Typography>
    </div>)
  }
}

export default Dash;
