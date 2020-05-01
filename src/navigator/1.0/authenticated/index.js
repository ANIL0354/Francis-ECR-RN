import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../../views/us/1.0/authenticated-screens/home';
import { VehicleListing } from '../../../views/us/1.0/authenticated-screens/vehicle-listing'
// import { navigationRef, isMountedRef } from '../../../shared/services';
import { connect } from 'react-redux';
import { SCREENS } from '../../../shared/constants';

const Stack = createStackNavigator();

const AuthenticatedNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={'none'}
        initialRouteName={SCREENS.HOME}
      >
        <Stack.Screen name={SCREENS.HOME} component={HomeScreen} />
        <Stack.Screen name={SCREENS.VEHICLE_LISTING} component={VehicleListing} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(AuthenticatedNavigator);