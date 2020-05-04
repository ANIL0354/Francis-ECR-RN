import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Image } from 'react-native';
import { SPLASH_SCREEN, SCREENS } from '../../../../shared/constants'
import styles from "./style.js";

export const Screen = ({
    userToken,
    navigation
}) => {
    useEffect(() => {
        setTimeout(() => {
            if (userToken) {
                navigation.navigate(SCREENS.HOME)
            }
            else {
                navigation.navigate(SCREENS.LOGIN)
            }
        }, 1000)
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <Image source={SPLASH_SCREEN} />
        </View>
    )
}