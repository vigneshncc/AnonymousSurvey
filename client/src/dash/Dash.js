import React from "react";
import RenderChart from './RenderChart';
import RenderTable from './RenderTable';
function Dash(props) {
  let demo = [
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Red"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Red"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Red"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Red"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Red"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Blue"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Blue"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "Radio",
      "question": "What is your favorite color?",
      "answer": "Blue"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "C",
      "question": "What is your favorite color?",
      "answer": "[1,2,4]"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "C",
      "question": "What is your favorite color?",
      "answer": "[1]"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "C",
      "question": "What is your favorite color?",
      "answer": "[1,2]"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "C",
      "question": "What is your favorite color?",
      "answer": "[1,2,3]"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "T",
      "question": "What is your favorite color?",
      "answer": "[1,2,4]"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "T",
      "question": "What is your favorite color?",
      "answer": "definedtlye not blue"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "T",
      "question": "What is your favorite color?",
      "answer": "efinedtlye not blue dsgf45"
    },
    {
      "questionID": "dea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "T",
      "question": "What is your favorite color?",
      "answer": "efinedtlye not blue 43098fdlkj435"
    },
    {
      "questionID": "ea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "T",
      "question": "What is you color?",
      "answer": "definedtlye not blue definedtlye not blue definedtlye not blue definedtlye not blue definedtlye not blue"
    },
    {
      "questionID": "ea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "26c5d3f0-d24b-11e9-8a3e-555bfad0a768",
      "type": "T",
      "question": "What is you color?",
      "answer": "definedtlye not blue definedtlye not blue definedtlye not blue definedtlye not blue definedtlye not blue"
    },
    {
      "questionID": "ea4b5a0-d24a-11e9-b239-314ffe1d4638",
      "surveyID": "639c0420-d24b-11e9-9cfb-8d88c394754f",
      "type": "T",
      "question": "What is you color?",
      "answer": "definedtlye not blue definedtlye not blue definedtlye not blue definedtlye not blue definedtlye not blue"
    }
  ];
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
      if (value.type == 'T') {
        if (textQuestionID.indexOf(value.questionID) == -1) {
          textQuestionID.push(value.questionID);
          textQuestion.push(value.question);
          textQuestionAnswer.push([value.answer]);
        } else {
          textQuestionAnswer[textQuestionID.indexOf(value.questionID)].push(value.answer);
        }
      } else if (value.type == 'D' || value.type == 'Radio') {
        if (questionID.indexOf(value.questionID) == -1) {
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
      } else if (value.type = 'C') {
        if (checkQuestionID.indexOf(value.questionID) == -1) {
          checkQuestionID.push(value.questionID);
          checkQuestion.push(value.question);
          let answerJSON = {};
          let answerArray = JSON.parse(value.answer);
          answerArray.forEach((value, index) => {
            answerJSON[value] = 1;
          })
          checkQuestionAnswer.push({ ...answerJSON });
        } else {
          let answerJSON = checkQuestionAnswer[questionID.indexOf(value.questionID)]
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
    })
  }
  formDashboard();
  let templateRD;
  let templateC;
  let templateTable;
  let constructChartJSX = () => {
    templateRD = question.map((value, index) => {
      return (<RenderChart question={value} data={answer[index]}>
      </RenderChart>)
    })
    templateC = checkQuestion.map((value, index) => {
      return (<RenderChart question={value} data={checkQuestionAnswer[index]}>
      </RenderChart>)
    })
    templateTable = textQuestion.map((value, index) => {
      return (
        <RenderTable question={value} answers={textQuestionAnswer[index]} index={index + 1}></RenderTable>
      )
    })
  }
  constructChartJSX()
  return (
    <div>
      {templateRD}
      {templateC}
      {templateTable}
    </div>
  );
}

export default Dash;
