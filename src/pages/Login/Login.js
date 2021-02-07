import {Field, Form, Formik} from 'formik';
import {login} from '../../api/usersApi';
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {setJwt, setUserData} from '../../store/slices/userSlice';
import loginStyles from './loginStyles';
import {Avatar, Button, Container, FormControl, Paper, Typography} from '@material-ui/core';
import {LockOutlined} from '@material-ui/icons';
import {TextField} from 'formik-material-ui';
import * as Yup from 'yup';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';

const Login = () => {

    const history = useHistory();
    const location = useLocation();

    const {t} = useTranslation();

    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const classes = loginStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Please Enter your Username'),
        password: Yup.string().required('Please Enter your Password'),
    });

    const handleLogin = (loginData, {setSubmitting}) => {
        setSubmitting(true);

        login(loginData)
            .then(({data, headers: {authorization}}) => {
                dispatch(setUserData(data));
                dispatch(setJwt(authorization));

                const {from} = location.state || {
                    from: {
                        pathname: '/'
                    }
                };
                history.push(from);
            })
            .catch(() => {
                enqueueSnackbar(t('main.loginFailed'), {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
            })
            .finally(() => setSubmitting(false));
    };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
        >
            {(props) => (
                <>
                    <Container maxWidth="xs">
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlined/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                {t('main.loginTitle')}
                            </Typography>
                            <Form className={classes.form}>
                                <FormControl fullWidth={true}>
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        id="username"
                                        label={t('main.username')}
                                        name="username"
                                        autoFocus
                                    />
                                    <Field
                                        component={TextField}
                                        variant="outlined"
                                        margin="normal"
                                        name="password"
                                        label={t('main.password')}
                                        type="password"
                                        id="password"
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    {t('main.signIn')}
                                </Button>
                            </Form>
                        </Paper>
                    </Container>
                </>
            )}
        </Formik>
    );
};

export default Login;