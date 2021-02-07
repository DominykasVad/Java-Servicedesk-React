import {Field, Form, Formik} from 'formik';
import {useHistory} from 'react-router';
import {Button, ButtonGroup, FormControl, Grid, InputLabel, LinearProgress, MenuItem} from '@material-ui/core';
import {Select, TextField} from 'formik-material-ui';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';
import {userStyles} from '../userStyles';
import {addUser} from '../../../api/usersApi';

const NewUserForm = () => {
    const classes = userStyles();

    const {t} = useTranslation();

    const history = useHistory();

    const {enqueueSnackbar} = useSnackbar();

    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        addUser(formValues)
            .then(response => {
                history.push('/');
            })
            .catch(() => {
                enqueueSnackbar('Failed to send data', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                });
            })
            .finally(() => {
                formikHelpers.setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
                name: '',
                surname: '',
                email: '',
                phone: '+370475628827',
                role: 2,
            }}

            // FIXME: Unhandled Rejection (TypeError): field.resolve is not a function
            // validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
        >
            {(props) => (
                <>
                    {/*<PropsState object={props}/>*/}
                    <Form>
                        <div className={classes.formRoot}>
                            <Grid
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="flex-start"
                                spacing={4}
                            >
                                <Grid item xs={12}>
                                    <LinearProgress hidden={!props.isSubmitting} style={{marginBottom: '1%'}}/>
                                    <ButtonGroup variant='outlined' color='primary'>
                                        <Button disabled={props.isSubmitting} variant={'contained'}
                                                type="submit">{t('buttons.save')}</Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true} disabled={props.isSubmitting}>
                                        <Field
                                            component={TextField}
                                            variant={'outlined'}
                                            name={'username'}
                                            label={t('username')}
                                            placeholder={t('username')}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
                                               variant={'outlined'}
                                               name={'password'}
                                               type={'password'}
                                               label={t('password')}
                                               placeholder={t('password')}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
                                               variant={'outlined'}
                                               name={'name'}
                                               label={t('labels.name')}
                                               placeholder={t('labels.name')}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
                                               variant={'outlined'}
                                               name={'surname'}
                                               label={t('labels.surname')}
                                               placeholder={t('labels.surname')}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
                                               variant={'outlined'}
                                               name={'email'}
                                               label={t('labels.email')}
                                               placeholder={t('labels.email')}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <InputLabel htmlFor={'role'}>{t('labels.role')}</InputLabel>
                                        <Field
                                            component={Select}
                                            name={'role'}
                                            id={'role'}
                                            disable={true}
                                            // TODO: Set default to Registered
                                        >
                                            {/*TODO: Get MenuItems from backend*/}
                                            <MenuItem value={1}>ADMIN</MenuItem>
                                            <MenuItem value={2}>USER</MenuItem>
                                            <MenuItem value={3}>MANAGER</MenuItem>
                                            <MenuItem value={4}>HELP DESK</MenuItem>
                                            <MenuItem value={5}>ENGINEER</MenuItem>
                                        </Field>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </div>
                    </Form>
                </>
            )}
        </Formik>
    );
};

export default NewUserForm;