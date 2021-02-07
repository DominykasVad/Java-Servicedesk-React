import {useHistory} from 'react-router';
import {useEffect, useState} from 'react';
import {fetchServiceRequestsByOwnerId} from '../../api/serviceRequestApi';
import {Container, Grid, Paper} from '@material-ui/core';
import CustomDataGrid from '../../components/CustomDataGrid/CustomDataGrid';
import {useSnackbar} from 'notistack';
import {userStyles} from './userStyles';
import {fetchAllUsers} from '../../api/usersApi';
import {useLocation} from 'react-router-dom';
import {useTranslation} from 'react-i18next';


const User = () => {

    const classes = userStyles();

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [ownerId, setOwnerId] = useState(1);

    const {enqueueSnackbar} = useSnackbar();

    const {t} = useTranslation()

    useEffect(() => {
        loadAllServiceRequestsByOwnerId(enqueueSnackbar);
    }, [enqueueSnackbar]);

    const columns = [
        {field: 'id', type: 'number', headerName: 'ID', width: 100},
        {field: 'username', headerName: t('main.username'), flex: 1},
        {field: 'name', headerName: t('labels.name'), flex: 1},
        {field: 'surname', headerName: t('labels.surname'), flex: 1},
        {field: 'email', headerName: t('labels.email'), flex: 1},
        {field: 'phone', headerName: t('labels.phone'), flex: 1},
        {field: 'organizationalUnitName', headerName: t('labels.organizationalUnit'), flex: 1},
    ];

    const loadAllServiceRequestsByOwnerId = (snackbar) => {
        setLoading(true);
        fetchAllUsers()
            .then(response => {
                setUsers(response.data);
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

    const handleSelectClick = (param) => {
        history.push(`/service-request/${param.row.id}`);
    };

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        <div style={{height: 500, width: '100%'}}>
                            <CustomDataGrid
                                data={users}
                                columns={columns}
                                paginationMode={'client'}
                                sortingMode={'client'}
                                handleSelectClick={handleSelectClick}
                                isLoading={loading}
                                disableSelectionOnClick={true}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default User;