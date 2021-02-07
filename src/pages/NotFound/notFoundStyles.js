import {makeStyles} from '@material-ui/core';

export const notFoundStyles = makeStyles((theme) => ({
    backgroundRoot: {
        padding: theme.spacing(5),
        backgroundColor: theme.palette.grey.A200,
    },
    paper: {
        marginTop: theme.spacing(20),
        marginBottom: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    label: {
        textTransform: 'upperCase',
        color: theme.palette.background.default,
        letterSpacing: '2px',
    },
    link: {
        marginTop: theme.spacing(2),
        textTransform: 'upperCase',
        color: theme.palette.background.default,
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));