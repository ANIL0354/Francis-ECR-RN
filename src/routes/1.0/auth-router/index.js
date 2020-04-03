import React from 'react';
import {
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
const { defaultConfig: { PLATFORM, LOCATION, VERSION } } = require(`../../../../config/default`);
const { ROUTES } = require(`../../../../shared/${PLATFORM}/constants/routes`);
const { LoginScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/login`);
const { ForgotScreen } = require(`../../../../views/${PLATFORM}/${LOCATION}/${VERSION}/forgot-password`);

const AuthRouter = (props) => {
    return (
        <React.Fragment>
            <Switch>
                <Route path={ROUTES.LOGIN} render={() => { return <LoginScreen /> }} />
                <Route path={ROUTES.FORGOT_PASSWORD} component={ForgotScreen} />
                <Redirect to={ROUTES.LOGIN} />
            </Switch>
        </React.Fragment>
    );
}

export default AuthRouter;