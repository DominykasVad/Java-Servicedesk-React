import {makeStyles} from '@material-ui/core';
import {deepOrange} from '@material-ui/core/colors';

export const headerStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    btnGroup: {
        flexDirection: 'row',
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[700]),
        backgroundColor: deepOrange[700],
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(1),
    },
}));