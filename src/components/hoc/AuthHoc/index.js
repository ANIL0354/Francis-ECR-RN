import React from 'react';
import { View, StatusBar, SafeAreaView } from 'react-native';
import AppHeader from '../../atoms/AppHeader';

const AuthHoc = ({
    rightIcon,
    leftIcon,
    centerIcon,
    children
}) => {
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <AppHeader
                    rightIcon={rightIcon}
                    centerIcon={centerIcon}
                    leftIcon={leftIcon}
                />
                {children}
            </SafeAreaView>
        </View>
    );
};

export default AuthHoc;