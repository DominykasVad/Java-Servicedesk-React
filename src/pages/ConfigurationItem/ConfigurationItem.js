import {useHistory} from 'react-router';
import {useEffect, useState} from 'react';
import {Container, Grid, Paper} from '@material-ui/core';
import CustomDataGrid from '../../components/CustomDataGrid/CustomDataGrid';
import {useSnackbar} from 'notistack';
import {configurationItemStyles} from './configurationItemStyles';
import {fetchConfigurationItems} from '../../api/configurationItemApi';
import {useTranslation} from 'react-i18next';


const ConfigurationItem = () => {

    const classes = configurationItemStyles();

    const history = useHistory();

    const [loading, setLoading] = useState(true);
    const [configurationItems, setConfigurationItems] = useState([]);
    const [totalElements, setTotalElements] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState({});
    const {t} = useTranslation();

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        loadAllConfigurationItems(page, pageSize, sort, enqueueSnackbar);
    }, [page, pageSize, sort, enqueueSnackbar]);

    const columns = [
        {field: 'id', type: 'number', headerName: 'ID', width: 100},
        {field: 'serialNumber', headerName: t('serialNumber'), flex: 1},
        {field: 'inventoryNumber', headerName: t('inventoryNumber'), flex: 1},
        {field: 'vendor', headerName: t('vendor'), flex: 1},
        {field: 'model', headerName: t('model'), flex: 1},
        {field: 'configurationItemStatusName', headerName: t('labels.status'), width: 160},
    ];

    const loadAllConfigurationItems = (currentPage, currentPageSize, currentSort, snackbar) => {
        setLoading(true);
        fetchConfigurationItems(currentPage - 1, currentPageSize, currentSort)
            .then(response => {
                setTotalElements(response.data['totalElements']);
                setConfigurationItems(response.data['content']);
                console.log(response.data);
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
        history.push(`/configuration-item/${param.row.id}`);
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
        <Container maxWidth='lg' className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={classes.paper}>
                        <div style={{height: 500, width: '100%'}}>
                            <CustomDataGrid
                                data={configurationItems}
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

export default ConfigurationItem;