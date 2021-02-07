import {Card, CardContent, CardHeader, Container, Grid, Paper, Typography} from '@material-ui/core';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';
import {userStyles} from '../userStyles';
import NewUserForm from './NewUserForm';

const NewUser = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();

    const classes = userStyles();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <div style={{height: '100%', width: '100%'}}>
                            <Card>
                                <CardHeader
                                    title={<Typography variant='h5'>{t('labels.newUser')}</Typography>}
                                />
                                <CardContent>
                                    <NewUserForm/>
                                </CardContent>
                            </Card>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default NewUser;