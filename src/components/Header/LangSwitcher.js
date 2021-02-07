import MenuItem from '@material-ui/core/MenuItem';
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import {Button, Menu} from '@material-ui/core';
import {ArrowDropDown, Translate} from '@material-ui/icons';

export default () => {

    const {i18n, t} = useTranslation();
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const handleLangChange = (event) => {
        handleClose();
        console.log(event.currentTarget.dataset.lang);
        i18n.changeLanguage(event.currentTarget.dataset.lang);
    };

    return (
        <>
            <Button color='inherit' onClick={handleMenuClick}>
                <Translate/>
                {t('language')}
                <ArrowDropDown/>
            </Button>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem data-lang={'lt'} onClick={handleLangChange} value={'lt'}>Lietuvių</MenuItem>
                <MenuItem data-lang={'en'} onClick={handleLangChange} value={'en'}>English</MenuItem>
            </Menu>
        </>
    );
}