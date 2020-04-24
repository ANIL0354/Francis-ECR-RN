import React, { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import AuthNavigator from '../authentication';
import AuthenticatedNavigator from '../authenticated';
import { stopLoader } from '../../../redux/actions';
import { connect } from 'react-redux';


const RootNavigator = ({
    userToken,
    stopLoader,
}) => {
    NetInfo.addEventListener((state) => {
        if (!state.isConnected) {
            stopLoader();
            Toast.show('You appear to be offline. Please check your internet connectivity.', Toast.LONG);
        }
    })
    const [userAuthenticated, setUserAuthenticated] = useState(null)
    useEffect(() => {
        setUserAuthenticated(userToken)
    }, [userToken]);

    return (
        <>
            {
                userAuthenticated
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);