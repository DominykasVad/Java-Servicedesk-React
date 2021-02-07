import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {footerStyles} from './footerStyles';
import {useTranslation} from 'react-i18next';

const Footer = () => {
    const classes = footerStyles();
    const {t} = useTranslation();

    return (
        <footer className={classes.footer}>
            <Container maxWidth='sm'>
                <Typography variant='body1'>
                    {t('footer')}
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
