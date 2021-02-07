import CustomDataGrid from '../../../components/CustomDataGrid/CustomDataGrid';
import {useEffect, useState} from 'react';
import {fetchConfigurationItemsByServiceRequestId} from '../../../api/configurationItemApi';
import {useSnackbar} from 'notistack';
import {useTranslation} from 'react-i18next';

const pageSizeOptions = [5, 10, 15, 50];

const ServiceRequestCITable = ({srId, handleSelectClick, disableSelection, handleRefresh, selectionChange}) => {

    const [loading, setLoading] = useState(true);
    const [configurationItems, setConfigurationItems] = useState([]);
    const [totalElements, setTotalElements] = useState();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sort, setSort] = useState({});

    const {enqueueSnackbar} = useSnackbar();

    const {t} = useTranslation();

    const loadConfigurationItems = (serviceRequestId, currentPage, currentPageSize, currentSort, snackbar) => {

        setLoading(true);
        fetchConfigurationItemsByServiceRequestId(serviceRequestId, currentPage - 1, currentPageSize, currentSort)
            .then(response => {
                setTotalElements(response.data['totalElements']);
                setConfigurationItems(response.data['content']);
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

    useEffect(() => {
        loadConfigurationItems(srId, page, pageSize, sort, enqueueSnackbar);
    }, [page, pageSize, sort, srId, enqueueSnackbar, handleRefresh]);

    const columns = [
        {field: 'id', type: 'number', headerName: 'ID', width: 100},
        {field: 'serialNumber', headerName: t('labels.serialNumber'), flex: 1},
        {field: 'inventoryNumber', headerName: t('labels.inventoryNumber'), flex: 1},
        {field: 'vendor', headerName: t('labels.vendor'), flex: 1},
        {field: 'model', headerName: t('labels.model'), flex: 1},
        {field: 'configurationItemStatusName', headerName: t('labels.status'), width: 160},
    ];

    const handlePageChange = (param) => {
        setPage(param.page);
    };
    const handlePageSizeChange = (param) => {
        setPageSize(param.pageSize);
    };
    const handleSortModelChange = (param) => {
        setSort(param.sortModel[0]);
    };

    return (
        <>
            <CustomDataGrid
                data={configurationItems}
                columns={columns}
                paginationMode={'server'}
                sortingMode={'server'}
                handleSelectClick={handleSelectClick}
                isLoading={loading}
                pageSizeOptions={pageSizeOptions}
                pageSize={pageSize}
                totalPageSize={totalElements}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
                handleSortModelChange={handleSortModelChange}
                disableSelectionOnClick={disableSelection}
                onSelectionChange={selectionChange}
            />
        </>
    );
};

export default ServiceRequestCITable;