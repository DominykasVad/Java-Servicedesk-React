import {Route, Switch} from 'react-router-dom';
import ServiceRequest from '../../pages/ServiceRequest/ServiceRequest';
import SingleServiceRequest from '../../pages/ServiceRequest/SingleServiceRequest/SingleServiceRequest';
import NotFound from '../../pages/NotFound/NotFound';
import contentStyles from './contentStyles';
import Dashboard from '../../pages/Dashboard/Dashboard';
import Login from '../../pages/Login/Login';
import User from '../../pages/User/User';
import ConfigurationItem from '../../pages/ConfigurationItem/ConfigurationItem';
import SecuredRoute from '../SecuredRoute/SecuredRoute';
import NewServiceRequest from '../../pages/ServiceRequest/NewServiceRequest/NewServiceRequest';
import NewUser from '../../pages/User/NewUser/NewUser';

const Content = () => {
    const classes = contentStyles();

    return (
        <main className={classes.main}>
            <Switch>
                <Route exact path={'/login'}>
                    <Login/>
                </Route>
                <SecuredRoute exact path={'/'}>
                    <Dashboard/>
                </SecuredRoute>
                <SecuredRoute exact path={'/service-request'}>
                    <ServiceRequest/>
                </SecuredRoute>
                <SecuredRoute exact path={'/service-request/:id'}>
                    <SingleServiceRequest/>
                </SecuredRoute>
                <SecuredRoute exact path={'/new-service-request'}>
                    <NewServiceRequest/>
                </SecuredRoute>
                <SecuredRoute exact path={'/configuration-item'}>
                    <ConfigurationItem/>
                </SecuredRoute>
                <SecuredRoute exact path={'/configuration-item/:id'}>
                    <ConfigurationItem/>
                </SecuredRoute>
                <SecuredRoute exact path={'/users'}>
                    <User/>
                </SecuredRoute>
                <SecuredRoute roles={['ADMIN']} exact path={'/new-user'}>
                    <NewUser/>
                </SecuredRoute>
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </main>
    );
};

export default Content;