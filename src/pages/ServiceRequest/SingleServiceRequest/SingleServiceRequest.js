import {serviceRequestStyles} from '../serviceRequestStyles';
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Container,
    Dialog,
    DialogContent,
    Grid,
    Paper,
    Tab,
    Tabs,
    Typography
} from '@material-ui/core';
import {useParams} from 'react-router';
import {useEffect, useRef, useState} from 'react';
import ServiceRequestCITable from './ServiceRequestCITable';
import SingleServiceRequestContent from './SingleServiceRequestContent';
import {ContentSkeletonLoader, TableSkeletonLoader} from './ContentSkeletonLoader';
import {useSnackbar} from 'notistack';
import {
    linkConfigurationItemToServiceRequest,
    removeServiceRequest,
    takeOwnership,
    unlinkConfigurationItemToServiceRequest
} from '../ApiRequests';
import {fetchSingleServiceRequest} from '../../../api/serviceRequestApi';
import _ from 'lodash';
import {useHistory} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

// Shitstorm
const SingleServiceRequest = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [serviceRequest, setServiceRequest] = useState({});
    const [tabValue, setTabValue] = useState(0);
    const [version, setVersion] = useState(0);
    const {enqueueSnackbar} = useSnackbar();
    const [open, setOpen] = useState(false);
    const selectionValues = useRef({});

    const {t} = useTranslation();

    const classes = serviceRequestStyles();

    const {id} = useParams();

    const handleStartWork = () => {
        console.log('Start work');
    };
    const handleCloseRequest = () => {
        console.log('Close request');
    };
    const handleResolveRequest = () => {
        console.log('Resolve request');
    };
    const handleDeleteRequest = () => {
        removeServiceRequest(id, enqueueSnackbar);
        history.push('/');
    };
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    const handleTakeOwnership = () => {
        takeOwnership(id, enqueueSnackbar);
    };

    const TabPanel = (props) => {
        const {children, value, index, ...other} = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                style={{width: '100%', height: '100%'}}
                id={`full-width-tabpanel-${index}`}
                aria-labelledby={`full-width-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <>
                        {children}
                    </>
                )}
            </div>
        );
    };

    const loadSingleServiceRequest = (sr, snackbar) => {
        setLoading(true);
        fetchSingleServiceRequest(sr)
            .then(response => {
                setServiceRequest(response.data);
            })
            .catch(() => {
                snackbar('Failed to get data', {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center',
                    },
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        loadSingleServiceRequest(id, enqueueSnackbar);
    }, [id, enqueueSnackbar]);

    const handleLinkCiTableClick = (param) => {
        const refresh = () => {
            setVersion(+1);
        };
        linkConfigurationItemToServiceRequest(serviceRequest.id, param.row.id, enqueueSnackbar);
        setOpen(false);
        setTimeout(refresh, 1500);

    };

    const currentlySelected = (param) => {
        selectionValues.current = param.rowIds[0];
    };

    const handleClickUnlink = () => {
        const refresh = () => {
            setVersion(+1);
        };
        if (_.isEmpty(selectionValues.current)) {
            enqueueSnackbar('Please select CI Item', {
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        } else {
            unlinkConfigurationItemToServiceRequest(serviceRequest.id, selectionValues.current, enqueueSnackbar);
            setTimeout(refresh, 1500);
        }
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper>
                        <Tabs value={tabValue} onChange={handleTabChange} centered>
                            <Tab label={t('labels.details')}/>
                            <Tab label={t('buttons.configurationItems')}/>
                        </Tabs>
                    </Paper>
                </Grid>
                <TabPanel value={tabValue} index={0}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <div style={{height: '100%', width: '100%'}}>
                                <Card>
                                    <CardHeader
                                        title={<Typography variant='h5'>{t('labels.serviceRequest')}: {id}</Typography>}
                                    />
                                    <CardContent>
                                        {loading ? (<ContentSkeletonLoader/>) :
                                            <SingleServiceRequestContent
                                                serviceRequestData={serviceRequest}
                                                handleStartWork={handleStartWork}
                                                handleCloseRequest={handleCloseRequest}
                                                handleResolveRequest={handleResolveRequest}
                                                handleDeleteRequest={handleDeleteRequest}
                                                handleTakeOwnership={handleTakeOwnership}
                                            />}
                                    </CardContent>
                                </Card>
                            </div>
                        </Paper>
                    </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <ButtonGroup style={{marginBottom: '1%'}}>
                                <Button onClick={handleClickOpen}>{t('buttons.linkCi')}</Button>
                                <Button onClick={handleClickUnlink}>{t('buttons.unlinkCi')}</Button>
                            </ButtonGroup>
                            <div style={{height: 450, width: '100%'}}>
                                {loading ? <TableSkeletonLoader/> :
                                    <ServiceRequestCITable
                                        srId={id}
                                        disableSelection={false}
                                        selectionChange={currentlySelected}
                                        handleRefresh={version}
                                    />
                                }
                            </div>
                        </Paper>
                    </Grid>
                    <Dialog open={open} maxWidth={'lg'} fullWidth={true} onClose={handleClose}
                            aria-labelledby="form-dialog-title">
                        <DialogContent>
                            <div style={{height: 450, width: '100%'}}>
                                <ServiceRequestCITable
                                    handleSelectClick={handleLinkCiTableClick}
                                    disableSelection={true}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </TabPanel>
            </Grid>
        </Container>
    );
};

export default SingleServiceRequest;