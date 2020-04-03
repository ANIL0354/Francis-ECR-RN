import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../../../views/us/1.0/authenticated-screens/home'
// import { navigationRef, isMountedRef } from '../../../shared/services';
import { connect } from 'react-redux';

const Stack = createStackNavigator();

const AuthenticatedNavigator = () => {
    // React.useEffect(() => {
    //     isMountedRef.current = true;

    //     return () => (isMountedRef.current = false);
    // }, []);

    return (
        <Stack.Navigator headerMode={'none'} >
            <Stack.Screen name={'HOME_SCREEN'} component={HomeScreen} />
        </Stack.Navigator>
    )
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(AuthenticatedNavigator);