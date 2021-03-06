import React, { useState } from 'react';
import {
    FormControl,
    Button,
    TextField,
    makeStyles,
    Select,
    OutlinedInput
} from '@material-ui/core';
import Table from '../Others/TableComponent';
import RenderQuestion from '../RenderQuestions/RenderQuestion';
const uuidv1 = require('uuid/v1');

function QuestionTemplate(props) {
    const [state, setState] = useState({
        question: '',
        questionTypeHandler: 'TextField',

    })
    const [stateQ] = useState({
        questions: []
    });
    const [stateRender, setStateRender] = useState({
        addQuestionJSX: ''
    });
    const [stateOpt, setStateOpt] = useState({
        questionTypeValueHandler: ['']
    })

    const useStyles = makeStyles(theme => ({
        button: {
            margin: theme.spacing(1),
        },
        input: {
            display: 'none',
        },
    }));

    const classes = useStyles();
    let formSubmit = async (event) => {
        stateQ.questions.push({
            question: state.question,
            questionTypeHandler: state.questionTypeHandler,
            questionTypeValueHandler: stateOpt.questionTypeValueHandler
        });
        const questionTypeValue = (stateOpt.questionTypeValueHandler && stateOpt.questionTypeValueHandler.length) > 0 ? JSON.stringify(stateOpt.questionTypeValueHandler) : JSON.stringify([]);
        await props.contract.methods.createQuestion(uuidv1(), state.question, state.questionTypeHandler, questionTypeValue).send({ from: props.accountFrom }, (err, data) => {
            console.log("createQuestion--->data", data);
            console.log("createQuestion-->err", err);
        });

        setState({
            question: '',
            questionTypeHandler: 'TextField',

        })
        state.questionTypeHandler = 'TextField'
        stateOpt.questionTypeValueHandler = ['']
        questionTypeJSX();
    }
    let questionHandler = (event) => {
        state.question = event.target.value;
        setState({
            question: state.question,
            questionTypeHandler: state.questionTypeHandler,

        })
    }
    let questionTypeHandler = (event) => {
        state.questionTypeHandler = event.target.value;
        questionTypeJSX();
    }
    let questionTypeValueHandler = (event, index) => {
        let temp = stateOpt.questionTypeValueHandler;
        temp[index] = event.target.value;
        setStateOpt({
            questionTypeValueHandler: temp
        });
    }
    let addButtonHandler = (event, index) => {
        let temp = Object.assign(stateOpt.questionTypeValueHandler);
        // temp.splice(index, 0, '');
        temp.push('')
        setStateOpt({
            questionTypeValueHandler: temp
        });
        questionTypeJSX();
    }
    let deleteButton = (event, index) => {
        let temp = Object.assign(stateOpt.questionTypeValueHandler);
        if (temp.length > 1)
            temp.splice(index, 1);
        else
            alert("Value rows can't be empty!");
        questionTypeJSX();
        setStateOpt({
            questionTypeValueHandler: temp
        });
    }
    let questionTypeJSX = () => {
        let temp;
        if (state.questionTypeHandler === 'TextField') {
            temp = <div></div>
        } else {
            temp = <Table value={stateOpt.questionTypeValueHandler} inputFieldHandler={questionTypeValueHandler} addButtonHandler={addButtonHandler} deleteButton={deleteButton}></Table>
        }
        setStateRender({
            addQuestionJSX: temp
        });
    }

    return (
        <div>
            <FormControl fullWidth style={{ padding: "20px" }}>
                <TextField
                    id="outlined-full-width"
                    label="Question:"
                    style={{ padding: "10px" }}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    value={state.question}
                    onChange={questionHandler}
                />
                <Select
                    native
                    style={{ margin: " 10px" }}
                    value={state.questionTypeHandler}
                    placeholder="QuestionType"
                    onChange={questionTypeHandler}
                    input={<OutlinedInput name="age" id="filled-age-native-simple" />}
                >
                    <option value={'TextField'}>TextField</option>
                    <option value={'Radio'}>Radio</option>
                    <option value={'DropDown'}>DropDown</option>
                    <option value={'checkBox'}>checkBox</option>
                </Select>

                {stateRender.addQuestionJSX}
                <Button variant="contained" color="primary" className={classes.button} onClick={formSubmit}>
                    Add Question
                </Button>

            </FormControl>

            {[...props.questions].length > 0 ? <h3>Preview</h3> : ""}

            {[...props.questions].reverse().map((value, index) =>
                <RenderQuestion question={value.question}
                    questionType={value.questionTypeHandler}
                    questionTypeValue={value.questionTypeValueHandler}
                    index={props.questions.length - (index + 1)}
                    textField={(event) => { }}
                    checkBoxHandler={(event) => { }}
                ></RenderQuestion>
            )}
        </div >
    )
}

export default QuestionTemplate;