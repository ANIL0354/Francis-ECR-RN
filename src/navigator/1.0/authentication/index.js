import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthHoc from '../../../components/hoc/AuthHoc';
import {
    LoginScreen,
    ForgotScreen,
    CompleteDetailsScreen
} from '../../../views/us/1.0/auth-screens';
import { HomeScreen } from '../../../views/us/1.0/authenticated-screens/home';
import { VehicleListing } from '../../../views/us/1.0/authenticated-screens/vehicle-listing';
import { BookingDetails } from '../../../views/us/1.0/authenticated-screens/booking-details';
import { SCREENS } from '../../../shared/constants';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode={'none'} initialRouteName={SCREENS.HOME} >
                <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
                <Stack.Screen name={SCREENS.VEHICLE_LISTING} component={VehicleListing} />
                <Stack.Screen name={SCREENS.BOOKING_DETAILS} component={BookingDetails} />
                <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
                <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotScreen} />
                <Stack.Screen name={SCREENS.COMPLETE_DETAILS} component={CompleteDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, null)(AuthNavigator);