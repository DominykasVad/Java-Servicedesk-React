import {useTranslation} from 'react-i18next';

export const CustomDataGridLocale = () => {
    const {t} = useTranslation();
    return {
        // Density selector toolbar button text
        toolbarDensity: t('common.customDataGrid.toolbarDensityLabel'),
        toolbarDensityLabel: 'common.customDataGrid.toolbarDensityLabel',
        toolbarDensityCompact: 'common.customDataGrid.toolbarDensityCompact',
        toolbarDensityStandard: 'common.customDataGrid.toolbarDensityStandard',
        toolbarDensityComfortable: 'common.customDataGrid.toolbarDensityComfortable',

        // Columns selector toolbar button text
        toolbarColumns: 'common.customDataGrid.toolbarColumns',
        toolbarColumnsLabel: 'common.customDataGrid.toolbarColumnsLabel',

        // Filters toolbar button text
        toolbarFilters: 'common.customDataGrid.toolbarFilters',
        toolbarFiltersLabel: 'common.customDataGrid.filtersTooltipShow',
        toolbarFiltersTooltipHide: 'common.customDataGrid.filtersTooltipHide',
        toolbarFiltersTooltipShow: 'common.customDataGrid.filtersTooltipShow',
        toolbarFiltersTooltipActive: (count) => `${count} ${t('common.customDataGrid.filtersTooltipActive')}`,

        // Columns panel text
        columnsPanelTextFieldLabel: 'common.customDataGrid.columnsPanelTextFieldLabel',
        columnsPanelTextFieldPlaceholder: 'common.customDataGrid.columnsPanelTextFieldPlaceholder',
        columnsPanelDragIconLabel: 'common.customDataGrid.columnsPanelDragIconLabel',
        columnsPanelShowAllButton: 'common.customDataGrid.columnsPanelShowAllButton',
        columnsPanelHideAllButton: 'common.customDataGrid.columnsPanelHideAllButton',

        // Filter panel text
        filterPanelAddFilter: 'common.customDataGrid.filterPanelAddFilter',
        filterPanelDeleteIconLabel: 'common.customDataGrid.filterPanelDeleteIconLabel',
        filterPanelOperators: 'common.customDataGrid.filterPanelOperators',
        filterPanelOperatorAnd: 'common.customDataGrid.filterPanelOperatorAnd',
        filterPanelOperatorOr: 'common.customDataGrid.filterPanelOperatorOr',
        filterPanelColumns: 'common.customDataGrid.filterPanelColumns',

        // Column menu text
        columnMenuLabel: 'common.customDataGrid.columnMenuLabel',
        columnMenuShowColumns: 'common.customDataGrid.columnMenuShowColumns',
        columnMenuFilter: 'common.customDataGrid.columnMenuFilter',
        columnMenuHideColumn: 'common.customDataGrid.columnMenuHideColumn',
        columnMenuUnsort: 'common.customDataGrid.columnMenuUnsort',
        columnMenuSortAsc: 'common.customDataGrid.columnMenuSortAsc',
        columnMenuSortDesc: 'common.customDataGrid.columnMenuSortDesc',

        // Column header text
        columnHeaderFiltersTooltipActive: (count) => `${count} ${t('common.customDataGrid.filtersTooltipActive')}`,
        columnHeaderFiltersLabel: 'common.customDataGrid.filtersTooltipShow',
        columnHeaderSortIconLabel: 'common.customDataGrid.columnHeaderSortIconLabel',

        // Rows selected footer text
        footerRowSelected: (count) =>
            count !== 1
                ? `${count.toLocaleString()} ${t('common.customDataGrid.footerRowsSelected')}`
                : `${count.toLocaleString()} ${t('common.customDataGrid.footerRowSelected')}`,

        // Total rows footer text
        footerTotalRows: 'common.customDataGrid.footerTotalRows',

        // Pagination footer text
        footerPaginationRowsPerPage: t('common.customDataGrid.footerPaginationRowsPerPage'),
    };
};

