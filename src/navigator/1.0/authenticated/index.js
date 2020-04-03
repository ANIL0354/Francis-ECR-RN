import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
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
      >
        <Stack.Screen name={'LOGIN_SCREEN'} component={LoginScreen} />
        <Stack.Screen name={'FORGOT_PASSWORD_SCREEN'} component={ForgotScreen} />
      </Stack.Navigator>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
  }
}

export default connect(mapStateToProps)(AuthNavigator);