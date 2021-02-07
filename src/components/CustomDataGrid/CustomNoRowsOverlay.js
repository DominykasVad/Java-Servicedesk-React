import {customDataGridStyles} from './customDataGridStyles';
import {GridOverlay} from '@material-ui/data-grid';
import WarningIcon from '@material-ui/icons/Warning';
import {Typography} from '@material-ui/core';
import {useTranslation} from 'react-i18next';

const CustomNoRowsOverlay = () => {
    const {t} = useTranslation();
    const classes = customDataGridStyles();
    return (
        <GridOverlay className={classes.gridWarningRoot}>
            <WarningIcon className={classes.gridWarningIcon}/>
            <Typography classes={classes.gridWarningLabel} variant={'h6'}>
                {t('labels.noRowsLabel')}
            </Typography>
        </GridOverlay>
    );
};

export default CustomNoRowsOverlay;
