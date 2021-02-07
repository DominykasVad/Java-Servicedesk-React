import {Redirect, Route, useLocation} from 'react-router-dom';
import useUser from '../../hooks/useUser';
import _ from 'lodash';

const SecuredRoute = ({children, roles, ...props}) => {
    const user = useUser();
    const location = useLocation();

    const authorized = roles ? !!_.intersection(user.roles.map(x => x.roleName), roles).length : !!user;

    return (
        <Route {...props}>
            {
                authorized ? children : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {
                                from: location
                            }
                        }}
                    />
                )
            }
        </Route>
    );
};

export default SecuredRoute;
