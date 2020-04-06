import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../../views/us/1.0/authenticated-screens/home';
// import { navigationRef, isMountedRef } from '../../../shared/services';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  // React.useEffect(() => {
  //   isMountedRef.current = true;

  //   return () => (isMountedRef.current = false);
  // }, []);

  return (
    <React.Fragment>
      <Stack.Navigator
        headerMode={'none'}
        initialRouteName={'HOME_SCREEN'}
      >
        <Stack.Screen name={'HOME_SCREEN'} component={HomeScreen} />
      </Stack.Navigator>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(AuthNavigator);