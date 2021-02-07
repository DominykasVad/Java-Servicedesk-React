import {DataGrid} from '@material-ui/data-grid';
import _ from 'lodash';
import {customDataGridStyles} from './customDataGridStyles';
import PropTypes from 'prop-types';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import {useTranslation} from 'react-i18next';


const defaultPageSize = 10;
const defaultPageSizeOptions = [10, 20, 30, 100];


const customComponents = {
    NoRowsOverlay: CustomNoRowsOverlay,
};


const CustomDataGrid = ({
                            data,
                            columns,
                            paginationMode,
                            sortingMode,
                            pageSize,
                            pageSizeOptions,
                            totalPageSize,
                            handlePageChange,
                            handleSelectClick,
                            handlePageSizeChange,
                            handleSortModelChange,
                            disableSelectionOnClick,
                            handleOnRowSelected,
                            onSelectionChange,
                            isLoading,
                        }) => {
    const {t} = useTranslation();

    const classes = customDataGridStyles();

    return (
        <DataGrid
            components={customComponents}
            // localeText={customDataGridLocale} // FIXME
            className={classes.dataGridPointer}
            rows={data}
            columns={columns}
            loading={_.isUndefined(isLoading) ? false : isLoading}
            paginationMode={paginationMode}
            pagination={!_.isUndefined(paginationMode)}
            rowCount={totalPageSize}
            pageSize={_.isUndefined(pageSize) ? defaultPageSize : pageSize}
            rowsPerPageOptions={_.isUndefined(pageSizeOptions) ? defaultPageSizeOptions : pageSizeOptions}
            onPageChange={handlePageChange}
            showToolbar={false}
            disableDensitySelector={true}
            disableColumnSelector={true}
            disableColumnFilter={true}
            disableSelectionOnClick={_.isUndefined(disableSelectionOnClick) ? false : disableSelectionOnClick}
            density={'compact'}
            disableColumnMenu={true}
            onRowSelected={handleOnRowSelected}
            onPageSizeChange={handlePageSizeChange}
            onRowClick={handleSelectClick}
            sortingMode={sortingMode}
            onSortModelChange={handleSortModelChange}
            onSelectionChange={onSelectionChange}
            sortingOrder={['asc', 'desc']}
        />
    );
};

// God, I missed this
CustomDataGrid.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    paginationMode: PropTypes.oneOf(['server', 'client']),
    sortingMode: PropTypes.oneOf(['server', 'client']),
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.array,
    totalPageSize: PropTypes.number,
    handlePageChange: PropTypes.func,
    handleSelectClick: PropTypes.func,
    handlePageSizeChange: PropTypes.func,
    handleSortModelChange: PropTypes.func,
    disableSelectionOnClick: PropTypes.bool,
    handleOnRowSelected: PropTypes.func,
    isLoading: PropTypes.bool,
};

export default CustomDataGrid;