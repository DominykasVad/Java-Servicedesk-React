import {AppBar, Avatar, Button, ButtonGroup, CssBaseline, Toolbar, Typography} from '@material-ui/core';
import {headerStyles} from './headerStyles';
import {useHistory} from 'react-router';
import LangSwitcher from './LangSwitcher';
import {useTranslation} from 'react-i18next';
import useUser from '../../hooks/useUser';
import _ from 'lodash';
import {removeJwt, removeUserData} from '../../store/slices/userSlice';
import {useDispatch} from 'react-redux';

const Header = () => {
    const history = useHistory();
    const {t} = useTranslation();
    const user = useUser();

    const dispatch = useDispatch();

    const classes = headerStyles();

    const authorized = (role) => {
        return !!_.intersection(user.roles.map(x => x.roleName), Array.of(role)).length;
    };

    const handleHomeButtonClick = () => {
        history.push('/');
    };
    const handleSrButtonClick = () => {
        history.push('/service-request/');
    };
    const handleCiButtonClick = () => {
        history.push('/configuration-item/');
    };
    const handleUserButtonClick = () => {
        history.push('/users/');
    };
    const handleNewServiceRequestButtonClick = () => {
        history.push('/new-service-request/');
    };
    const handleNewUserButtonClick = () => {
        history.push('/new-user/');
    };
    const handleLogout = () => {
        dispatch(removeJwt());
        dispatch(removeUserData());
    };

    return (
        <>
            <CssBaseline/>
            <AppBar position='relative'>
                <Toolbar>
                    <Typography variant='h6' className={classes.title} color='inherit' noWrap>
                        {t('title')}
                    </Typography>
                    <ButtonGroup variant='text' color='inherit' className={classes.btnGroup}>
                        <LangSwitcher/>
                        {!!user ? (
                            <>
                                <Button color={'inherit'}
                                        onClick={handleHomeButtonClick}>{t('buttons.dashboard')}</Button>
                                <Button color={'inherit'}
                                        onClick={handleSrButtonClick}>{t('buttons.serviceRequests')}</Button>
                                <Button color={'inherit'}
                                        onClick={handleCiButtonClick}>{t('buttons.configurationItems')}</Button>
                                <Button color={'inherit'} onClick={handleUserButtonClick}>{t('buttons.users')}</Button>
                                <Button color={'inherit'}
                                        onClick={handleNewServiceRequestButtonClick}>{t('labels.newServiceRequest')}</Button>
                            </>
                        ) : ('')}
                        {authorized('ADMIN') ? (
                            <Button color={'inherit'} onClick={handleNewUserButtonClick}>{t('labels.newUser')}</Button>
                        ) : ('')}
                    </ButtonGroup>
                    {!!user ? (
                        <>
                            <Avatar variant={'square'} className={classes.avatar}>
                                {_.toUpper(user.username.charAt(0))}
                            </Avatar>
                            <Button variant={'text'} color={'inherit'} onClick={handleLogout}>
                                {t('buttons.logout')}
                            </Button>
                        </>
                    ) : ('')}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
