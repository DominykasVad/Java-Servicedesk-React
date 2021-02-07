import {useHistory} from 'react-router';
import {useEffect, useState} from 'react';
import {fetchServiceRequestsByOwnerId} from '../../api/serviceRequestApi';
import {Container, Grid, Paper} from '@material-ui/core';
import CustomDataGrid from '../../components/CustomDataGrid/CustomDataGrid';
import {useSnackbar} from 'notistack';
import {dashboardStyles} from './dashboardStyles';
import useUser from '../../hooks/useUser';
import {useTranslation} from 'react-i18next';


const Dashboard = () => {

    const classes = dashboardStyles();

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [serviceRequests, setServiceRequests] = useState([]);
    const [totalElements, setTotalElements] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState({});
    const currentUser = useUser();
    const {t} = useTranslation();

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        loadAllServiceRequestsByOwnerId(currentUser.id, page, pageSize, sort, enqueueSnackbar);
    }, [currentUser.id, page, pageSize, sort, enqueueSnackbar]);

    const columns = [
        {field: 'id', type: 'number', headerName: 'ID', width: 100},
        {field: 'summary', headerName: t('labels.summary'), flex: 1},
        {field: 'description', headerName: t('labels.description'), flex: 1},
        {field: 'serviceRequestStatusName', headerName: t('labels.status'), width: 130},
        {field: 'organizationalUnitName', headerName: t('labels.organizationalUnit'), width: 130},
        {field: 'reportedByUsername', headerName: t('labels.reportedBy'), width: 130},
    ];

    const loadAllServiceRequestsByOwnerId = (userId, currentPage, currentPageSize, currentSort, snackbar) => {
        setLoading(true);
        fetchServiceRequestsByOwnerId(userId, currentPage - 1, currentPageSize, currentSort)
            .then(response => {
                setTotalElements(response.data['totalElements']);
                setServiceRequests(response.data['content']);
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
    const handlePageChange = (param) => {
        setPage(param.page);
    };
    const handlePageSizeChange = (param) => {
        setPageSize(param.pageSize);
    };
    const handleSortModelChange = (params) => {
        setSort(params.sortModel[0]);
    };

    // console.log(_.intersection(_.values(currentUser.roles), ['ADMIN']))
    // console.log(_.intersection(_.values(currentUser.roles), ['ADMIN'].length))
    // console.log(`Result ${!!_.intersection(currentUser.roles.map(x => x.roleName), ['MANAGER']).length}`)

    return (
        <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        <div style={{height: 500, width: '100%'}}>
                            <CustomDataGrid
                                data={serviceRequests}
                                columns={columns}
                                paginationMode={'server'}
                                sortingMode={'server'}
                                handleSelectClick={handleSelectClick}
                                isLoading={loading}
                                pageSize={pageSize}
                                totalPageSize={totalElements}
                                handlePageChange={handlePageChange}
                                handlePageSizeChange={handlePageSizeChange}
                                handleSortModelChange={handleSortModelChange}
                                disableSelectionOnClick={true}
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;