import {makeStyles} from '@material-ui/core';

export const customDataGridStyles = makeStyles((theme) => ({
    dataGridPointer: {
        cursor: 'pointer',
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