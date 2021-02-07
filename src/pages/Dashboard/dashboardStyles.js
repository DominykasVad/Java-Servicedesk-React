import {makeStyles} from '@material-ui/core';

export const dashboardStyles = makeStyles((theme) => ({
    dataGridPointer: {
        cursor: 'pointer',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    gridWarningRoot: {
        flexDirection: 'column',
    },
    gridWarningLabel: {
        marginTop: theme.spacing(5),
    },
    gridWarningIcon: {
        width: 65,
        height: 65,
    },
}));