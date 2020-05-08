import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import AuthNavigator from '../authentication';
import AuthenticatedNavigator from '../authenticated';
import { stopLoader, updateInternetStatus } from '../../../redux/actions';
import { connect } from 'react-redux';


const RootNavigator = ({
    userToken,
    stopLoader,
    updateInternetStatus
}) => {
    useEffect(() => {
        NetInfo.addEventListener((state) => {
            if (state === undefined || state.isConnected === undefined || state.isInternetReachable === undefined) {
                return;
            }
            if (!(state.isConnected && state.isInternetReachable)) {
                stopLoader();
                updateInternetStatus(false);
                SplashScreen.hide();
            } else {
                stopLoader();
                updateInternetStatus(state.isConnected);
                SplashScreen.hide();
            }
        })
    }, []);

    NetInfo.addEventListener((state) => {
        if (state === undefined || state.isConnected === undefined || state.isInternetReachable === undefined) {
            return;
        }
        if (!(state.isConnected && state.isInternetReachable)) {
            stopLoader();
            updateInternetStatus(false);
        } else {
            stopLoader();
            updateInternetStatus(state.isConnected);
        }
    })
    return (
        <>
            {
                userToken
                    ? (<AuthenticatedNavigator />)
                    : (<AuthNavigator />)
            }
        </>
    )

}

const mapStateToProps = state => {
    return {
        userToken: state.CommonReducer.userToken
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        stopLoader: () => dispatch(stopLoader()),
        updateInternetStatus: status => dispatch(updateInternetStatus(status))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);