import {serviceRequestStyles} from '../serviceRequestStyles';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router';
import {Button, ButtonGroup, FormControl, Grid, InputLabel, LinearProgress, MenuItem} from '@material-ui/core';
import {Select, TextField} from 'formik-material-ui';
import {useSnackbar} from 'notistack';
import PropsState from '../../../components/PropsState';
import {useTranslation} from 'react-i18next';
import {addServiceRequest} from '../../../api/serviceRequestApi';

const validationSchema = Yup.object().shape({
    summary: Yup.string().required,
    description: Yup.string.required,
    ownerUsername: Yup.string.notRequired,
    reportedBy: Yup.string.notRequired,
    serviceRequestStatusId: Yup.number.required,
});

const NewServiceRequestForm = () => {
    const classes = serviceRequestStyles();

    const {t} = useTranslation();

    const history = useHistory();

    const {enqueueSnackbar} = useSnackbar();

    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        addServiceRequest(formValues)
            .then(response => {
                history.push(`/service-request/${response.data.id}`);
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
                summary: '',
                description: '',
                serviceRequestStatusId: 1,
            }}

            // FIXME: Unhandled Rejection (TypeError): field.resolve is not a function
            // validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
        >
            {(props) => (
                <>
                    <PropsState object={props}/>
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
                                        <Button disabled={true}>{t('buttons.startWork')}</Button>
                                        <Button disabled={true}>{t('buttons.resolve')}</Button>
                                        <Button disabled={true}>{t('buttons.takeOwnership')}</Button>
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth={true} disabled={props.isSubmitting}>
                                        <Field
                                            component={TextField}
                                            variant={'outlined'}
                                            name={'summary'}
                                            label={t('labels.summary')}
                                            placeholder={t('labels.summary')}
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
                                               disabled
                                               variant={'outlined'}
                                               name={'ownerUsername'}
                                               label={t('labels.owner')}
                                               placeholder={t('labels.owner')}
                                               InputLabelProps={{shrink: true}}
                                               InputProps={{readOnly: true}}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
                                               variant={'outlined'}
                                               disabled
                                               name={'reportedByUsername'}
                                               label={t('labels.reportedBy')}
                                               placeholder={t('labels.reportedBy')}
                                               InputLabelProps={{shrink: true,}}
                                               InputProps={{readOnly: true}}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
                                               variant={'outlined'}
                                               name={'description'}
                                               label={t('labels.description')}
                                               placeholder={t('labels.description')}
                                               multiline
                                               rows={'8'}
                                               InputLabelProps={{shrink: true}}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl>
                                        <Field component={TextField}
                                               variant={'outlined'}
                                               name={'organizationalUnitName'}
                                               disabled
                                               label={t('labels.organizationalUnit')}
                                               placeholder={t('labels.organizationalUnit')}
                                               InputLabelProps={{shrink: true}}
                                               InputProps={{readOnly: true}}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <InputLabel htmlFor={'status'}>{t('labels.status')}</InputLabel>
                                        <Field
                                            component={Select}
                                            name={'serviceRequestStatusId'}
                                            id={'status'}
                                            disable={true}
                                            // TODO: Set default to Registered
                                        >
                                            {/*TODO: Get MenuItems from backend*/}
                                            <MenuItem value={1}>{t('labels.registered')}</MenuItem>
                                            <MenuItem value={2}>{t('labels.started')}</MenuItem>
                                            <MenuItem value={3}>{t('labels.closed')}</MenuItem>
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

export default NewServiceRequestForm;