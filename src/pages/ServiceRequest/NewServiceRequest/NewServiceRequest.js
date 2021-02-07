import {serviceRequestStyles} from '../serviceRequestStyles';
import {Card, CardContent, CardHeader, Container, Grid, Paper, Typography} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';
import NewServiceRequestForm from './NewServiceRequestForm';

const NewServiceRequest = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();

    const classes = serviceRequestStyles();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div style={{height: '100%', width: '100%'}}>
                            <Card>
                                <CardHeader
                                    title={<Typography variant='h5'>{t('labels.newServiceRequest')}</Typography>}
                                />
                                <CardContent>
                                    <NewServiceRequestForm/>
                                </CardContent>
                            </Card>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NewServiceRequest;