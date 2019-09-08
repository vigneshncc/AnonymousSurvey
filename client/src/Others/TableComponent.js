import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import { loadCSS } from 'fg-loadcss';
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));
const useStyles1 = makeStyles(theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32,
    },
}));
const useStyles2 = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    dense: {
        marginTop: theme.spacing(2),
    },
    menu: {
        width: 200,
    },
}));
const useStyles3 = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    icon: {
        margin: theme.spacing(2),
    },
    iconHover: {
        margin: theme.spacing(2),
        '&:hover': {
            color: red[800],
        },
    },
}));
export default function SimpleTable(props) {
    const classes = useStyles();
    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();

    let rows = [];
    props.value.forEach((value, index) => {
        rows.push({ index, value })
    })
    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);
    const [stateOpt, setStateOpt] = useState({
        questionTypeValueHandler: props.value
    })
    let questionTypeValueHandler = (event, index) => {
        let temp = stateOpt.questionTypeValueHandler;
        temp[index] = event.target.value;
        setStateOpt({
            questionTypeValueHandler: temp
        });
        props.inputFieldHandler(event, index)
    }
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow >
                            <TableCell component="th" scope="row">
                                {row.index + 1}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <TextField
                                    id="standard-name"
                                    label="Value"
                                    className={classes2.textField}
                                    margin="normal"
                                    value={stateOpt.questionTypeValueHandler[index]}
                                    // onChange={(event) => props.inputFieldHandler(event, index)}
                                    onChange={(event) => { questionTypeValueHandler(event, index) }}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <DeleteIcon className={classes1.icon} onClick={(event) => props.deleteButton(event, index)} />
                            </TableCell>

                        </TableRow>
                    ))}
                    <TableCell component="th" scope="row">
                        <Icon onClick={(event) => props.addButtonHandler(event, 0)} className={clsx(classes3.icon, 'fa fa-plus-circle')} />
                    </TableCell>
                </TableBody>
            </Table>

        </Paper>
    );
}