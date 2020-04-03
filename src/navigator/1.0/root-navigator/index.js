import React, { useRef } from 'react';
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from '../../../views/us/1.0/splash/screen.js';
import AuthNavigator from '../authentication';
import AuthenticatedNavigator from '../authenticated';
import { LoginScreen } from '../../../views/us/1.0/auth-screens'
// import { navigationRef, isMountedRef } from '../../../shared/services';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <View>

            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name={"SPLASH"} component={SplashScreen} />
                    <Stack.Screen name={'AUTH_SCREEN'} component={AuthNavigator} />
                    <Stack.Screen name={'AUTHENTICATION_SCREEN'} component={AuthenticatedNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </View>
    )
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(RootNavigator);