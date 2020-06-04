/* eslint-disable prettier/prettier */
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
import { BookingSummary } from '../../../views/us/1.0/authenticated-screens/booking-summary';
import { ProfileScreen } from '../../../views/us/1.0/authenticated-screens/profile';
import { ChangePasswordScreen } from '../../../views/us/1.0/authenticated-screens/change-password';
import { TripListScreen } from '../../../views/us/1.0/authenticated-screens/trips-list';
import { RatingListScreen } from '../../../views/us/1.0/authenticated-screens/ratings-list';
import { RatingDetailScreen } from '../../../views/us/1.0/authenticated-screens/rating-details';
import { TripDetailScreen } from '../../../views/us/1.0/authenticated-screens/trip-details';
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
                <Stack.Screen name={SCREENS.BOOKING_SUMMARY} component={BookingSummary} />
                <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
                <Stack.Screen name={SCREENS.FORGOT_PASSWORD} component={ForgotScreen} />
                <Stack.Screen name={SCREENS.COMPLETE_DETAILS} component={CompleteDetailsScreen} />
                <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
                <Stack.Screen name={SCREENS.CHANGE_PASSWORD} component={ChangePasswordScreen} />
                <Stack.Screen name={SCREENS.YOUR_TRIPS} component={TripListScreen} />
                <Stack.Screen name={SCREENS.YOUR_RATINGS} component={RatingListScreen} />
                <Stack.Screen name={SCREENS.RATING_DETAILS} component={RatingDetailScreen} />
                <Stack.Screen name={SCREENS.TRIP_DETAILS} component={TripDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps, null)(AuthNavigator);
