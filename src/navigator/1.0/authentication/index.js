import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHoc from '../../../components/hoc/AuthHoc';
import {
    LoginScreen,
    ForgotScreen
} from '../../../views/us/1.0/auth-screens';
import { APP_LOGO, MENU_LOGO } from '../../../shared/constants'
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const AuthenticatedNavigator = () => {
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'LOGIN_SCREEN'} >
            <Stack.Screen name={'LOGIN_SCREEN'} component={LoginScreen} />
            <Stack.Screen name={'FORGOT_PASSWORD_SCREEN'} component={ForgotScreen} />
        </Stack.Navigator>
    )
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, null)(AuthenticatedNavigator);