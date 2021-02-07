import {Typography} from '@material-ui/core';
import {notFoundStyles} from './notFoundStyles';
import {useHistory} from 'react-router';
import {useTranslation} from 'react-i18next';

const NotFound = () => {
    const classes = notFoundStyles();
    const history = useHistory();
    const {t} = useTranslation();

    const handleLinkClick = () => {
        history.goBack();
    };

    return (
        <div className={classes.paper}>
            <div className={classes.backgroundRoot}>
                <Typography align={'center'} className={classes.label} variant={'h1'}>404</Typography>
                <Typography align={'center'} className={classes.label}
                            variant={'h2'}>{t('main.404NotFound')}</Typography>
                <Typography align={'center'} onClick={handleLinkClick} className={classes.link} variant={'h4'}>
                    {t('main.goBack')}
                </Typography>
            </div>
        </div>
    );
};

export default NotFound;
