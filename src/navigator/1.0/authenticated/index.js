import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../../views/us/1.0/authenticated-screens/home';
import { VehicleListing } from '../../../views/us/1.0/authenticated-screens/vehicle-listing'
// import { navigationRef, isMountedRef } from '../../../shared/services';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const AuthenticatedNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode={'none'}
        initialRouteName={'HOME_SCREEN'}
      >
        <Stack.Screen name={'HOME_SCREEN'} component={HomeScreen} />
        <Stack.Screen name={'VEHICLE_SCREEN'} component={VehicleListing} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(AuthenticatedNavigator);