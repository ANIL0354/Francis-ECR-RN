import React, { } from 'react';
import { View, Text } from 'react-native';
import styles from "./style.js";

export const SplashScreen = () => {
    console.log('Splash Screen')
    return (
        <View style={{ flex: 1, backgroundColor: 'red', textAlign: 'center' }}>
            <Text>Splash Screen</Text>
        </View>
    )
}