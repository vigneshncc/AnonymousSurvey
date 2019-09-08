import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { red } from '@material-ui/core/colors';
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
    props.answers.forEach((value, index) => {
        rows.push({ index, value })
    })
    React.useEffect(() => {
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, []);

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableRow>
                    {/* <TableCell component="th" scope="row">
                        {props.index + '.'}
                    </TableCell> */}
                    <TableCell component="th" scope="row">
                        <h3>Question:</h3>
                        <b>{props.question}</b>
                    </TableCell>
                </TableRow >
                <TableBody>
                    <h3>Answer:</h3>
                    {rows.map((row, index) => (
                        <TableRow >
                            <TableCell component="th" scope="row">
                                <b> {row.value}</b>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </Paper>
    );
}