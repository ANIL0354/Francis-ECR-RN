import React from 'react';
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch,
} from 'react-router-dom';
import query from 'query-string';
import { connect } from 'react-redux';
import AuthRouter from '../auth-router';
import AuthenticatedRouter from '../authenticated';
import { Loader } from '../../../../components/sef/atoms/loader';
const { defaultConfig: { PLATFORM } } = require(`../../../../config/default`);
const { SUB_ADMIN_PLATFORM } = require(`../../../../shared/${PLATFORM}/constants`)

export const MainRouter = (props) => {
    const { userToken, loader, platformType } = props;
    return (
        <BrowserRouter>
            {loader && <Loader />}
            {userToken
                ? <AuthenticatedRouter {...props} />
                : <AuthRouter {...props} />}
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return ({
        userToken: state.CommonReducer.userToken,
        platformType: state.CommonReducer.platformType,
        loader: state.CommonReducer.loader
    });
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export const RootRouter = connect(mapStateToProps, mapDispatchToProps)(MainRouter);