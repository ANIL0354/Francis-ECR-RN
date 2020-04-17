import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHoc from '../../../components/hoc/AuthHoc';
import {
    LoginScreen,
    ForgotScreen,
    CompleteDetailsScreen
} from '../../../views/us/1.0/auth-screens';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={'none'} initialRouteName={'LOGIN_SCREEN'} >
                <Stack.Screen name={'LOGIN_SCREEN'} component={LoginScreen} />
                <Stack.Screen name={'FORGOT_PASSWORD_SCREEN'} component={ForgotScreen} />
                <Stack.Screen name={'COMPLETE_DETAILS_SCREEN'} component={CompleteDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, null)(AuthNavigator);