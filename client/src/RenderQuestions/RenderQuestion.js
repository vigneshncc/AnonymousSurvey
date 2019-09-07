import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles(theme => ({
    root: {
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing(1, 2),
    },
}));

const useStyles1 = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function RenderQuestion(props) {
    const classes = useStyles();
    const classes1 = useStyles1();

    let questionTypeJSX;
    if (props.questionType == 'TextField') {
        questionTypeJSX = <div>
            <TextField
                id="standard-full-width"
                label="Enter the answer"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                helperText=""
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </div>
    } else if (props.questionType == 'DropDown') {
        questionTypeJSX =
            <div>
                <Select
                    //value={values.age}
                    //onChange={handleChange}
                    // input={<OutlinedInput labelWidth={labelWidth} name="age" id="outlined-age-simple" />}
                    placeholder="Select"
                >
                    {props.questionTypeValue.map((value, index) => (
                        <option value={value}>{value}</option>
                    ))}
                </Select>
            </div>
    } else if (props.questionType == 'Radio') {
        questionTypeJSX = <div>
            <RadioGroup
                aria-label="gender"
                name="gender2"
            // className={classes.group}
            // value={value}
            // onChange={handleChange}
            >
                {props.questionTypeValue.map((value, index) => (
                    <FormControlLabel
                        value={value}
                        control={<Radio color="primary" />}
                        label={value}
                        labelPlacement="start"
                    />
                ))}
            </RadioGroup>
        </div>
    } else {
        questionTypeJSX = <div>
            <FormGroup row>

            </FormGroup>
            {props.questionTypeValue.map((value, index) => (
                <FormControlLabel
                    control={
                        <Checkbox value={value} />
                    }
                    label={value}
                />
            ))}
        </div>
    }
    return (
        <div>
            <div className={classes.root}>
                <Paper elevation={0} className={classes.paper}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="textPrimary">{props.index + 1 + '.' + props.question}</Typography>
                    </Breadcrumbs>
                </Paper>
                {questionTypeJSX}
                <br />
            </div>
        </div>
    )
}
export default RenderQuestion;