import {makeStyles} from '@material-ui/core';

export const contentStyles = makeStyles((theme) => ({
    main: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        minHeight: '100vh',
    },
}));

export default contentStyles;