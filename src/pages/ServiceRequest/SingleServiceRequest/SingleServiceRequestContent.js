import {serviceRequestStyles} from '../serviceRequestStyles';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router';
import {Button, ButtonGroup, FormControl, Grid, InputLabel, LinearProgress, MenuItem} from '@material-ui/core';
import {Select, TextField} from 'formik-material-ui';
import {useSnackbar} from 'notistack';
import useUser from '../../../hooks/useUser';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';
import {updateServiceRequest} from '../../../api/serviceRequestApi';

const validationSchema = Yup.object().shape({
    summary: Yup.string().required,
    description: Yup.string.required,
});

const SingleServiceRequestContent = ({
                                         serviceRequestData,
                                         handleStartWork,
                                         handleResolveRequest,
                                         handleCloseRequest,
                                         handleDeleteRequest,
                                         handleTakeOwnership,
                                     }) => {
    const classes = serviceRequestStyles();

    const history = useHistory();

    const user = useUser();

    const {enqueueSnackbar} = useSnackbar();

    const {t} = useTranslation();

    const authorized = (role) => {
        if (!_.isNil(user)) {
            return !!_.intersection(user.roles.map(x => x.roleName), Array.of(role)).length;
        }
    };


    const handleOnSubmit = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        updateServiceRequest(formValues)
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
            initialValues={serviceRequestData}
            enableReinitialize={true}
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
                                    <ButtonGroup disabled={props.isSubmitting} variant='outlined' color='primary'>
                                        <Button variant={'contained'} type="submit">{t('buttons.save')}</Button>
                                        <Button onClick={handleStartWork}>{t('buttons.startWork')}</Button>
                                        <Button onClick={handleResolveRequest}>{t('buttons.resolve')}</Button>
                                        <Button onClick={handleTakeOwnership}>{t('buttons.takeOwnership')}</Button>
                                        <Button color={'secondary'}
                                                onClick={handleCloseRequest}>{t('buttons.close')}</Button>
                                        {authorized('ADMIN') ? (
                                            <Button color={'secondary'}
                                                    onClick={handleDeleteRequest}>{t('buttons.delete')}</Button>
                                        ) : (<Button disabled>{t('buttons.delete')}</Button>)}
                                    </ButtonGroup>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControl fullWidth={true} disabled={props.isSubmitting}>
                                        <Field
                                            component={TextField}
                                            variant={'outlined'}
                                            name={'summary'}
                                            label={t('labelssummary')}
                                            placeholder={t('labels.summary')}
                                            InputLabelProps={{shrink: true}}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={3}>
                                    <FormControl fullWidth={true}>
                                        <Field component={TextField}
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
                                               label={'labels.organizationalUnit'}
                                               placeholder={'labels.organizationalUnit'}
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
                                        >
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

export default SingleServiceRequestContent;