import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../../../views/us/1.0/splash/screen.js';
import AuthNavigator from '../authentication';
import AuthenticatedNavigator from '../authenticated';
import { connect } from 'react-redux';


const RootNavigator = ({
    userToken
}) => {
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