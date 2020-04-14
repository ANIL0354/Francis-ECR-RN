import React, { useState, useEffect } from 'react';
import Toast from 'react-native-simple-toast';
import AuthNavigator from '../authentication';
import AuthenticatedNavigator from '../authenticated';
import { connect } from 'react-redux';


const RootNavigator = ({
    userToken
}) => {
    NetInfo.addEventListener(state => {
        console.log('state', state)
        Toast.show(state, Toast.LONG, Toast.BOTTOM);
    });
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

export default connect(mapStateToProps, null)(RootNavigator);