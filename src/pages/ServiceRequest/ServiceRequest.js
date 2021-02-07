import {serviceRequestStyles} from './serviceRequestStyles';
import {useHistory} from 'react-router';
import {useEffect, useState} from 'react';
import {fetchServiceRequests} from '../../api/serviceRequestApi';
import {Container, Grid, Paper} from '@material-ui/core';
import CustomDataGrid from '../../components/CustomDataGrid/CustomDataGrid';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';

const ServiceRequest = () => {

    const classes = serviceRequestStyles();

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [serviceRequests, setServiceRequests] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState({});

    const {enqueueSnackbar} = useSnackbar();

    const {t} = useTranslation();

    useEffect(() => {
        loadAllServiceRequests(page, pageSize, sort, enqueueSnackbar);
    }, [page, pageSize, sort, enqueueSnackbar]);

    const columns = [
        {field: 'id', type: 'number', headerName: 'ID', width: 100},
        {field: 'summary', headerName: t('labels.summary'), flex: 1},
        {field: 'description', headerName: t('labels.description'), flex: 1},
        {field: 'ownerUsername', headerName: t('labels.owner'), width: 130},
        {field: 'serviceRequestStatusName', headerName: t('labels.status'), width: 130},
        {field: 'organizationalUnitName', headerName: t('labels.organizationalUnit'), width: 130},
        {field: 'reportedByUsername', headerName: t('labels.reportedBy'), width: 130},
    ];

    const loadAllServiceRequests = (currentPage, currentPageSize, currentSort, snackbar) => {
        setLoading(true);
        fetchServiceRequests(currentPage - 1, currentPageSize, currentSort)
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

    return (
        <Container maxWidth='lg'>
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

export default ServiceRequest;